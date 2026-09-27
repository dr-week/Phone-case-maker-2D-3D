/**
 * PhoneGeometryContract  v1
 *
 * Single source of truth flowing from approved 2D markers into Three.js and
 * Blender. Every dimension carries provenance and confidence so the review
 * interface can surface low-confidence measurements without silently defaulting.
 *
 * Rules:
 *  - All distances are in millimetres, relative to the phone body origin
 *    (top-left corner of the front face, Y increasing downward).
 *  - Every measured field has a MeasuredValue wrapper.
 *  - `approvedAt` is null until the user explicitly clicks "Approve 2D →".
 *  - Consumers MUST NOT read DEFAULT_* constants at runtime; use this contract.
 */

export type ConfidenceClass =
  | 'confirmed'    // entered by user or cross-validated against spec sheet
  | 'measured'     // derived from ≥2 calibrated images with IQR agreement
  | 'image-derived'// derived from a single calibrated image
  | 'inferred';    // computed from related measurements (e.g. max = body + protrusion)

export interface MeasuredValue {
  valueMm: number;
  confidenceScore: number;         // 0–1; < 0.5 blocks approval
  confidenceClass: ConfidenceClass;
  sourceImages: string[];          // UUIDs / filenames of contributing images
  spreadMm?: number;               // max deviation across source images (mm)
}

export interface MeasuredCircle {
  xMm: MeasuredValue;
  yMm: MeasuredValue;
  radiusMm: MeasuredValue;
  role: string;                    // 'main' | 'ultrawide' | 'depth' | 'macro' | 'flash'
  name: string;
}

export interface MeasuredRect {
  leftMm: MeasuredValue;
  topMm: MeasuredValue;
  widthMm: MeasuredValue;
  heightMm: MeasuredValue;
  cornerRadiusMm: MeasuredValue;
}

export interface PerImageCalibration {
  imageId: string;
  viewKind: 'front' | 'back' | 'side';
  mmPerPxX: number;
  mmPerPxY: number;
  /** Known reference dimension used for calibration. */
  knownWidthMm: number;
  knownHeightMm: number;
  knownThicknessMm: number;
  usable: boolean;
  warnings: string[];
}

export interface ButtonFeatureContract {
  name: string;
  side: 'left' | 'right' | 'top' | 'bottom';
  topOffsetMm: MeasuredValue;
  lengthMm: MeasuredValue;
  protrusionMm: MeasuredValue;
  purpose: string;
}

export interface PortFeatureContract {
  name: string;
  side: 'bottom' | 'top' | 'left' | 'right';
  centerOffsetMm: MeasuredValue; // from phone centerline
  widthMm: MeasuredValue;
  heightMm: MeasuredValue;
}

export interface SpeakerFeatureContract {
  side: 'bottom' | 'top';
  centerOffsetMm: MeasuredValue;
  widthMm: MeasuredValue;
  heightMm: MeasuredValue;
}

/** Fully approved geometry. Passed as-is to Three.js and Blender. */
export interface PhoneGeometryContract {
  schemaVersion: 1;
  phoneModel: string;             // free-form label entered by user
  capturedAt: string;             // ISO-8601 timestamp of first image upload
  approvedAt: string | null;      // null until user clicks "Approve 2D →"
  contractId: string;             // UUID assigned at creation

  /** Per-image calibration records (one per uploaded image). */
  calibration: PerImageCalibration[];

  body: {
    widthMm: MeasuredValue;
    heightMm: MeasuredValue;
    thicknessMm: MeasuredValue;
    cornerRadiusMm: MeasuredValue;
  };

  cameraIsland: MeasuredRect & {
    lenses: MeasuredCircle[];
    flash: MeasuredCircle | null;
  };

  cameraProtrusion: MeasuredValue;
  maximumThicknessMm: MeasuredValue; // body + protrusion

  buttons: ButtonFeatureContract[];
  ports: PortFeatureContract[];
  speakers: SpeakerFeatureContract[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a MeasuredValue from a single observation (image-derived). */
export function singleObservation(
  valueMm: number,
  sourceImage: string,
  confidence = 0.6
): MeasuredValue {
  return {
    valueMm,
    confidenceScore: confidence,
    confidenceClass: 'image-derived',
    sourceImages: [sourceImage],
  };
}

/** Build a MeasuredValue from multiple calibrated observations. */
export function fusedObservation(
  values: number[],
  sourceImages: string[]
): MeasuredValue {
  if (values.length === 0) throw new Error('fusedObservation: no values');
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  const spread = sorted.length > 1 ? sorted[sorted.length - 1] - sorted[0] : 0;
  // IQR-based confidence: 0 spread → 1.0, 5mm spread → 0.4
  const confidence = Math.max(0.1, Math.min(1.0, 1.0 - spread / 8));
  const confidenceClass: ConfidenceClass = values.length >= 2 ? 'measured' : 'image-derived';
  return {
    valueMm: +median.toFixed(3),
    confidenceScore: +confidence.toFixed(3),
    confidenceClass,
    sourceImages,
    spreadMm: +spread.toFixed(3),
  };
}

/** True when every required field's confidence is acceptable for approval. */
export function isContractApprovable(contract: PhoneGeometryContract): {
  ok: boolean;
  lowConfidenceFields: string[];
} {
  const THRESHOLD = 0.5;
  const low: string[] = [];
  const check = (field: string, mv: MeasuredValue) => {
    if (mv.confidenceScore < THRESHOLD) low.push(field);
  };

  check('body.widthMm', contract.body.widthMm);
  check('body.heightMm', contract.body.heightMm);
  check('body.thicknessMm', contract.body.thicknessMm);
  check('body.cornerRadiusMm', contract.body.cornerRadiusMm);
  check('cameraIsland.widthMm', contract.cameraIsland.widthMm);
  check('cameraIsland.heightMm', contract.cameraIsland.heightMm);
  check('cameraIsland.leftMm', contract.cameraIsland.leftMm);
  check('cameraIsland.topMm', contract.cameraIsland.topMm);
  check('cameraProtrusion', contract.cameraProtrusion);
  contract.cameraIsland.lenses.forEach((l, i) => {
    check(`lens[${i}].radiusMm`, l.radiusMm);
  });

  return { ok: low.length === 0, lowConfidenceFields: low };
}

/** Extract flat dimensions for Three.js / Blender, asserting approval. */
export function contractToGeometryInputs(contract: PhoneGeometryContract) {
  if (!contract.approvedAt) {
    throw new Error('Contract has not been approved. Call isContractApprovable and require user approval first.');
  }
  return {
    widthMm: contract.body.widthMm.valueMm,
    heightMm: contract.body.heightMm.valueMm,
    thicknessMm: contract.body.thicknessMm.valueMm,
    cornerRadiusMm: contract.body.cornerRadiusMm.valueMm,
    cameraIsland: {
      widthMm: contract.cameraIsland.widthMm.valueMm,
      heightMm: contract.cameraIsland.heightMm.valueMm,
      leftMm: contract.cameraIsland.leftMm.valueMm,
      topMm: contract.cameraIsland.topMm.valueMm,
      cornerRadiusMm: contract.cameraIsland.cornerRadiusMm.valueMm,
    },
    cameraHoles: [
      ...contract.cameraIsland.lenses.map(l => ({
        role: l.role,
        name: l.name,
        xMm: l.xMm.valueMm,
        yMm: l.yMm.valueMm,
        radiusMm: l.radiusMm.valueMm,
        diameterMm: l.radiusMm.valueMm * 2,
        cutoutRadiusMm: l.radiusMm.valueMm + (l.radiusMm.valueMm >= 2.5 ? 1.8 : 1.4),
        cutoutDiameterMm: (l.radiusMm.valueMm + (l.radiusMm.valueMm >= 2.5 ? 1.8 : 1.4)) * 2,
        shrinkageOffsetMm: (l.radiusMm.valueMm >= 2.5 ? 1.8 : 1.4) * 2,
      })),
      ...(contract.cameraIsland.flash ? [{
        role: 'flash',
        name: 'LED Flash',
        xMm: contract.cameraIsland.flash.xMm.valueMm,
        yMm: contract.cameraIsland.flash.yMm.valueMm,
        radiusMm: contract.cameraIsland.flash.radiusMm.valueMm,
        diameterMm: contract.cameraIsland.flash.radiusMm.valueMm * 2,
        cutoutRadiusMm: contract.cameraIsland.flash.radiusMm.valueMm + 1.4,
        cutoutDiameterMm: (contract.cameraIsland.flash.radiusMm.valueMm + 1.4) * 2,
        shrinkageOffsetMm: 2.8,
      }] : []),
    ],
    buttons: contract.buttons.map(b => ({
      name: b.name,
      side: b.side,
      topOffsetMm: b.topOffsetMm.valueMm,
      lengthMm: b.lengthMm.valueMm,
      protrusionMm: b.protrusionMm.valueMm,
      purpose: b.purpose,
    })),
    protrusionMm: contract.cameraProtrusion.valueMm,
  };
}
