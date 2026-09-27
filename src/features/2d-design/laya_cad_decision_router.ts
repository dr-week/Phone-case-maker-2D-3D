/**
 * laya_cad_decision_router.ts
 *
 * Implements a non-autoregressive fast System 1 decision engine inspired by NandhaKishorM/laya:
 * - Single-pass typed choice routing (e.g. aperture mode, folding cut pattern, fabrication tolerances)
 * - Deterministic scoring & tolerance feasibility confidence (0.0 to 1.0)
 * - Yes/No validation decisions over dimensional geometric constraints
 * - Zero external API latency / sub-millisecond execution
 */

import type { BackCoverDesignParams } from './cad_cover_types';

export type CutoutStrategy = 'open-bump' | 'net-holes' | 'split-lens-island';
export type MaterialProcess = '3d-print-sla' | 'fdm-tpu-foldable' | 'cnc-aluminum-mill';

export interface DecisionResult<T> {
  decision: T;
  confidence: number;
  rationale: string;
  violations: string[];
}

export interface ToleranceVerification {
  isValid: boolean;
  score: number; // 0 to 100
  warnings: string[];
  autoCorrectedParams?: Partial<BackCoverDesignParams>;
}

export class LayaCadDecisionEngine {
  /**
   * Fast single-pass routing for camera island cutouts based on geometry and requested options.
   */
  static routeCutoutStrategy(params: BackCoverDesignParams, preferOpenBump = true): DecisionResult<CutoutStrategy> {
    const violations: string[] = [];
    const availableBumpWidth = params.bumpWidthMm;
    const openingWidth = params.cameraOpeningWidthMm;

    // Check minimum wall thickness
    const minSideWall = params.bumpLeftMarginMm;
    if (minSideWall < 2.0) {
      violations.push(`Side wall margin too thin (${minSideWall.toFixed(1)}mm < 2.0mm)`);
    }

    if (openingWidth > availableBumpWidth - 4.0) {
      violations.push(`Camera opening (${openingWidth}mm) too wide for bump width (${availableBumpWidth}mm)`);
    }

    if (preferOpenBump || openingWidth >= 28.0) {
      return {
        decision: 'open-bump',
        confidence: violations.length === 0 ? 0.98 : 0.72,
        rationale: 'Open hollow bump selected: guarantees zero lens friction and zero occlusion error across high-spec cameras.',
        violations
      };
    }

    if (openingWidth < 20.0) {
      return {
        decision: 'split-lens-island',
        confidence: 0.91,
        rationale: 'Sub-20mm compact camera island with individual lens tunnels.',
        violations
      };
    }

    return {
      decision: 'net-holes',
      confidence: 0.88,
      rationale: 'Standard multi-hole mesh layout with raised protective lip.',
      violations
    };
  }

  /**
   * System 1 decision on fabrication material & process based on cover thickness & bend requirements.
   */
  static routeFabricationProcess(params: BackCoverDesignParams): DecisionResult<MaterialProcess> {
    const violations: string[] = [];
    const thickness = params.coverThicknessMm;

    if (thickness < 1.0) {
      violations.push('Thickness under 1.0mm is prone to warpage during thermal cycles');
    }

    if (thickness <= 1.8) {
      return {
        decision: 'fdm-tpu-foldable',
        confidence: 0.95,
        rationale: 'Optimal for flat-pattern box folding with living hinges and flexible perimeter snap-walls.',
        violations
      };
    }

    if (thickness <= 2.5) {
      return {
        decision: '3d-print-sla',
        confidence: 0.92,
        rationale: 'High resolution resin print providing smooth curved chamfers and clear camera rims.',
        violations
      };
    }

    return {
      decision: 'cnc-aluminum-mill',
      confidence: 0.85,
      rationale: 'Heavy rigid panel suitable for structural CNC backplate machining.',
      violations
    };
  }

  /**
   * Fast deterministic Yes/No decision and tolerance verification.
   */
  static verifyGeometricTolerances(params: BackCoverDesignParams): ToleranceVerification {
    const warnings: string[] = [];
    const corrections: Partial<BackCoverDesignParams> = {};
    let score = 100;

    // Check cover aspect ratio
    if (params.coverHeightMm < params.coverWidthMm) {
      score -= 40;
      warnings.push('Invalid phone orientation: Height should exceed width.');
    }

    // Check camera bump boundary containment
    const bumpRightEdge = params.bumpLeftMarginMm + params.bumpWidthMm;
    if (bumpRightEdge > params.coverWidthMm) {
      score -= 30;
      warnings.push(`Camera bump overflows right edge (${bumpRightEdge.toFixed(1)}mm > ${params.coverWidthMm}mm).`);
      corrections.bumpWidthMm = Math.max(20, params.coverWidthMm - params.bumpLeftMarginMm - 3);
    }

    const bumpBottomEdge = params.bumpTopMarginMm + params.bumpHeightMm;
    if (bumpBottomEdge > params.coverHeightMm) {
      score -= 30;
      warnings.push(`Camera bump overflows bottom edge (${bumpBottomEdge.toFixed(1)}mm > ${params.coverHeightMm}mm).`);
      corrections.bumpHeightMm = Math.max(20, params.coverHeightMm - params.bumpTopMarginMm - 10);
    }

    // Check camera opening inside bump
    const openingRightEdge = params.cameraOpeningLeftOffsetMm + params.cameraOpeningWidthMm;
    if (openingRightEdge > params.bumpWidthMm) {
      score -= 20;
      warnings.push('Camera aperture exceeds bump width.');
      corrections.cameraOpeningWidthMm = Math.max(15, params.bumpWidthMm - params.cameraOpeningLeftOffsetMm - 2);
    }

    const openingBottomEdge = params.cameraOpeningTopOffsetMm + params.cameraOpeningHeightMm;
    if (openingBottomEdge > params.bumpHeightMm) {
      score -= 20;
      warnings.push('Camera aperture exceeds bump height.');
      corrections.cameraOpeningHeightMm = Math.max(15, params.bumpHeightMm - params.cameraOpeningTopOffsetMm - 2);
    }

    return {
      isValid: score >= 70,
      score: Math.max(0, score),
      warnings,
      autoCorrectedParams: Object.keys(corrections).length > 0 ? corrections : undefined
    };
  }
}
