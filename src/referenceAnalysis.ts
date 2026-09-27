const BRIDGE='http://127.0.0.1:3000';
export type ReferenceAnalysis={engine:string;summary:{total:number;accepted:number;rejected:number;detectedViews:string[]};geometry:{body:{widthMm:number;heightMm:number;thicknessMm:number;classification:string};cameraIsland:{widthMm:number;heightMm:number;leftMm:number;topMm:number;cornerRadiusMm:number;lenses:{role:string;xMm:number;yMm:number;radiusMm:number}[];flash:{xMm:number;yMm:number;radiusMm:number};confidence:number;classification:string};cameraProtrusion:{valueMm:number|null;sampleCount:number;classification:string};maximumThicknessMm:number|null};generationPolicy:{prototypeAllowed:boolean;printReady:boolean;reason:string}};

export type CameraHoleFeature = {
  role: string;
  name: string;
  xMm: number;
  yMm: number;
  radiusMm: number;
  diameterMm: number;
  cutoutRadiusMm?: number;
  cutoutDiameterMm?: number;
  shrinkageOffsetMm?: number;
};

export type ButtonFeature = {
  name: string;
  side: string;
  topOffsetMm: number;
  lengthMm: number;
  protrusionMm: number;
  purpose: string;
};

export type UpscaleMeasurementResult = {
  engine: string;
  dimensions: { widthMm: number; heightMm: number; thicknessMm: number };
  cornerCurvature: { averageRadiusMm: number; corners: Record<string, number> };
  cameraIsland: { widthMm: number; heightMm: number; leftMm: number; topMm: number; cornerRadiusMm: number; relaxationSpaceMm?: number };
  cameraHoles: CameraHoleFeature[];
  buttons: ButtonFeature[];
  upscaledImage: { path: string; width: number; height: number; scale: number };
};

export async function analyzeReferences():Promise<ReferenceAnalysis>{const response=await fetch(`${BRIDGE}/api/reference/a73-analysis`);const result=await response.json();if(!response.ok)throw new Error(result.error||'Reference analysis failed');return result;}

export async function upscaleAndMeasureReference(path?: string): Promise<UpscaleMeasurementResult> {
  const response = await fetch(`${BRIDGE}/api/reference/upscale-and-measure`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ path, depthMm: 7.6, widthMm: 76.1, heightMm: 163.7, scale: 4 })
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Upscale and measurement failed');
  return result;
}
