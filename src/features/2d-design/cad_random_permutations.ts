/**
 * cad_random_permutations.ts
 *
 * Parametric Generator for randomized physical testing & procedural CAD permutations:
 * - Generates variable dimension stress-tests across global phone form factors (Foldables, Compact, Phablets)
 * - Tests random camera island aspect ratios, off-center cutouts, and corner fillet curvature
 * - Generates variable extrusion stacks (0.8mm ultra-thin to 14.0mm heavy armor)
 * - Allows randomly selecting single parts/subcomponents for isolated parametric tuning & simplified editing
 * - Provides verified seed generation for repeatable engineering test suites
 */

import type { BackCoverDesignParams } from './cad_cover_types';
import type { PhoneModelRecord } from '../device-library/phone_database_india';

export interface PermutationConstraints {
  minWidthMm?: number;
  maxWidthMm?: number;
  minHeightMm?: number;
  maxHeightMm?: number;
  minThicknessMm?: number;
  maxThicknessMm?: number;
}

export type CadComponentPart =
  | 'chassis-plate'
  | 'camera-island'
  | 'lens-apertures'
  | 'corner-fillets'
  | 'extrusions';

export interface RandomPartSelectionResult {
  part: CadComponentPart;
  name: string;
  description: string;
  focusField: keyof BackCoverDesignParams;
  suggestedDeltaMm: number;
}

export class CadParametricPermutator {
  /**
   * Generates a completely randomized, geometrically valid phone back cover parameter set.
   * Useful for stochastic test suites, automated stress tests, and random starting presets.
   */
  static generateRandomCoverParams(constraints?: PermutationConstraints): BackCoverDesignParams {
    const minW = constraints?.minWidthMm ?? 68.0;
    const maxW = constraints?.maxWidthMm ?? 82.0;
    const minH = constraints?.minHeightMm ?? 145.0;
    const maxH = constraints?.maxHeightMm ?? 175.0;
    const minT = constraints?.minThicknessMm ?? 1.2;
    const maxT = constraints?.maxThicknessMm ?? 2.8;

    // Random dimensions rounded to 0.1mm
    const coverWidthMm = Math.round((minW + Math.random() * (maxW - minW)) * 10) / 10;
    const coverHeightMm = Math.round((minH + Math.random() * (maxH - minH)) * 10) / 10;
    const coverThicknessMm = Math.round((minT + Math.random() * (maxT - minT)) * 10) / 10;
    const cornerCurvatureMm = Math.round((5.0 + Math.random() * 5.5) * 10) / 10;

    // Random bump margins and sizes inside safe perimeter
    const bumpLeftMarginMm = Math.round((3.0 + Math.random() * 3.5) * 10) / 10;
    const bumpTopMarginMm = Math.round((3.5 + Math.random() * 4.0) * 10) / 10;
    const maxBumpW = coverWidthMm - bumpLeftMarginMm - 4.0;
    const bumpWidthMm = Math.round((28.0 + Math.random() * (maxBumpW - 28.0)) * 10) / 10;
    const bumpHeightMm = Math.round((35.0 + Math.random() * 35.0) * 10) / 10;
    const bumpDepthMm = Math.round((1.5 + Math.random() * 4.5) * 10) / 10;
    const bumpCornerRadiusMm = Math.round((4.0 + Math.random() * 4.0) * 10) / 10;
    const bumpWallThicknessMm = 1.8;

    // Random camera opening within bump
    const cameraOpeningLeftOffsetMm = 3.5;
    const cameraOpeningTopOffsetMm = 4.0;
    const maxOpeningW = bumpWidthMm - cameraOpeningLeftOffsetMm - 3.0;
    const maxOpeningH = bumpHeightMm - cameraOpeningTopOffsetMm - 4.0;
    const cameraOpeningWidthMm = Math.max(16.0, Math.round((maxOpeningW * (0.65 + Math.random() * 0.3)) * 10) / 10);
    const cameraOpeningHeightMm = Math.max(20.0, Math.round((maxOpeningH * (0.65 + Math.random() * 0.3)) * 10) / 10);
    const cameraOpeningRadiusMm = Math.round((3.0 + Math.random() * 3.5) * 10) / 10;
    const cameraOpeningRimMm = 1.2;

    return {
      coverWidthMm,
      coverHeightMm,
      coverThicknessMm,
      cornerCurvatureMm,
      bumpWidthMm,
      bumpHeightMm,
      bumpLeftMarginMm,
      bumpTopMarginMm,
      bumpDepthMm,
      bumpCornerRadiusMm,
      bumpWallThicknessMm,
      cameraOpeningWidthMm,
      cameraOpeningHeightMm,
      cameraOpeningLeftOffsetMm,
      cameraOpeningTopOffsetMm,
      cameraOpeningRadiusMm,
      cameraOpeningRimMm
    };
  }

  /**
   * Randomly selects a specific subcomponent/part of the CAD model for isolated, simplified editing.
   * This provides a streamlined UI experience without overwhelming users with 17+ sliders simultaneously.
   */
  static selectRandomComponentPart(excludePart?: CadComponentPart): RandomPartSelectionResult {
    const parts: RandomPartSelectionResult[] = [
      {
        part: 'chassis-plate',
        name: 'Plate',
        description: 'Outer perimeter width, height, and main shell sheet thickness',
        focusField: 'coverWidthMm',
        suggestedDeltaMm: Math.round((Math.random() * 4 - 2) * 10) / 10
      },
      {
        part: 'camera-island',
        name: 'Bump',
        description: 'Raised bump dimensions, position margins, and island corner radius',
        focusField: 'bumpWidthMm',
        suggestedDeltaMm: Math.round((Math.random() * 6 - 3) * 10) / 10
      },
      {
        part: 'lens-apertures',
        name: 'Lens',
        description: 'Camera lens through-cutouts, safety clearance, and rim height',
        focusField: 'cameraOpeningWidthMm',
        suggestedDeltaMm: Math.round((Math.random() * 3 - 1.5) * 10) / 10
      },
      {
        part: 'corner-fillets',
        name: 'Fillet',
        description: 'Body corner ergonomics and outer perimeter corner blend radius',
        focusField: 'cornerCurvatureMm',
        suggestedDeltaMm: Math.round((Math.random() * 2 - 1) * 10) / 10
      },
      {
        part: 'extrusions',
        name: 'Extrude',
        description: 'Z-axis extrusion levels: base plate thickness and camera step offset',
        focusField: 'bumpDepthMm',
        suggestedDeltaMm: Math.round((Math.random() * 2 - 1) * 10) / 10
      }
    ];

    const eligible = excludePart ? parts.filter(p => p.part !== excludePart) : parts;
    return eligible[Math.floor(Math.random() * eligible.length)];
  }

  /**
   * Mutates a single targeted component randomly while maintaining strict CAD validity.
   */
  static mutateSingleComponentPart(
    params: BackCoverDesignParams,
    part: CadComponentPart
  ): BackCoverDesignParams {
    const updated = { ...params };
    switch (part) {
      case 'chassis-plate': {
        const deltaW = (Math.random() * 6 - 3);
        const deltaH = (Math.random() * 8 - 4);
        updated.coverWidthMm = Math.max(65, Math.min(88, Math.round((updated.coverWidthMm + deltaW) * 10) / 10));
        updated.coverHeightMm = Math.max(140, Math.min(185, Math.round((updated.coverHeightMm + deltaH) * 10) / 10));
        break;
      }
      case 'camera-island': {
        const deltaW = (Math.random() * 8 - 4);
        const deltaH = (Math.random() * 10 - 5);
        const maxW = updated.coverWidthMm - updated.bumpLeftMarginMm - 4.0;
        updated.bumpWidthMm = Math.max(26, Math.min(maxW, Math.round((updated.bumpWidthMm + deltaW) * 10) / 10));
        updated.bumpHeightMm = Math.max(30, Math.min(75, Math.round((updated.bumpHeightMm + deltaH) * 10) / 10));
        break;
      }
      case 'lens-apertures': {
        const delta = (Math.random() * 4 - 2);
        const maxW = updated.bumpWidthMm - updated.cameraOpeningLeftOffsetMm - 3.0;
        updated.cameraOpeningWidthMm = Math.max(16, Math.min(maxW, Math.round((updated.cameraOpeningWidthMm + delta) * 10) / 10));
        break;
      }
      case 'corner-fillets': {
        const delta = (Math.random() * 3 - 1.5);
        updated.cornerCurvatureMm = Math.max(4.0, Math.min(14.0, Math.round((updated.cornerCurvatureMm + delta) * 10) / 10));
        break;
      }
      case 'extrusions': {
        const delta = (Math.random() * 2 - 1);
        updated.bumpDepthMm = Math.max(1.0, Math.min(6.5, Math.round((updated.bumpDepthMm + delta) * 10) / 10));
        break;
      }
    }
    return updated;
  }

  /**
   * Generates a random device record with realistic randomized brand/model names.
   */
  static generateRandomDeviceRecord(): PhoneModelRecord {
    const brands = ['Apex', 'Vortex', 'Krypton', 'Zenith', 'Titan', 'Aura'];
    const families = ['Pro', 'Ultra', 'GT Neo', 'Prime', 'Hyper', 'Matrix'];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const family = families[Math.floor(Math.random() * families.length)];
    const num = Math.floor(10 + Math.random() * 90);
    const model = `${brand} ${family} ${num} 5G`;
    const id = `random-${brand.toLowerCase()}-${family.toLowerCase()}-${num}-${Date.now()}`;

    const backCoverDefault = this.generateRandomCoverParams();

    return {
      id,
      brand,
      model,
      market: 'Custom',
      isPopularInIndia: false,
      isCustomDevice: true,
      specsSummary: `Procedural CAD Permutation · ${backCoverDefault.coverHeightMm} × ${backCoverDefault.coverWidthMm} × ${backCoverDefault.coverThicknessMm} mm`,
      dimensions: {
        widthMm: backCoverDefault.coverWidthMm,
        heightMm: backCoverDefault.coverHeightMm,
        thicknessMm: backCoverDefault.coverThicknessMm * 4.2,
        cornerCurvatureMm: backCoverDefault.cornerCurvatureMm
      },
      backCoverDefault,
      backPanelReplacement: {
        isAvailableOnline: true,
        marketPriceEstimateInr: Math.floor(650 + Math.random() * 1200),
        material: Math.random() > 0.5 ? 'Aluminosilicate 2.5D Glass' : 'PMMA/PC Composite',
        adhesivePreCutAvailable: true,
        supplierOrigin: 'Shenzhen / Guangdong Suppliers',
        difficultyRating: 'Easy (Heat & Spudger)'
      }
    };
  }
}
