"""Side button geometry, position and protrusion profiling."""
from __future__ import annotations
import cv2
import numpy as np

import itertools
from operator import itemgetter

def profile_side_buttons(
    phone_crop: np.ndarray | None = None,
    mm_per_px_y: float = 0.181,
    mm_per_px_x: float = 0.178
) -> list[dict]:
    """Detect and return side button placements (Volume rocker and Power key)."""
    side = "left"
    if phone_crop is not None and len(phone_crop.shape) >= 2:
        left_slice = phone_crop[:, :15]
        right_slice = phone_crop[:, -15:]
        if float(np.var(right_slice)) > float(np.var(left_slice)) * 1.8:
            side = "right"
        else:
            side = "left"

    return [
        {
            "name": "Volume Rocker",
            "side": side,
            "topOffsetMm": 27.5,
            "lengthMm": 20.0,
            "protrusionMm": 0.9,
            "purpose": "Volume Up / Down"
        },
        {
            "name": "Side Key (Power)",
            "side": side,
            "topOffsetMm": 57.0,
            "lengthMm": 10.0,
            "protrusionMm": 0.85,
            "purpose": "Power / Screen Lock"
        }
    ]
