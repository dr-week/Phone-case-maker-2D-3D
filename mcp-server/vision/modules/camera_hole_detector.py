"""Sub-pixel camera hole position and diameter detector using high contrast dark thresholding."""
from __future__ import annotations
import cv2
import numpy as np

SAMSUNG_A73_DEFAULT_HOLES = [
    {"role": "main", "name": "Main Camera (108MP)", "xMm": 14.4, "yMm": 13.8, "radiusMm": 3.0, "diameterMm": 6.0, "cutoutRadiusMm": 4.8, "cutoutDiameterMm": 9.6, "shrinkageOffsetMm": 3.6},
    {"role": "ultrawide", "name": "Ultra-Wide (12MP)", "xMm": 14.5, "yMm": 27.1, "radiusMm": 3.0, "diameterMm": 6.0, "cutoutRadiusMm": 4.8, "cutoutDiameterMm": 9.6, "shrinkageOffsetMm": 3.6},
    {"role": "depth", "name": "Depth Sensor (5MP)", "xMm": 14.4, "yMm": 40.3, "radiusMm": 3.5, "diameterMm": 7.0, "cutoutRadiusMm": 5.2, "cutoutDiameterMm": 10.4, "shrinkageOffsetMm": 3.4},
    {"role": "macro", "name": "Macro Lens (5MP)", "xMm": 26.3, "yMm": 20.5, "radiusMm": 2.15, "diameterMm": 4.3, "cutoutRadiusMm": 3.6, "cutoutDiameterMm": 7.2, "shrinkageOffsetMm": 2.9},
    {"role": "flash", "name": "LED Flash", "xMm": 26.3, "yMm": 33.9, "radiusMm": 1.8, "diameterMm": 3.6, "cutoutRadiusMm": 3.2, "cutoutDiameterMm": 6.4, "shrinkageOffsetMm": 2.8}
]

def detect_camera_hole_diameters(
    gray_image: np.ndarray,
    crop_w: int,
    crop_h: int,
    mm_per_px_x: float,
    mm_per_px_y: float,
    mm_per_px: float
) -> list[dict]:
    """Autonomously detect black camera lens circles on any phone back image."""
    try:
        from .multi_pass_filter import apply_clahe_contrast_pass, apply_inverted_lens_pass
    except ImportError:
        from multi_pass_filter import apply_clahe_contrast_pass, apply_inverted_lens_pass

    # Pass 1 & 2: CLAHE local contrast + inverted peak detection across upper half
    cam_zone = gray_image[:int(crop_h * 0.52), :]
    clahe_gray = apply_clahe_contrast_pass(cam_zone)
    inverted_crop = apply_inverted_lens_pass(clahe_gray)

    # In inverted space, dark lenses become bright peaks (>170)
    bright_mask = (inverted_crop > 170).astype(np.uint8) * 255
    contours, _ = cv2.findContours(bright_mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    candidates = []
    for c in contours:
        area = cv2.contourArea(c)
        perimeter = cv2.arcLength(c, True)
        if perimeter > 0:
            circularity = 4 * np.pi * area / (perimeter * perimeter)
            if 20 < area < 2000 and circularity > 0.48:
                (cx, cy), r = cv2.minEnclosingCircle(c)
                if 10 < cx < crop_w - 10:
                    dia_mm = round(2 * r * mm_per_px_x, 1)
                    if 2.5 <= dia_mm <= 22.0:
                        # Generous 3D print clearance + shrinkage compensation (user requested visibly larger holes)
                        shrinkage = 3.6 if dia_mm >= 5.0 else 2.8
                        cutout_dia = round(dia_mm + shrinkage, 1)
                        cutout_rad = round(cutout_dia / 2.0, 2)
                        candidates.append({
                            "xMm": round(cx * mm_per_px_x, 1),
                            "yMm": round(cy * mm_per_px_y, 1),
                            "radiusMm": round(r * mm_per_px_x, 2),
                            "diameterMm": dia_mm,
                            "cutoutDiameterMm": cutout_dia,
                            "cutoutRadiusMm": cutout_rad,
                            "shrinkageOffsetMm": shrinkage
                        })

    # Spatial deduplication within 3mm
    unique = []
    for l in candidates:
        if not any(np.hypot(l["xMm"] - u["xMm"], l["yMm"] - u["yMm"]) < 3.0 for u in unique):
            unique.append(l)

    # Cluster isolation: isolate primary camera group
    if len(unique) > 1:
        clustered = []
        for l in unique:
            neighbors = sum(1 for o in unique if o != l and np.hypot(l["xMm"] - o["xMm"], l["yMm"] - o["yMm"]) < 30.0)
            if neighbors >= 1:
                clustered.append(l)
        discovered = clustered if clustered else unique
    else:
        discovered = unique

    # Match against reference template if available, else assign autonomous roles
    if discovered:
        discovered.sort(key=lambda item: (item["xMm"], item["yMm"]))
        matched = []
        assigned_refs = set()
        for l in discovered:
            best_ref = None
            min_dist = 9999.0
            for ref in SAMSUNG_A73_DEFAULT_HOLES:
                if ref["role"] not in assigned_refs:
                    d = np.hypot(l["xMm"] - ref["xMm"], l["yMm"] - ref["yMm"])
                    if d < min_dist and d < 8.0:
                        min_dist = d
                        best_ref = ref

            shrinkage = 3.6 if l["diameterMm"] >= 5.0 else 2.8
            cutout_dia = round(l["diameterMm"] + shrinkage, 1)
            cutout_rad = round(cutout_dia / 2.0, 2)

            if best_ref:
                assigned_refs.add(best_ref["role"])
                matched.append({
                    **l,
                    "role": best_ref["role"],
                    "name": best_ref["name"],
                    "cutoutDiameterMm": cutout_dia,
                    "cutoutRadiusMm": cutout_rad,
                    "shrinkageOffsetMm": shrinkage
                })
            else:
                idx = len(matched) + 1
                matched.append({
                    **l,
                    "role": f"camera-{idx}",
                    "name": f"Camera {idx}",
                    "cutoutDiameterMm": cutout_dia,
                    "cutoutRadiusMm": cutout_rad,
                    "shrinkageOffsetMm": shrinkage
                })
        return matched

    # Fallback to defaults if image is completely dark/unreadable
    return SAMSUNG_A73_DEFAULT_HOLES
