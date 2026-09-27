# Galaxy A73 case-model accuracy audit

## What is confirmed

- Galaxy A73 5G body envelope: **76.1 × 163.7 × 7.6 mm**, from Samsung's published specifications.
- The preview uses those proportions and updates the perspective-camera aspect ratio with its container, so browser resizing does not stretch the scene.

## What is estimated, not production-ready

- Camera-island envelope: approximately **35 × 43 mm**, traced from an official Samsung marketing render.
- Camera-island offsets, corner radius, protrusion, lens centers and lens diameters.
- USB-C, speaker, microphone, SIM-tray and button locations and clearances.
- Phone corner radii, display/glass curvature and the transition between the back and side frame.
- Case retention lip, camera protection lip, button covers, insertion reliefs and cable-plug clearance.

The Samsung render contains overlapping front and rear phones, has no scale marker and is not a mechanical drawing. It can establish layout and rough proportions, but cannot establish print tolerances.

## Modeling mistakes found

1. The web preview and Blender add-on independently construct geometry, so they can disagree even when both appear correct.
2. The previous preview showed four equal lenses in a square. The A73 has three larger lenses down the left, a smaller upper-right lens, and a flash below it.
3. The preview shows a stylized camera plate; Blender makes one rounded rectangular through-cutout. Neither models a measured camera protrusion or protective lip.
4. Port and button cutters are hard-coded guesses. A 1–2 mm position error is enough to make a printed case unusable.
5. Corner reinforcements are separate Blender objects rather than a verified watertight union with the shell.
6. The model lacks measured screen lip, insertion path, button actuation clearance, microphone holes, SIM access and minimum-radius checks.
7. The UI previously called the result “accurate” and “generated” despite those unknowns. It now identifies it as a reference prototype.

## Required path to a fitted case

1. Measure one physical SM-A736B with digital calipers: body, corner radius, all side-feature offsets, camera-island width/height/offset/radius/protrusion, and lens/flash envelope.
2. Take orthographic back and side photographs with a ruler or calibration target in the same plane. Rectify perspective and lens distortion before tracing.
3. Store every measurement in one device schema with source and confidence. Both the browser and Blender must consume that schema.
4. Generate the printable mesh once, then export the same geometry to GLB for the browser and STL/3MF for printing. Do not maintain two visual approximations.
5. Print a thin fit-check coupon for the camera and side openings before printing a complete PLA case.

Until step 1 is complete, the current model is suitable for workflow/UI demonstration and rough prototyping, not a guaranteed-fit case.
