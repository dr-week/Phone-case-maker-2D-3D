export type Confidence = 'confirmed' | 'image-derived' | 'inferred' | 'measured';

export type Rect = { x: number; y: number; width: number; height: number };
export type Circle = { x: number; y: number; radius: number };

export type DeviceEnvelope = {
  model: string;
  widthMm: number;
  heightMm: number;
  depthMm: number;
  source: string;
};

export type ReferenceCandidate = {
  id: string;
  path: string;
  sourceUrl?: string;
  color?: string;
  viewHint?: 'back' | 'front' | 'side' | 'perspective' | 'unknown';
  /** Optional review annotation. Coordinates refer to the original image. */
  cameraIslandHint?: Rect;
  lensHints?: Circle[];
  flashHint?: Circle;
};

export type CandidateAnalysis = {
  id: string;
  accepted: boolean;
  score: number;
  reasons: string[];
  image: { width: number; height: number };
  phoneBounds?: Rect;
  mmPerPixel?: { x: number; y: number; combined: number; disagreement: number };
  cameraIslandMm?: Rect;
  lensesMm?: Circle[];
  flashMm?: Circle;
  provenance: { path: string; sourceUrl?: string; color?: string; method: string };
};

export type MeasurementResult = {
  schemaVersion: 1;
  device: DeviceEnvelope;
  candidates: CandidateAnalysis[];
  selectedCandidateIds: string[];
  cameraIsland?: {
    rectMm: Rect;
    confidence: number;
    classification: Confidence;
    spreadMm: Rect;
  };
  printReady: false;
  requiredReview: string[];
};
