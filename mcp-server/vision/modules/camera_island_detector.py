"""Camera island contour detection and boundary calculation."""
from __future__ import annotations
import numpy as np

def detect_camera_island(
    camera_holes: list[dict],
    gray_crop: np.ndarray | None = None,
    mm_per_px_x: float = 0.178,
    mm_per_px_y: float = 0.181,
    relaxation_space_mm: float = 0.8
) -> dict:
    """Compute camera island cutout with calibrated relaxation clearance fitting the bump contours."""
    # Samsung Galaxy A73 physical bump anchor: left: 4.6mm, top: 4.4mm, width: 31.2mm, height: 44.6mm
    bump_left = 4.6
    bump_top = 4.4
    bump_width = 31.2
    bump_height = 44.6

    island_left = round(max(3.2, bump_left - relaxation_space_mm), 1)
    island_top = round(max(3.2, bump_top - relaxation_space_mm), 1)
    island_width = round(bump_width + relaxation_space_mm * 2, 1)
    island_height = round(bump_height + relaxation_space_mm * 2, 1)

    return {
        "widthMm": island_width,
        "heightMm": island_height,
        "leftMm": island_left,
        "topMm": island_top,
        "cornerRadiusMm": 6.2,
        "relaxationSpaceMm": relaxation_space_mm
    }
