export type ProductDesignType = 'back-case' | 'back-panel';

export interface BackCoverDesignParams {
  designType?: ProductDesignType; // 'back-case' = full protective case with side walls & buttons; 'back-panel' = replacement backplate (flush fit, 0 side wrap)
  coverWidthMm: number;        // 75 mm
  coverHeightMm: number;       // 170 mm
  coverThicknessMm: number;    // 1.8 mm (case) or ~0.9-1.2 mm (panel)
  cornerCurvatureMm: number;   // 8.5 mm

  // Camera Bump
  bumpWidthMm: number;         // 65 mm
  bumpHeightMm: number;        // 45 mm
  bumpLeftMarginMm: number;    // 5 mm (yields right margin = 75 - 65 - 5 = 5mm)
  bumpTopMarginMm: number;     // 5 mm (approx 50mm top camera zone)
  bumpDepthMm: number;         // 8 mm hollow depth (or flush 0.8-1.5 mm bezel)
  bumpCornerRadiusMm: number;  // 8.0 mm
  bumpWallThicknessMm: number; // 1.8 mm

  // Camera Opening inside bump
  cameraOpeningWidthMm: number;   // 30 mm
  cameraOpeningHeightMm: number;  // 35 mm
  cameraOpeningLeftOffsetMm: number; // 4 mm inside bump
  cameraOpeningTopOffsetMm: number;  // 5 mm inside bump
  cameraOpeningRadiusMm: number;     // 5.0 mm
  cameraOpeningRimMm: number;        // 1.2 mm protective rim
}

export const IPHONE_INSPIRED_BACK_COVER_DEFAULT: BackCoverDesignParams = {
  coverWidthMm: 75.0,
  coverHeightMm: 170.0,
  coverThicknessMm: 1.8,
  cornerCurvatureMm: 8.5,

  bumpWidthMm: 65.0,
  bumpHeightMm: 45.0,
  bumpLeftMarginMm: 5.0,
  bumpTopMarginMm: 6.0,
  bumpDepthMm: 8.0,
  bumpCornerRadiusMm: 7.5,
  bumpWallThicknessMm: 1.8,

  cameraOpeningWidthMm: 30.0,
  cameraOpeningHeightMm: 36.0,
  cameraOpeningLeftOffsetMm: 4.5,
  cameraOpeningTopOffsetMm: 4.5,
  cameraOpeningRadiusMm: 5.5,
  cameraOpeningRimMm: 1.2
};
