"""Deterministic phone-view segmentation for CaseForm. No AI/model inference."""
from __future__ import annotations
import argparse, json
from pathlib import Path
import cv2
import numpy as np

def _classify(width: int, height: int) -> str:
    ratio = height / max(width, 1)
    if ratio >= 4.0:
        return "side"
    if 1.55 <= ratio <= 2.55:
        return "face"
    return "unknown"

def _side_profile(mask: np.ndarray, x: int, y: int, w: int, h: int, depth_mm: float):
    crop = mask[y:y+h, x:x+w]
    widths = []
    spans = []
    for row in crop:
        columns = np.flatnonzero(row)
        if len(columns):
            span = int(columns[-1] - columns[0] + 1)
            widths.append(span)
            spans.append((int(columns[0]), int(columns[-1])))
        else:
            spans.append((0, 0))
    if not widths:
        return None
    # Buttons and camera protrusions are outliers. The median represents the frame.
    body_px = float(np.median(widths))
    upper = widths[:max(1, int(len(widths) * .28))]
    maximum_upper_px = float(np.percentile(upper, 95))
    protrusion_px = max(0.0, maximum_upper_px - body_px)
    return {
        "bodyThicknessPixels": round(body_px, 2),
        "maximumUpperThicknessPixels": round(maximum_upper_px, 2),
        "mmPerPixel": round(depth_mm / body_px, 6),
        "estimatedCameraProtrusionMm": round(protrusion_px * depth_mm / body_px, 3),
        "classification": "image-derived",
        "requiresOverlayReview": True,
    }

def _face_kind(gray: np.ndarray, x: int, y: int, w: int, h: int):
    crop = gray[y:y+max(1, int(h * .42)), x:x+w]
    crop = cv2.GaussianBlur(crop, (5, 5), 1.2)
    circles = cv2.HoughCircles(crop, cv2.HOUGH_GRADIENT, dp=1.2, minDist=max(8, w // 12),
                               param1=90, param2=18, minRadius=max(2, w // 55), maxRadius=max(5, w // 9))
    detected = [] if circles is None else np.round(circles[0]).astype(int).tolist()
    left_cluster = [circle for circle in detected if circle[0] < w * .45 and circle[1] < h * .32]
    center_top = [circle for circle in detected if abs(circle[0] - w / 2) < w * .16 and circle[1] < h * .14]
    if len(left_cluster) >= 3:
        return "back", detected
    if center_top:
        return "front", detected
    return "face", detected

def inspect(image_path: str, body_depth_mm: float):
    raw = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    if raw is None:
        raise ValueError(f"Unable to read image: {image_path}")
    height, width = raw.shape[:2]
    has_alpha = len(raw.shape) == 3 and raw.shape[2] == 4 and np.any(raw[:, :, 3] < 200)

    if has_alpha:
        clean_alpha = raw[:, :, 3].copy()
        clean_alpha[clean_alpha <= 15] = 0
        foreground = (clean_alpha > 0).astype(np.uint8) * 255
        rgb = raw[:, :, :3].copy()
        rgb[clean_alpha == 0] = 0
        gray = cv2.cvtColor(rgb, cv2.COLOR_BGR2GRAY)
    else:
        rgb = raw[:, :, :3] if len(raw.shape) == 3 else cv2.cvtColor(raw, cv2.COLOR_GRAY2BGR)
        gray = cv2.cvtColor(rgb, cv2.COLOR_BGR2GRAY)
        patch = max(3, min(width, height) // 30)
        corner_pixels = np.concatenate((rgb[:patch, :patch].reshape(-1, 3), rgb[:patch, -patch:].reshape(-1, 3), rgb[-patch:, :patch].reshape(-1, 3), rgb[-patch:, -patch:].reshape(-1, 3)))
        background = np.median(corner_pixels, axis=0)
        distance = np.linalg.norm(rgb.astype(np.float32) - background.astype(np.float32), axis=2)
        foreground = (distance > 18).astype(np.uint8) * 255
        foreground = cv2.morphologyEx(foreground, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8), iterations=2)

    count, labels, stats, _ = cv2.connectedComponentsWithStats(foreground, 8)
    views = []
    for label in range(1, count):
        x, y, w, h, area = [int(v) for v in stats[label]]
        if h < height * .25 or area < width * height * .002:
            continue
        kind = _classify(w, h)
        area_fraction = area / (width * height)
        if kind == "unknown" or (kind == "side" and area_fraction < .015):
            continue
        item = {
            "kind": kind,
            "bounds": {"x": x, "y": y, "width": w, "height": h},
            "aspect": round(w / h, 4),
            "areaFraction": round(area_fraction, 4),
        }
        if kind == "face":
            item["kind"], circles = _face_kind(gray, x, y, w, h)
            item["circleCandidates"] = [{"x": int(cx+x), "y": int(cy+y), "radius": int(radius)} for cx, cy, radius in circles]
        if kind == "side":
            item["profile"] = _side_profile(foreground, x, y, w, h, body_depth_mm)
        views.append(item)
    views.sort(key=lambda item: item["areaFraction"], reverse=True)
    kinds = {view["kind"] for view in views}
    has_face = bool(kinds.intersection({"face", "front", "back"}))
    if "side" in kinds and has_face:
        sheet_type = "face-and-side"
    elif "side" in kinds:
        sheet_type = "side-only"
    elif has_face:
        sheet_type = "single-face-or-overlap"
    else:
        sheet_type = "unresolved"
    return {
        "engine": f"opencv-{cv2.__version__}",
        "method": "connected-components-and-profile-v1",
        "image": {"width": width, "height": height},
        "sheetType": sheet_type,
        "views": views,
        "warnings": ["Face classification is geometry-based and must be confirmed when circle detection is ambiguous."] if "face" in kinds else [],
    }

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("image")
    parser.add_argument("--depth-mm", type=float, required=True)
    args = parser.parse_args()
    print(json.dumps(inspect(str(Path(args.image)), args.depth_mm)))
