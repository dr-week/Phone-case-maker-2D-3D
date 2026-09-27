"""OpenCV edge-preserving super-resolution and detail clearing."""
from __future__ import annotations
import cv2
import numpy as np

def enhance_and_sharpen_edges(
    phone_crop: np.ndarray,
    crop_mask: np.ndarray,
    scale: int = 3
) -> tuple[np.ndarray, int, int]:
    """Upscale and clear out all edges using edge-preserving detail filters."""
    bh, bw = phone_crop.shape[:2]
    up_w, up_h = bw * scale, bh * scale
    up_rgb = cv2.resize(phone_crop, (up_w, up_h), interpolation=cv2.INTER_LANCZOS4)
    up_mask = cv2.resize(crop_mask, (up_w, up_h), interpolation=cv2.INTER_LANCZOS4)

    try:
        from .multi_pass_filter import apply_structural_sharpness_pass
    except ImportError:
        from multi_pass_filter import apply_structural_sharpness_pass

    try:
        up_enhanced = cv2.edgePreservingFilter(up_rgb, flags=1, sigma_s=40, sigma_r=0.25)
        up_enhanced = cv2.detailEnhance(up_enhanced, sigma_s=10, sigma_r=0.15)
        sharp_rgb = apply_structural_sharpness_pass(up_enhanced, d=7, sigma_color=50, sigma_space=50, sharpness_amount=1.4)
    except Exception:
        sharp_rgb = apply_structural_sharpness_pass(up_rgb, d=7, sigma_color=50, sigma_space=50, sharpness_amount=1.4)

    up_smooth_mask = cv2.GaussianBlur(up_mask.astype(np.float32) / 255.0, (0, 0), sigmaX=scale * 0.45)
    up_alpha = np.clip((up_smooth_mask - 0.5) * 3.5 + 0.5, 0.0, 1.0) * 255.0
    up_alpha = up_alpha.astype(np.uint8)

    # Pull boundary colour from the phone interior. This removes the bright,
    # blocky fringe embedded in marketplace JPEGs without changing the alpha.
    eroded = cv2.erode(up_mask, np.ones((scale * 2 + 1, scale * 2 + 1), np.uint8))
    boundary = (up_alpha > 0) & (eroded == 0)
    if np.any(boundary):
        repaired = cv2.inpaint(sharp_rgb, (eroded == 0).astype(np.uint8) * 255, scale * 2, cv2.INPAINT_TELEA)
        sharp_rgb[boundary] = repaired[boundary]

    up_rgba = cv2.cvtColor(sharp_rgb, cv2.COLOR_BGR2BGRA)
    up_rgba[:, :, 3] = up_alpha
    return up_rgba, up_w, up_h
