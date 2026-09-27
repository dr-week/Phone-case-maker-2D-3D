# Samsung Galaxy A73 5G reference procedure

## Sources retained

- Official Samsung product page and transparent front/back product render.
- Official Samsung support page and user manual for device-part identification.
- Official Samsung dimensions: 163.7 × 76.1 × 7.6 mm.

The images remain in `source/` with their origin recorded in `reference-model.json`. They are engineering references, not redistributed UI artwork.

## Efficient measurement procedure

1. Prefer a manufacturer mechanical drawing or a physically measured phone. If neither exists, use a straight-on image with a known overall dimension.
2. Remove transparent/empty margins using `process_reference.ps1`. Never scale from the full image canvas.
3. Correct lens distortion when the photograph came from a camera. OpenCV camera calibration converts between pixels and real-world units and corrects radial/tangential distortion.
4. If the phone plane is oblique, mark its four outer corners and rectify it with a homography (`getPerspectiveTransform` + `warpPerspective`).
5. Calculate separate X and Y scales after rectification:
   - `x_mm_per_px = 76.1 / rectified_width_px`
   - `y_mm_per_px = 163.7 / rectified_height_px`
   Large disagreement indicates perspective, crop, or silhouette error.
6. Measure camera, flash, button, port, microphone, and speaker bounding boxes relative to the same rectified phone origin—not relative to the image canvas.
7. Record every measurement with its source and confidence. Do not mix coordinates from differently scaled images without transforming them into the same phone coordinate system.
8. Use the image result to generate a test coupon, then validate against the physical phone. Marketing imagery is insufficient for final fit approval.

## Current result

The transparent Samsung render has a 245 × 314 px combined subject bound. The visible back-phone height is approximately 314 px, giving about 0.521 mm/px from the official 163.7 mm height. The camera island is approximately 35 × 43 mm. Because the front and back renders overlap, port/button coordinates are deliberately not inferred from this asset.

## Confidence levels

- **Authoritative:** Samsung-published body dimensions.
- **Reference-only:** Camera-island estimate from Samsung’s orthographic-style marketing render.
- **Unverified:** Port, microphone, speaker, button, corner radius, camera protrusion, and exact lens coordinates.
