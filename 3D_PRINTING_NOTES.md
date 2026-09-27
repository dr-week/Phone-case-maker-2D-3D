# A73 PLA case: design and print baseline

## Implemented baseline

- Samsung body envelope: **163.7 × 76.1 × 7.6 mm**.
- Per-side fit clearance: **0.35 mm** as a starting value, to be calibrated by printer.
- Wall: **1.6 mm**, equal to four 0.4 mm extrusion widths.
- Rounded shell transitions, consistent nominal wall, open face, camera/USB-C/speaker/button cutouts, reinforced corners, and corner insertion reliefs for rigid PLA.
- Export remains editable in Blender.

## Recommended print profile

- Material: PLA; 0.4 mm nozzle; 0.20 mm layer height.
- Four perimeters; back face placed on the build plate; no support inside the phone cavity.
- Print a corner-and-side test coupon before the full case and measure the real phone/printer combination.

## Known limitations

- Published phone dimensions describe the body envelope, not the exact camera-island, button, microphone, speaker, and port coordinates. Those cutouts remain provisional until measured from a physical A73 or a verified mechanical drawing.
- PLA is rigid and can crack under repeated snap-fit flexing. The relief cuts reduce insertion stress but do not make PLA behave like TPU.
- Printer XY error, elephant foot, filament shrinkage, and slicer line-width behavior vary. The 0.35 mm clearance is a baseline, not a universal production tolerance.
- Boolean geometry should be checked in Blender for non-manifold edges before STL/3MF export. A successful script run is not proof of printability.
- This is a prototype workflow, not certification to an ISO/ASTM production-quality system.

## Acceptance checks

1. Mesh has no non-manifold edges, loose geometry, inverted normals, or zero-area faces.
2. Minimum wall is at least 1.2 mm everywhere; nominal wall is 1.6 mm.
3. Ports and buttons have physical clearance after slicing.
4. Phone inserts without excessive force and remains retained when inverted.
5. Camera and screen lips do not interfere with lenses, flash, screen gestures, or charging cables.
