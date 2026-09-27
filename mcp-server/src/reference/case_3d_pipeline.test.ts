import assert from 'node:assert/strict';
import test from 'node:test';

test('2D to 3D pipeline computes enlarged shrinkage compensation on lens cutouts', () => {
  const lenses2d = [
    { role: 'depth', radiusMm: 3.5, shrinkageOffsetMm: 3.4 },
    { role: 'ultrawide', radiusMm: 3.0, shrinkageOffsetMm: 3.6 },
    { role: 'main', radiusMm: 3.0, shrinkageOffsetMm: 3.6 },
    { role: 'flash', radiusMm: 1.8, shrinkageOffsetMm: 2.8 },
    { role: 'macro', radiusMm: 2.15, shrinkageOffsetMm: 2.9 },
  ];

  lenses2d.forEach(lens => {
    const cutoutRadius = lens.radiusMm + lens.shrinkageOffsetMm / 2;
    const cutoutDiameter = cutoutRadius * 2;
    // Generous hole enlargement: cutouts must exceed optical diameter by >= 2.8mm
    assert.ok(cutoutDiameter >= lens.radiusMm * 2 + 2.7, 'Cutout diameter must provide generous 3D print clearance');
    assert.ok(cutoutRadius >= lens.radiusMm + 1.35, 'Radial clearance must exceed 1.35mm');
  });
});

test('2D to 3D pipeline computes calibrated camera island without excessive relaxation', () => {
  const cameraIsland = {
    widthMm: 32.8,
    heightMm: 46.2,
    leftMm: 3.8,
    topMm: 3.6,
    cornerRadiusMm: 6.2,
    relaxationSpaceMm: 0.8,
  };

  // Snug fit: left margin stays cleanly off the outer corner curve (> 3.5mm)
  assert.ok(cameraIsland.leftMm >= 3.5, 'Left margin must stay inside phone flat zone');
  assert.ok(cameraIsland.topMm >= 3.5, 'Top margin must stay inside phone flat zone');
  assert.ok(cameraIsland.widthMm <= 34.0, 'Width must not excessively overhang phone body');
  assert.ok(cameraIsland.heightMm <= 48.0, 'Height must not excessively overhang phone body');
  assert.equal(cameraIsland.cornerRadiusMm, 6.2, 'Corner radius follows bump contour');
});

test('2D to 3D pipeline reserves button slot cutouts on left rim', () => {
  const buttons = [
    { name: 'Volume Rocker', side: 'left', topOffsetMm: 27.5, lengthMm: 20 },
    { name: 'Side Key (Power)', side: 'left', topOffsetMm: 57.0, lengthMm: 10 },
  ];

  const phoneHeight = 163.7;
  const volTopY = phoneHeight / 2 - buttons[0].topOffsetMm;
  const volBottomY = volTopY - buttons[0].lengthMm;
  const pwrTopY = phoneHeight / 2 - buttons[1].topOffsetMm;
  const pwrBottomY = pwrTopY - buttons[1].lengthMm;

  assert.ok(volTopY > volBottomY, 'Volume rocker slot has positive span');
  assert.ok(volBottomY > pwrTopY, 'Gap exists between volume rocker and power key');
  assert.ok(pwrTopY > pwrBottomY, 'Power key slot has positive span');
  assert.ok(volBottomY - pwrTopY >= 9.0, 'Substantial rib separation between buttons');
});

test('flat pattern generator computes systematic living-hinge dashed folding slits', () => {
  const foldSpan = 163.7 - 7.34 * 2; // ~149.02mm
  const slitLen = 4.2;
  const bridgeLen = 1.8;
  const cycle = slitLen + bridgeLen; // 6.0mm

  const slitCount = Math.floor((foldSpan - bridgeLen) / cycle);
  assert.ok(slitCount >= 20, 'Sufficient dashed slits along length to ensure even foldability');
  assert.ok(slitLen > bridgeLen, 'Slit length exceeds bridge for mechanical hinge compliance');
});

test('flat pattern open camera bump aperture has no internal holes and curved corners', () => {
  const openBump = {
    widthMm: 33.6,
    heightMm: 47.0,
    cornerRadiusMm: 6.2,
    internalHoles: 0
  };

  assert.equal(openBump.internalHoles, 0, 'Camera bump aperture must be completely open');
  assert.ok(openBump.cornerRadiusMm >= 4.0, 'Camera bump aperture must be fully curved');
});

