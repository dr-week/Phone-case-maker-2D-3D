"""Per-image calibration and view classification for the measurement pipeline.

Accepts a single phone image and known physical dimensions.
Returns:
  - viewKind: 'front' | 'back' | 'side'
  - mmPerPxX, mmPerPxY: calibration scalars
  - usable: bool
  - warnings: list of human-readable strings

Does NOT accept or produce hard-coded device defaults.
All physical dimensions must be supplied by the caller.
"""
from __future__ import annotations
import argparse
import json
import sys
from pathlib import Path

import cv2
import numpy as np

# Re-use existing silhouette segmentation from upscale_and_measure
module_path = Path(__file__).parent / "modules"
sys.path.append(str(module_path))


def _largest_component_stats(mask: np.ndarray):
    """Return (label, stats) for the largest connected component."""
    cnt, labels, stats, _ = cv2.connectedComponentsWithStats(mask, 8)
    if cnt < 2:
        return None, None
    best_label = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    return best_label, stats[best_label]


def _extract_mask(image: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """Return (rgb, binary mask) for the phone silhouette."""
    has_alpha = len(image.shape) == 3 and image.shape[2] == 4
    if has_alpha:
        alpha = image[:, :, 3]
        rgb = image[:, :, :3].copy()
        rgb[alpha <= 15] = 0
        mask = (alpha > 32).astype(np.uint8) * 255
    else:
        rgb = image[:, :, :3] if len(image.shape) == 3 else cv2.cvtColor(image, cv2.COLOR_GRAY2BGR)
        borders = np.concatenate([rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]])
        bg = np.median(borders, axis=0)
        dist = np.linalg.norm(rgb.astype(np.float32) - bg, axis=2)
        mask = (dist > 18).astype(np.uint8) * 255
        k5 = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
        k7 = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
        mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, k5)
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, k7)
    return rgb, mask


def _approx_quad(contour: np.ndarray, img_w: int, img_h: int) -> np.ndarray | None:
    """Try to reduce the contour to a 4-point quad."""
    peri = cv2.arcLength(contour, True)
    for eps_factor in (0.02, 0.03, 0.04, 0.05, 0.06):
        approx = cv2.approxPolyDP(contour, eps_factor * peri, True)
        if len(approx) == 4:
            return approx.reshape(4, 2).astype(np.float32)
    return None


def _perspective_score(quad: np.ndarray) -> float:
    """Return 0.0 (perfect rectangle) to 1.0 (heavy perspective)."""
    pts = quad.reshape(4, 2)
    # Sort: top-left, top-right, bottom-right, bottom-left
    s = pts.sum(axis=1)
    diff = np.diff(pts, axis=1)
    tl = pts[np.argmin(s)]
    br = pts[np.argmax(s)]
    tr = pts[np.argmin(diff)]
    bl = pts[np.argmax(diff)]
    w1 = np.linalg.norm(tr - tl)
    w2 = np.linalg.norm(br - bl)
    h1 = np.linalg.norm(bl - tl)
    h2 = np.linalg.norm(br - tr)
    if max(w1, w2, h1, h2) < 1:
        return 0.0
    width_ratio = abs(w1 - w2) / max(w1, w2)
    height_ratio = abs(h1 - h2) / max(h1, h2)
    return float(np.clip((width_ratio + height_ratio) / 2, 0, 1))


def _classify_view(bw: int, bh: int, known_w: float, known_h: float, known_t: float) -> str:
    """Classify view as 'front', 'back', or 'side' using aspect ratio."""
    obs_aspect = bw / max(bh, 1)
    body_aspect = known_w / max(known_h, 1)
    side_aspect_h = known_t / max(known_h, 1)
    side_aspect_w = known_t / max(known_w, 1)

    err_body = abs(obs_aspect - body_aspect) / max(body_aspect, 0.01)
    err_side_h = abs(obs_aspect - side_aspect_h) / max(side_aspect_h, 0.01)
    err_side_w = abs(obs_aspect - side_aspect_w) / max(side_aspect_w, 0.01)

    min_side_err = min(err_side_h, err_side_w)
    if min_side_err < err_body and min_side_err < 0.25:
        return "side"
    if err_body < 0.15:
        return "back"   # front and back are indistinguishable without content analysis
    return "back"       # default; caller can override via viewHint


def calibrate_image(
    image_path: str,
    known_width_mm: float,
    known_height_mm: float,
    known_thickness_mm: float,
) -> dict:
    warnings: list[str] = []

    img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        return {"usable": False, "warnings": [f"Cannot read image: {image_path}"],
                "viewKind": "back", "mmPerPxX": None, "mmPerPxY": None}

    img_h, img_w = img.shape[:2]
    rgb, mask = _extract_mask(img)

    label, stats = _largest_component_stats(mask)
    if label is None or stats[cv2.CC_STAT_AREA] < img_w * img_h * 0.04:
        return {"usable": False, "warnings": ["No phone-sized foreground found"],
                "viewKind": "back", "mmPerPxX": None, "mmPerPxY": None}

    bx = int(stats[cv2.CC_STAT_LEFT])
    by = int(stats[cv2.CC_STAT_TOP])
    bw = int(stats[cv2.CC_STAT_WIDTH])
    bh = int(stats[cv2.CC_STAT_HEIGHT])

    # Cropped check — silhouette touching image edge
    if bx <= 2 or by <= 2 or (bx + bw) >= img_w - 2 or (by + bh) >= img_h - 2:
        warnings.append("Phone silhouette touches image edge — may be cropped")

    # Perspective check via quad approximation
    phone_mask_local = (mask[by:by+bh, bx:bx+bw]).copy()
    contours, _ = cv2.findContours(phone_mask_local, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    if contours:
        phone_contour = max(contours, key=cv2.contourArea)
        quad = _approx_quad(phone_contour, bw, bh)
        if quad is not None:
            persp = _perspective_score(quad)
            if persp > 0.08:
                warnings.append(f"Perspective distortion detected (score {persp:.2f}); "
                                 "straighten the image before measuring")
        else:
            warnings.append("Could not approximate phone outline as rectangle; "
                             "perspective or irregular crop suspected")

    view_kind = _classify_view(bw, bh, known_width_mm, known_height_mm, known_thickness_mm)

    # Calibration scalars depend on view kind
    if view_kind == "side":
        # For a side view the phone is rotated; shorter dimension = thickness
        dim_short = min(known_width_mm, known_thickness_mm)
        dim_long = max(known_width_mm, known_height_mm)
        obs_short = min(bw, bh)
        obs_long = max(bw, bh)
        mm_per_px_x = dim_short / max(obs_short, 1)
        mm_per_px_y = dim_long / max(obs_long, 1)
    else:
        mm_per_px_x = known_width_mm / max(bw, 1)
        mm_per_px_y = known_height_mm / max(bh, 1)

    # Warn if X/Y disagree significantly (perspective indicator)
    avg = (mm_per_px_x + mm_per_px_y) / 2
    disagree = abs(mm_per_px_x - mm_per_px_y) / max(avg, 0.001)
    if disagree > 0.06:
        warnings.append(
            f"Horizontal and vertical scale disagree by {disagree*100:.1f}%; "
            "correct perspective before measuring"
        )

    usable = len([w for w in warnings if "distortion" in w or "cropped" in w or "disagree" in w]) == 0

    return {
        "usable": usable,
        "warnings": warnings,
        "viewKind": view_kind,
        "mmPerPxX": round(mm_per_px_x, 6),
        "mmPerPxY": round(mm_per_px_y, 6),
        "phoneBounds": {"x": bx, "y": by, "width": bw, "height": bh},
        "imageSize": {"width": img_w, "height": img_h},
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("image")
    parser.add_argument("--width-mm", type=float, required=True)
    parser.add_argument("--height-mm", type=float, required=True)
    parser.add_argument("--thickness-mm", type=float, required=True)
    args = parser.parse_args()
    result = calibrate_image(
        args.image,
        args.width_mm,
        args.height_mm,
        args.thickness_mm,
    )
    print(json.dumps(result))
