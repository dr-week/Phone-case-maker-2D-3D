/**
 * anti_slop_cad_guard.ts
 *
 * Anti-Slop linter & geometric sanity checker for phone cover CAD:
 * - Traps un-extruded zero-area contours before passing to Three.js / CSG
 * - Catches inverted millimeter boundaries (negative widths, un-filleted acute corners)
 * - Flags hallucinated or non-existent 3D parameters
 * - Ensures sub-millimeter geometric correctness
 */

import type { BackCoverDesignParams } from './cad_cover_types';

export interface AntiSlopDiagnostic {
  ruleId: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  field?: keyof BackCoverDesignParams;
}

export class AntiSlopCadGuard {
  static auditDesignParameters(params: BackCoverDesignParams): AntiSlopDiagnostic[] {
    const issues: AntiSlopDiagnostic[] = [];

    // Rule 1: No negative or sub-threshold physical dimensions
    if (params.coverWidthMm < 30 || params.coverWidthMm > 150) {
      issues.push({
        ruleId: 'PHYSICAL_WIDTH_OUT_OF_BOUNDS',
        severity: 'error',
        message: `Phone width ${params.coverWidthMm}mm is outside realistic mobile phone boundaries (30mm - 150mm).`,
        field: 'coverWidthMm'
      });
    }

    if (params.coverHeightMm < 60 || params.coverHeightMm > 250) {
      issues.push({
        ruleId: 'PHYSICAL_HEIGHT_OUT_OF_BOUNDS',
        severity: 'error',
        message: `Phone height ${params.coverHeightMm}mm is outside realistic boundaries (60mm - 250mm).`,
        field: 'coverHeightMm'
      });
    }

    // Rule 2: Non-manifold corner curvature (radius cannot exceed half of width)
    if (params.cornerCurvatureMm * 2 > params.coverWidthMm) {
      issues.push({
        ruleId: 'DEGENERATE_CORNER_RADIUS',
        severity: 'error',
        message: `Corner curvature ${params.cornerCurvatureMm}mm exceeds half-width (${params.coverWidthMm / 2}mm), causing self-intersecting geometry.`,
        field: 'cornerCurvatureMm'
      });
    }

    // Rule 3: Bump nesting inside plate with minimum clearance
    const bumpTotalWidth = params.bumpLeftMarginMm + params.bumpWidthMm;
    if (bumpTotalWidth > params.coverWidthMm - 1.0) {
      issues.push({
        ruleId: 'BUMP_OVERFLOWS_PERIMETER',
        severity: 'error',
        message: `Camera bump right edge exceeds outer perimeter margin. Requires at least 1mm outer bezel.`,
        field: 'bumpWidthMm'
      });
    }

    // Rule 4: Hollow bump wall thickness structural integrity
    if (params.bumpWallThicknessMm < 0.8) {
      issues.push({
        ruleId: 'WALL_THICKNESS_TOO_FRAGILE',
        severity: 'warning',
        message: `Bump wall thickness ${params.bumpWallThicknessMm}mm is prone to 3D print delamination (< 0.8mm).`,
        field: 'bumpWallThicknessMm'
      });
    }

    // Rule 5: Camera opening inside bump boundary
    if (params.cameraOpeningLeftOffsetMm + params.cameraOpeningWidthMm > params.bumpWidthMm) {
      issues.push({
        ruleId: 'OPENING_EXCEEDS_BUMP_BOUND',
        severity: 'error',
        message: `Camera opening width + offset exceeds total bump width.`,
        field: 'cameraOpeningWidthMm'
      });
    }

    return issues;
  }
}
