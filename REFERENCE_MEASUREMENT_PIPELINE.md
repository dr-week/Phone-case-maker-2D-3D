# Deterministic reference-measurement pipeline

This subsystem measures phone features from multiple product images without an AI service at runtime.

## API

`POST http://127.0.0.1:3000/api/reference/measure`

```json
{
  "device": {
    "model": "Samsung Galaxy A73 5G",
    "widthMm": 76.1,
    "heightMm": 163.7,
    "depthMm": 7.6,
    "source": "Samsung specifications"
  },
  "candidates": [
    {
      "id": "gray-back",
      "path": "references/a73/source/gray-back.png",
      "sourceUrl": "https://example.com/original.png",
      "color": "gray",
      "viewHint": "back"
    }
  ]
}
```

Paths are restricted to the workspace `references` directory. The backend does not fetch arbitrary URLs.

## Current algorithm

1. Normalize orientation and pixels with Sharp.
2. Estimate background color from all four corners.
3. Build a foreground mask and select the largest connected component as the phone.
4. Reject cropped, tiny, non-back and aspect-inconsistent candidates.
5. Calculate independent horizontal and vertical pixel scales from official dimensions.
6. Reject images whose scales disagree by more than 6%; these require perspective rectification.
7. Search the upper-left phone region for a camera-island boundary using deterministic edge energy. Optional review annotations override this initial detector.
8. Convert every feature into phone-relative millimetres.
9. Combine accepted color/reference measurements with the median, report maximum spread and lower confidence when images disagree.
10. Always return `printReady: false` until physical depth, ports, buttons, microphones and speakers have passed review.

## Separation of responsibilities

- `types.ts`: stable measurement and provenance contract.
- `image-analysis.ts`: single-image pixels, silhouette, scaling and feature detection.
- `pipeline.ts`: multi-image consensus and confidence.
- `validation.ts`: safe API inputs and workspace path boundaries.
- Blender and the web preview should consume only an approved measurement result, never raw image guesses.

The next deterministic improvements are perspective rectification from four detected corners, rounded-rectangle fitting for the camera island, circle detection for lenses/flash, and an overlay editor for quick human correction. Those additions fit behind the current interfaces without changing case generation.
