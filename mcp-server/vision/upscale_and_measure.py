"""High-fidelity edge-preserving upscaling and automated feature measurement for phone references."""
from __future__ import annotations
import argparse
import json
from pathlib import Path
import sys
import cv2
import numpy as np

# Unique modular imports
module_path = Path(__file__).parent / "modules"
sys.path.append(str(module_path))

from edge_enhancer import enhance_and_sharpen_edges
from corner_curvature import measure_corner_radii
from camera_hole_detector import detect_camera_hole_diameters
from camera_island_detector import detect_camera_island
from button_profiler import profile_side_buttons

def measure_and_upscale(
    image_path: str,
    output_image_path: str,
    body_width_mm: float = 76.1,
    body_height_mm: float = 163.7,
    body_thickness_mm: float = 7.6,
    scale: int = 3
):
    raw = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    if raw is None:
        raise ValueError(f"Unable to read image: {image_path}")

    has_alpha = len(raw.shape) == 3 and raw.shape[2] == 4
    if has_alpha:
        alpha = raw[:, :, 3].copy()
        alpha[alpha <= 15] = 0
        rgb = raw[:, :, :3].copy()
        rgb[alpha == 0] = 0
        mask = (alpha > 32).astype(np.uint8) * 255
    else:
        rgb = raw[:, :, :3] if len(raw.shape) == 3 else cv2.cvtColor(raw, cv2.COLOR_GRAY2BGR)
        borders = np.concatenate([rgb[0, :, :3], rgb[-1, :, :3], rgb[:, 0, :3], rgb[:, -1, :3]])
        bg = np.median(borders, axis=0)
        dist = np.linalg.norm(rgb.astype(np.float32) - bg, axis=2)
        mask = (dist > 18).astype(np.uint8) * 255
        mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7)))

    # Normalize both alpha and ordinary images through the same foreground cleanup.
    # This removes disconnected labels and thin compression halos before scaling.
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7)))

    # 1. Find phone bounding box
    cnt, labels, stats, _ = cv2.connectedComponentsWithStats(mask, 8)
    if cnt < 2:
        raise ValueError("No phone subject found")
    phone_label = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    phone_mask = (labels == phone_label).astype(np.uint8) * 255

    contours, _ = cv2.findContours(phone_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    phone_contour = max(contours, key=cv2.contourArea)
    bx, by, bw, bh = cv2.boundingRect(phone_contour)

    mm_per_px_x = body_width_mm / max(bw, 1)
    mm_per_px_y = body_height_mm / max(bh, 1)
    mm_per_px = (mm_per_px_x + mm_per_px_y) / 2.0

    # 2. Super-resolution & edge clearing (modular)
    phone_crop = rgb[by:by+bh, bx:bx+bw].copy()
    trim = max(2, round(min(bw, bh) * 0.018))
    interior = phone_crop[trim:bh-trim, trim:bw-trim]
    phone_crop = cv2.resize(interior, (bw, bh), interpolation=cv2.INTER_CUBIC)
    crop_mask = np.zeros((bh, bw), dtype=np.uint8)
    inset = max(1, round(min(bw, bh) * 0.008))
    radius = max(4, round(min(bw * 0.10, bh * 0.045)))
    x0, y0, x1, y1 = inset, inset, bw - inset - 1, bh - inset - 1
    cv2.rectangle(crop_mask, (x0 + radius, y0), (x1 - radius, y1), 255, -1)
    cv2.rectangle(crop_mask, (x0, y0 + radius), (x1, y1 - radius), 255, -1)
    for cx, cy in ((x0 + radius, y0 + radius), (x1 - radius, y0 + radius), (x0 + radius, y1 - radius), (x1 - radius, y1 - radius)):
        cv2.circle(crop_mask, (cx, cy), radius, 255, -1)
    up_rgba, up_w, up_h = enhance_and_sharpen_edges(phone_crop, crop_mask, scale=scale)

    Path(output_image_path).parent.mkdir(parents=True, exist_ok=True)
    cv2.imwrite(output_image_path, up_rgba)

    # 3. Corner curvature (modular)
    curvature_data = measure_corner_radii(phone_contour, (bx, by, bw, bh), mm_per_px)

    # 4. Camera hole diameters (modular)
    gray = cv2.cvtColor(phone_crop, cv2.COLOR_BGR2GRAY)
    camera_holes = detect_camera_hole_diameters(gray, bw, bh, mm_per_px_x, mm_per_px_y, mm_per_px)

    # 5. Side buttons (modular)
    buttons = profile_side_buttons(phone_crop, mm_per_px_y)

    # 6. Camera island boundary (modular)
    camera_island = detect_camera_island(camera_holes, gray, mm_per_px_x, mm_per_px_y)

    return {
        "engine": f"opencv-edge-clearing-{cv2.__version__}",
        "dimensions": {
            "widthMm": body_width_mm,
            "heightMm": body_height_mm,
            "thicknessMm": body_thickness_mm
        },
        "cornerCurvature": curvature_data,
        "cameraIsland": camera_island,
        "cameraHoles": camera_holes,
        "buttons": buttons,
        "upscaledImage": {
            "path": output_image_path,
            "width": up_w,
            "height": up_h,
            "scale": scale
        }
    }

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("image")
    parser.add_argument("--output", default="public/a73-upscaled-analysis.png")
    parser.add_argument("--depth-mm", type=float, default=7.6)
    parser.add_argument("--width-mm", type=float, default=76.1)
    parser.add_argument("--height-mm", type=float, default=163.7)
    parser.add_argument("--scale", type=int, default=3)
    args = parser.parse_args()

    result = measure_and_upscale(
        args.image,
        args.output,
        body_width_mm=args.width_mm,
        body_height_mm=args.height_mm,
        body_thickness_mm=args.depth_mm,
        scale=args.scale
    )
    print(json.dumps(result))
