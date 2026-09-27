"""Create a clean, tightly cropped transparent phone texture with smooth anti-aliased edges."""
import argparse
from pathlib import Path
import cv2
import numpy as np

parser = argparse.ArgumentParser()
parser.add_argument("input")
parser.add_argument("output")
parser.add_argument("--scale", type=int, default=4)
args = parser.parse_args()

source = cv2.imread(args.input, cv2.IMREAD_UNCHANGED)
if source is None:
    raise ValueError(f"Unable to read input image: {args.input}")

# Clean low-alpha noise if input has transparency
if len(source.shape) == 3 and source.shape[2] == 4:
    has_alpha = bool(np.any(source[:, :, 3] < 200))
    if has_alpha:
        clean_mask = source[:, :, 3] > 15
        source[~clean_mask] = 0
else:
    has_alpha = False
    if len(source.shape) == 2:
        source = cv2.cvtColor(source, cv2.COLOR_GRAY2BGRA)
    else:
        source = cv2.cvtColor(source, cv2.COLOR_BGR2BGRA)

h, w = source.shape[:2]

if has_alpha:
    fg_mask = (source[:, :, 3] > 15).astype(np.uint8) * 255
else:
    borders = np.concatenate([
        source[0, :, :3], source[-1, :, :3], source[:, 0, :3], source[:, -1, :3]
    ])
    bg_color = np.median(borders, axis=0).astype(np.float32)
    distance = np.linalg.norm(source[:, :, :3].astype(np.float32) - bg_color, axis=2)
    fg_mask = (distance > 18).astype(np.uint8) * 255
    fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8), iterations=2)

count, labels, stats, _ = cv2.connectedComponentsWithStats(fg_mask, 8)
if count < 2:
    raise ValueError("No phone foreground found")
label = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
component = (labels == label).astype(np.uint8) * 255

contours, _ = cv2.findContours(component, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
x, y, cw, ch = cv2.boundingRect(max(contours, key=cv2.contourArea))

phone_crop = source[y:y+ch, x:x+cw].copy()
mask_crop = np.zeros((ch, cw), dtype=np.uint8)
inset = max(1, round(min(cw, ch) * 0.008))
radius = max(4, round(min(cw * 0.10, ch * 0.045)))
x0, y0, x1, y1 = inset, inset, cw - inset - 1, ch - inset - 1
cv2.rectangle(mask_crop, (x0 + radius, y0), (x1 - radius, y1), 255, -1)
cv2.rectangle(mask_crop, (x0, y0 + radius), (x1, y1 - radius), 255, -1)
for cx, cy in ((x0 + radius, y0 + radius), (x1 - radius, y0 + radius), (x0 + radius, y1 - radius), (x1 - radius, y1 - radius)):
    cv2.circle(mask_crop, (cx, cy), radius, 255, -1)

# Upscale before edge refinement for smooth sub-pixel borders
scale = max(2, args.scale)
up_w, up_h = cw * scale, ch * scale
up_rgb = cv2.resize(phone_crop[:, :, :3], (up_w, up_h), interpolation=cv2.INTER_LANCZOS4)
up_mask = cv2.resize(mask_crop, (up_w, up_h), interpolation=cv2.INTER_LANCZOS4)

# Sub-pixel smooth edge anti-aliasing
up_smooth = cv2.GaussianBlur(up_mask.astype(np.float32) / 255.0, (0, 0), sigmaX=scale * 0.45)
up_alpha = np.clip((up_smooth - 0.5) * 3.5 + 0.5, 0.0, 1.0) * 255.0
up_alpha = up_alpha.astype(np.uint8)

# Color de-fringing: prevent background bleed on transitional edge pixels
eroded = cv2.erode(up_mask, np.ones((scale + 1, scale + 1), np.uint8))
edge_pixels = (up_alpha > 0) & (eroded == 0)
if np.any(edge_pixels):
    # Inpaint edge RGB from interior to eliminate white/light background halo
    inpaint_mask = (~eroded).astype(np.uint8)
    up_rgb_clean = cv2.inpaint(up_rgb, inpaint_mask, inpaintRadius=scale, flags=cv2.INPAINT_TELEA)
    # Blend inpainted color onto edge
    edge_weight = ((255 - up_alpha[edge_pixels]) / 255.0)[:, np.newaxis]
    up_rgb[edge_pixels] = (up_rgb[edge_pixels] * (1.0 - edge_weight) + up_rgb_clean[edge_pixels] * edge_weight).astype(np.uint8)

up_rgba = cv2.cvtColor(up_rgb, cv2.COLOR_BGR2BGRA)
up_rgba[:, :, 3] = up_alpha

# Supersampled downscale
final_crop = cv2.resize(up_rgba, (cw, ch), interpolation=cv2.INTER_AREA)

out_path = Path(args.output)
out_path.parent.mkdir(parents=True, exist_ok=True)
cv2.imwrite(str(out_path), final_crop)
print(f"PHONE_TEXTURE bounds={x:.1f},{y:.1f},{cw:.1f},{ch:.1f} output={args.output}")
