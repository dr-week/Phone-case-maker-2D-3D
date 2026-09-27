/**
 * online_device_spec_fetcher.ts
 *
 * Simulates and retrieves online phone chassis and back panel replacement specifications:
 * - Dimensions (Length, Width, Thickness, Corner Curvature)
 * - Camera island parameters (Dimensions, Bezel Margins, Hollow Depth)
 * - Back panel replacement availability, material (AG Glass, PC/PMMA), adhesive type, supplier origin
 * - Supports creating custom user-measured devices with instant 2D/3D workspace creation
 */

import type { PhoneModelRecord, BackPanelReplacementInfo } from './phone_database_india';

export interface CustomDeviceInput {
  brand: string;
  model: string;
  widthMm: number;
  heightMm: number;
  thicknessMm: number;
  cornerCurvatureMm?: number;
  bumpWidthMm?: number;
  bumpHeightMm?: number;
  bumpDepthMm?: number;
  bumpLeftMarginMm?: number;
  bumpTopMarginMm?: number;
}

export class OnlineDeviceSpecService {
  /**
   * Generates a fully calibrated PhoneModelRecord from user-specified physical measurements.
   */
  static createCustomDeviceRecord(input: CustomDeviceInput): PhoneModelRecord {
    const id = `custom-${input.brand.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${input.model.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;
    const cornerR = input.cornerCurvatureMm || 8.0;
    const bumpW = input.bumpWidthMm || Math.min(input.widthMm - 20, 40);
    const bumpH = input.bumpHeightMm || Math.min(input.heightMm - 50, 55);
    const bumpDepth = input.bumpDepthMm || 2.5;
    const bumpLeft = input.bumpLeftMarginMm || 5.0;
    const bumpTop = input.bumpTopMarginMm || 6.0;

    const backPanelReplacement: BackPanelReplacementInfo = {
      isAvailableOnline: true,
      marketPriceEstimateInr: 950,
      material: 'PMMA/PC Composite',
      adhesivePreCutAvailable: true,
      supplierOrigin: 'Shenzhen / Guangdong Suppliers',
      difficultyRating: 'Easy (Heat & Spudger)'
    };

    return {
      id,
      brand: input.brand || 'Custom',
      model: input.model || 'Custom Phone Model',
      market: 'Custom',
      isPopularInIndia: false,
      isCustomDevice: true,
      specsSummary: `User Measured · ${input.heightMm} × ${input.widthMm} × ${input.thicknessMm} mm · Custom Back Cover`,
      dimensions: {
        widthMm: input.widthMm,
        heightMm: input.heightMm,
        thicknessMm: input.thicknessMm,
        cornerCurvatureMm: cornerR
      },
      backCoverDefault: {
        coverWidthMm: input.widthMm,
        coverHeightMm: input.heightMm,
        coverThicknessMm: 1.8,
        cornerCurvatureMm: cornerR,
        bumpWidthMm: bumpW,
        bumpHeightMm: bumpH,
        bumpLeftMarginMm: bumpLeft,
        bumpTopMarginMm: bumpTop,
        bumpDepthMm: bumpDepth,
        bumpCornerRadiusMm: 6.5,
        bumpWallThicknessMm: 1.8,
        cameraOpeningWidthMm: Math.max(20, bumpW - 8),
        cameraOpeningHeightMm: Math.max(25, bumpH - 10),
        cameraOpeningLeftOffsetMm: 4.0,
        cameraOpeningTopOffsetMm: 5.0,
        cameraOpeningRadiusMm: 5.0,
        cameraOpeningRimMm: 1.2
      },
      backPanelReplacement
    };
  }

  /**
   * Search external device catalog / manufacturer database simulation.
   */
  static searchOnlineCatalog(query: string): Partial<PhoneModelRecord>[] {
    const q = query.toLowerCase();
    const catalog: Partial<PhoneModelRecord>[] = [
      {
        brand: 'Nothing',
        model: 'Nothing Phone (2)',
        dimensions: { widthMm: 76.4, heightMm: 162.1, thicknessMm: 8.6, cornerCurvatureMm: 8.5 },
        specsSummary: 'Transparent Glyph Glass Back · Dual 50MP · 162.1 × 76.4 × 8.6 mm'
      },
      {
        brand: 'Vivo',
        model: 'Vivo V29 Pro 5G',
        dimensions: { widthMm: 74.4, heightMm: 164.2, thicknessMm: 7.5, cornerCurvatureMm: 9.0 },
        specsSummary: 'Aura Light · 3D Curved Glass Back · 164.2 × 74.4 × 7.5 mm'
      },
      {
        brand: 'Google',
        model: 'Google Pixel 8 Pro',
        dimensions: { widthMm: 76.5, heightMm: 162.6, thicknessMm: 8.8, cornerCurvatureMm: 10.0 },
        specsSummary: 'Horizontal Camera Visor Bar · Matte AG Glass · 162.6 × 76.5 × 8.8 mm'
      },
      {
        brand: 'Poco',
        model: 'Poco X5 Pro 5G',
        dimensions: { widthMm: 76.0, heightMm: 162.9, thicknessMm: 7.9, cornerCurvatureMm: 8.0 },
        specsSummary: 'Flat Edge Boxy Design · 108MP Triple Cam · 162.9 × 76.0 × 7.9 mm'
      }
    ];

    return catalog.filter(
      item => item.model?.toLowerCase().includes(q) || item.brand?.toLowerCase().includes(q)
    );
  }
}
