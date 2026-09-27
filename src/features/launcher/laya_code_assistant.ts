/**
 * laya_code_assistant.ts
 *
 * Laya-powered local coding & parametric verification assistant:
 * - Deterministic, non-autoregressive code optimization guidance
 * - Instant geometric constraint auditing without wasting API tokens/credits
 * - Single-pass verification for aperture bounding, corner fillets, and extrusion stack depths
 */

import type { BackCoverDesignParams } from '../2d-design/cad_cover_types';
import { LayaCadDecisionEngine } from '../2d-design/laya_cad_decision_router';
import { AntiSlopCadGuard } from '../2d-design/anti_slop_cad_guard';

export interface LayaAuditResult {
  passed: boolean;
  score: number;
  recommendations: string[];
  suggestedPatch?: Partial<BackCoverDesignParams>;
}

export class LayaCodeAssistant {
  /**
   * Fast rule-based CAD code and parametric layout audit using Laya System 1 decision engine.
   */
  static auditCadModel(params: BackCoverDesignParams): LayaAuditResult {
    const antiSlopIssues = AntiSlopCadGuard.auditDesignParameters(params);
    const tolerance = LayaCadDecisionEngine.verifyGeometricTolerances(params);
    const strategy = LayaCadDecisionEngine.routeCutoutStrategy(params, true);

    const recommendations: string[] = [];

    if (antiSlopIssues.length > 0) {
      antiSlopIssues.forEach(issue => recommendations.push(`[${issue.severity.toUpperCase()}] ${issue.message}`));
    }

    if (tolerance.warnings.length > 0) {
      tolerance.warnings.forEach(warn => recommendations.push(`[TOLERANCE] ${warn}`));
    }

    recommendations.push(`[STRATEGY] Routed cutout: ${strategy.decision.toUpperCase()} (${(strategy.confidence * 100).toFixed(0)}% confidence).`);

    return {
      passed: antiSlopIssues.filter(i => i.severity === 'error').length === 0 && tolerance.isValid,
      score: tolerance.score,
      recommendations,
      suggestedPatch: tolerance.autoCorrectedParams
    };
  }

  /**
   * Generates conversational welcome and status summary for natural speech audio.
   */
  static getWelcomeSpeech(phoneModel: string): string {
    return `Welcome to CaseForm. Dedicated workspace for ${phoneModel} is active. 2D orthographic layers and physical extrusion depths are calibrated.`;
  }
}
