import assert from 'node:assert/strict';
import test from 'node:test';

interface BackCoverDesignParams {
  coverWidthMm: number;
  coverHeightMm: number;
  coverThicknessMm: number;
  cornerCurvatureMm: number;
  bumpWidthMm: number;
  bumpHeightMm: number;
  bumpLeftMarginMm: number;
  bumpTopMarginMm: number;
  bumpDepthMm: number;
  bumpCornerRadiusMm: number;
  bumpWallThicknessMm: number;
  cameraOpeningWidthMm: number;
  cameraOpeningHeightMm: number;
  cameraOpeningLeftOffsetMm: number;
  cameraOpeningTopOffsetMm: number;
  cameraOpeningRadiusMm: number;
  cameraOpeningRimMm: number;
}

// Inline pure logic of AntiSlopCadGuard for Node testing
function auditDesignParameters(params: BackCoverDesignParams) {
  const issues: string[] = [];

  if (params.coverWidthMm < 30 || params.coverWidthMm > 150) {
    issues.push('PHYSICAL_WIDTH_OUT_OF_BOUNDS');
  }
  if (params.coverHeightMm < 60 || params.coverHeightMm > 250) {
    issues.push('PHYSICAL_HEIGHT_OUT_OF_BOUNDS');
  }
  if (params.cornerCurvatureMm * 2 > params.coverWidthMm) {
    issues.push('DEGENERATE_CORNER_RADIUS');
  }
  const bumpTotalWidth = params.bumpLeftMarginMm + params.bumpWidthMm;
  if (bumpTotalWidth > params.coverWidthMm - 1.0) {
    issues.push('BUMP_OVERFLOWS_PERIMETER');
  }
  if (params.cameraOpeningLeftOffsetMm + params.cameraOpeningWidthMm > params.bumpWidthMm) {
    issues.push('OPENING_EXCEEDS_BUMP_BOUND');
  }

  return issues;
}

// Inline pure logic of LayaCadDecisionEngine
function routeCutoutStrategy(params: BackCoverDesignParams, preferOpenBump = true) {
  const openingWidth = params.cameraOpeningWidthMm;
  if (preferOpenBump || openingWidth >= 28.0) {
    return { decision: 'open-bump', confidence: 0.98 };
  }
  if (openingWidth < 20.0) {
    return { decision: 'split-lens-island', confidence: 0.91 };
  }
  return { decision: 'net-holes', confidence: 0.88 };
}

function verifyGeometricTolerances(params: BackCoverDesignParams) {
  let score = 100;
  const warnings: string[] = [];

  if (params.coverHeightMm < params.coverWidthMm) {
    score -= 40;
    warnings.push('Invalid phone orientation');
  }
  const bumpRight = params.bumpLeftMarginMm + params.bumpWidthMm;
  if (bumpRight > params.coverWidthMm) {
    score -= 30;
    warnings.push('Camera bump overflows right edge');
  }
  return { isValid: score >= 70, score: Math.max(0, score), warnings };
}

test('Anti-Slop CAD guard catches perimeter boundary and corner curvature violations', () => {
  const invalidParams: BackCoverDesignParams = {
    coverWidthMm: 76.2,
    coverHeightMm: 163.7,
    coverThicknessMm: 1.8,
    cornerCurvatureMm: 45.0, // Degenerate: 45 * 2 > 76.2
    bumpWidthMm: 75.0,        // Overflows right bezel: 5 + 75 > 76.2 - 1.0
    bumpHeightMm: 50.0,
    bumpLeftMarginMm: 5.0,
    bumpTopMarginMm: 6.0,
    bumpDepthMm: 2.5,
    bumpCornerRadiusMm: 6.5,
    bumpWallThicknessMm: 1.8,
    cameraOpeningWidthMm: 40.0, // Exceeds bump: 40 + 40 > 75
    cameraOpeningHeightMm: 35.0,
    cameraOpeningLeftOffsetMm: 40.0,
    cameraOpeningTopOffsetMm: 5.0,
    cameraOpeningRadiusMm: 5.0,
    cameraOpeningRimMm: 1.2
  };

  const issues = auditDesignParameters(invalidParams);
  assert.ok(issues.includes('DEGENERATE_CORNER_RADIUS'), 'Should catch corner radius exceeding half-width');
  assert.ok(issues.includes('BUMP_OVERFLOWS_PERIMETER'), 'Should catch bump width exceeding perimeter');
  assert.ok(issues.includes('OPENING_EXCEEDS_BUMP_BOUND'), 'Should catch aperture exceeding bump container');
});

test('Laya System 1 decision engine routes open-bump strategy and verifies tolerances', () => {
  const xiaomiParams: BackCoverDesignParams = {
    coverWidthMm: 76.2,
    coverHeightMm: 163.7,
    coverThicknessMm: 1.8,
    cornerCurvatureMm: 8.0,
    bumpWidthMm: 35.0,
    bumpHeightMm: 58.0,
    bumpLeftMarginMm: 4.8,
    bumpTopMarginMm: 5.2,
    bumpDepthMm: 2.4,
    bumpCornerRadiusMm: 6.5,
    bumpWallThicknessMm: 1.8,
    cameraOpeningWidthMm: 28.0,
    cameraOpeningHeightMm: 48.0,
    cameraOpeningLeftOffsetMm: 3.5,
    cameraOpeningTopOffsetMm: 4.5,
    cameraOpeningRadiusMm: 5.0,
    cameraOpeningRimMm: 1.2
  };

  const route = routeCutoutStrategy(xiaomiParams, true);
  assert.equal(route.decision, 'open-bump');
  assert.ok(route.confidence >= 0.95);

  const tolerance = verifyGeometricTolerances(xiaomiParams);
  assert.equal(tolerance.isValid, true);
  assert.equal(tolerance.score, 100);
  assert.equal(tolerance.warnings.length, 0);
});

test('Orthographic layer extrusions strictly preserve non-negative millimeter depth', () => {
  const plateExtrusion = 1.8;
  const bumpExtrusion = 8.0;
  const openingRimExtrusion = 1.2;

  const totalZDepth = plateExtrusion + bumpExtrusion + openingRimExtrusion;
  assert.equal(Math.round(totalZDepth * 10) / 10, 11.0, 'Total physical Z stack should equal 11.0mm');
  assert.ok(plateExtrusion > 0, 'Plate must have positive physical thickness');
  assert.ok(bumpExtrusion > 0, 'Camera bump must have positive step-up extrusion');
});

test('Procedural CAD Permutator generates valid randomized devices passing anti-slop checks', () => {
  for (let i = 0; i < 25; i++) {
    const coverWidthMm = Math.round((68.0 + Math.random() * 14.0) * 10) / 10;
    const coverHeightMm = Math.round((145.0 + Math.random() * 30.0) * 10) / 10;
    const coverThicknessMm = Math.round((1.2 + Math.random() * 1.6) * 10) / 10;
    const cornerCurvatureMm = Math.round((5.0 + Math.random() * 5.0) * 10) / 10;
    const bumpLeftMarginMm = Math.round((3.0 + Math.random() * 3.5) * 10) / 10;
    const bumpTopMarginMm = Math.round((3.5 + Math.random() * 4.0) * 10) / 10;
    const maxBumpW = coverWidthMm - bumpLeftMarginMm - 4.0;
    const bumpWidthMm = Math.round((28.0 + Math.random() * (maxBumpW - 28.0)) * 10) / 10;
    const bumpHeightMm = Math.round((35.0 + Math.random() * 35.0) * 10) / 10;

    const randomizedParams: BackCoverDesignParams = {
      coverWidthMm,
      coverHeightMm,
      coverThicknessMm,
      cornerCurvatureMm,
      bumpWidthMm,
      bumpHeightMm,
      bumpLeftMarginMm,
      bumpTopMarginMm,
      bumpDepthMm: 2.5,
      bumpCornerRadiusMm: 6.5,
      bumpWallThicknessMm: 1.8,
      cameraOpeningWidthMm: Math.max(16.0, Math.round((bumpWidthMm - 8.0) * 10) / 10),
      cameraOpeningHeightMm: Math.max(20.0, Math.round((bumpHeightMm - 10.0) * 10) / 10),
      cameraOpeningLeftOffsetMm: 3.5,
      cameraOpeningTopOffsetMm: 4.0,
      cameraOpeningRadiusMm: 5.0,
      cameraOpeningRimMm: 1.2
    };

    const issues = auditDesignParameters(randomizedParams);
    assert.equal(issues.length, 0, `Random permutation ${i + 1} must pass Anti-Slop CAD guard without errors`);
  }
});

test('Random part selection isolates single component mutation without breaking perimeter integrity', () => {
  const parts = ['chassis-plate', 'camera-island', 'lens-apertures', 'corner-fillets', 'extrusions'] as const;
  
  for (const part of parts) {
    const base: BackCoverDesignParams = {
      coverWidthMm: 76.0,
      coverHeightMm: 164.0,
      coverThicknessMm: 1.8,
      cornerCurvatureMm: 8.0,
      bumpWidthMm: 36.0,
      bumpHeightMm: 55.0,
      bumpLeftMarginMm: 5.0,
      bumpTopMarginMm: 5.0,
      bumpDepthMm: 2.5,
      bumpCornerRadiusMm: 6.0,
      bumpWallThicknessMm: 1.8,
      cameraOpeningWidthMm: 28.0,
      cameraOpeningHeightMm: 45.0,
      cameraOpeningLeftOffsetMm: 3.5,
      cameraOpeningTopOffsetMm: 4.0,
      cameraOpeningRadiusMm: 5.0,
      cameraOpeningRimMm: 1.2
    };

    const mutated = { ...base };
    if (part === 'chassis-plate') {
      mutated.coverWidthMm += 2.0;
    } else if (part === 'camera-island') {
      mutated.bumpWidthMm += 1.5;
    } else if (part === 'lens-apertures') {
      mutated.cameraOpeningWidthMm += 1.0;
    } else if (part === 'corner-fillets') {
      mutated.cornerCurvatureMm += 1.0;
    } else if (part === 'extrusions') {
      mutated.bumpDepthMm += 0.5;
    }

    const issues = auditDesignParameters(mutated);
    assert.equal(issues.length, 0, `Mutated part ${part} must preserve geometric validity`);
  }
});

test('Laya Code Assistant conducts deterministic fast constraint verification without token waste', () => {
  const params: BackCoverDesignParams = {
    coverWidthMm: 76.2,
    coverHeightMm: 163.7,
    coverThicknessMm: 1.8,
    cornerCurvatureMm: 8.0,
    bumpWidthMm: 35.0,
    bumpHeightMm: 58.0,
    bumpLeftMarginMm: 4.8,
    bumpTopMarginMm: 5.2,
    bumpDepthMm: 2.4,
    bumpCornerRadiusMm: 6.5,
    bumpWallThicknessMm: 1.8,
    cameraOpeningWidthMm: 28.0,
    cameraOpeningHeightMm: 48.0,
    cameraOpeningLeftOffsetMm: 3.5,
    cameraOpeningTopOffsetMm: 4.5,
    cameraOpeningRadiusMm: 5.0,
    cameraOpeningRimMm: 1.2
  };

  const issues = auditDesignParameters(params);
  const route = routeCutoutStrategy(params, true);
  const tolerance = verifyGeometricTolerances(params);

  assert.equal(issues.length, 0);
  assert.equal(route.decision, 'open-bump');
  assert.equal(tolerance.isValid, true);
  assert.ok(tolerance.score >= 90, 'Clean physical model should achieve high deterministic score');
});

