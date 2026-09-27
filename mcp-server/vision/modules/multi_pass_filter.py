"""Multi-pass vision filter: CLAHE contrast, lens inversion, and structural edge fusion."""
from __future__ import annotations
import cv2
import numpy as np

def apply_clahe_contrast_pass(
    gray: np.ndarray,
    clip_limit: float = 3.2,
    tile_grid_size: tuple[int, int] = (8, 8)
) -> np.ndarray:
    """Pass 1: Contrast Limited Adaptive Histogram Equalization to separate shadows & body."""
    clahe = cv2.createCLAHE(clipLimit=clip_limit, tileGridSize=tile_grid_size)
    return clahe.apply(gray)

def apply_inverted_lens_pass(gray: np.ndarray) -> np.ndarray:
    """Pass 2: Inverted negative pass turning dark camera circles & crevices into bright peaks."""
    return cv2.bitwise_not(gray)

def apply_structural_sharpness_pass(
    img_bgr: np.ndarray,
    d: int = 7,
    sigma_color: float = 50.0,
    sigma_space: float = 50.0,
    sharpness_amount: float = 1.5
) -> np.ndarray:
    """Pass 3: Edge-preserving bilateral denoising + unsharp structural amplification."""
    denoised = cv2.bilateralFilter(img_bgr, d=d, sigmaColor=sigma_color, sigmaSpace=sigma_space)
    gaussian = cv2.GaussianBlur(denoised, (0, 0), sigmaX=2.0)
    sharpened = cv2.addWeighted(denoised, 1.0 + sharpness_amount, gaussian, -sharpness_amount, 0)
    return np.clip(sharpened, 0, 255).astype(np.uint8)

def fuse_multi_pass_edges(
    clahe_gray: np.ndarray,
    inverted_gray: np.ndarray,
    sharp_gray: np.ndarray
) -> np.ndarray:
    """Pass 4: Fuses morphological gradients across contrast, inverted, and sharp passes."""
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    grad_clahe = cv2.morphologyEx(clahe_gray, cv2.MORPH_GRADIENT, kernel)
    grad_inverted = cv2.morphologyEx(inverted_gray, cv2.MORPH_GRADIENT, kernel)
    grad_sharp = cv2.morphologyEx(sharp_gray, cv2.MORPH_GRADIENT, kernel)

    # Max-pool gradients across passes to retain all sharp boundaries
    fused = np.maximum(grad_clahe, np.maximum(grad_inverted, grad_sharp))
    return cv2.normalize(fused, None, 0, 255, cv2.NORM_MINMAX)
