import * as THREE from 'three';
import type { CameraHoleFeature, ButtonFeature } from '../../referenceAnalysis';
import { createRoundedRectShape } from './phone_geometry_builder';

export interface FlatPatternConfig {
  phoneWidthMm: number;
  phoneHeightMm: number;
  phoneThicknessMm: number;
  phoneCornerRadiusMm: number;
  wallHeightMm?: number;
  sheetThicknessMm?: number;
  slitLengthMm?: number;
  slitWidthMm?: number;
  bridgeLengthMm?: number;
  cameraIsland: {
    widthMm: number;
    heightMm: number;
    leftMm: number;
    topMm: number;
    cornerRadiusMm: number;
  };
  buttons: ButtonFeature[];
}

export interface FoldableCaseResult {
  rootGroup: THREE.Group;
  centerMesh: THREE.Mesh;
  leftFlapGroup: THREE.Group;
  rightFlapGroup: THREE.Group;
  topFlapGroup: THREE.Group;
  bottomFlapGroup: THREE.Group;
  setFoldProgress: (progress: number) => void; // 0 = flat net, 1 = 3D folded case
}

function createHoleRoundedRectPath(
  centerX: number,
  centerY: number,
  w: number,
  h: number,
  r: number
): THREE.Path {
  const path = new THREE.Path();
  const radius = Math.max(0.1, Math.min(r, w / 2 - 0.1, h / 2 - 0.1));
  const hw = w / 2;
  const hh = h / 2;

  path.moveTo(centerX - hw + radius, centerY - hh);
  path.quadraticCurveTo(centerX - hw, centerY - hh, centerX - hw, centerY - hh + radius);
  path.lineTo(centerX - hw, centerY + hh - radius);
  path.quadraticCurveTo(centerX - hw, centerY + hh, centerX - hw + radius, centerY + hh);
  path.lineTo(centerX + hw - radius, centerY + hh);
  path.quadraticCurveTo(centerX + hw, centerY + hh, centerX + hw, centerY + hh - radius);
  path.lineTo(centerX + hw, centerY - hh + radius);
  path.quadraticCurveTo(centerX + hw, centerY - hh, centerX + hw - radius, centerY - hh);
  path.lineTo(centerX - hw + radius, centerY - hh);

  return path;
}

/**
 * Creates dashed living-hinge through-slits along a fold line.
 */
function appendPerforatedSlits(
  shape: THREE.Shape,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  slitLen: number,
  slitW: number,
  bridgeLen: number
): void {
  const dx = endX - startX;
  const dy = endY - startY;
  const totalLength = Math.hypot(dx, dy);
  if (totalLength < slitLen + bridgeLen) return;

  const dirX = dx / totalLength;
  const dirY = dy / totalLength;
  const perpX = -dirY;
  const perpY = dirX;

  const cycle = slitLen + bridgeLen;
  const count = Math.floor((totalLength - bridgeLen) / cycle);
  const usedSpan = count * cycle - bridgeLen;
  const startOffset = (totalLength - usedSpan) / 2;

  for (let i = 0; i < count; i++) {
    const centerDist = startOffset + i * cycle + slitLen / 2;
    const cx = startX + dirX * centerDist;
    const cy = startY + dirY * centerDist;

    // Build capsule-shaped slit hole
    const slitPath = new THREE.Path();
    const halfLen = slitLen / 2;
    const halfW = slitW / 2;

    // 4 corners of slit oriented along fold line
    const p1x = cx - dirX * halfLen + perpX * halfW;
    const p1y = cy - dirY * halfLen + perpY * halfW;
    const p2x = cx + dirX * halfLen + perpX * halfW;
    const p2y = cy + dirY * halfLen + perpY * halfW;
    const p3x = cx + dirX * halfLen - perpX * halfW;
    const p3y = cy + dirY * halfLen - perpY * halfW;
    const p4x = cx - dirX * halfLen - perpX * halfW;
    const p4y = cy - dirY * halfLen - perpY * halfW;

    slitPath.moveTo(p1x, p1y);
    slitPath.lineTo(p2x, p2y);
    slitPath.lineTo(p3x, p3y);
    slitPath.lineTo(p4x, p4y);
    slitPath.lineTo(p1x, p1y);

    shape.holes.push(slitPath);
  }
}

export function buildFoldableCaseNet(
  config: FlatPatternConfig,
  material: THREE.Material
): FoldableCaseResult {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'foldable-case-net';

  const {
    phoneWidthMm: pw,
    phoneHeightMm: ph,
    phoneThicknessMm: pt,
    phoneCornerRadiusMm: pr,
    wallHeightMm = pt + 1.2,
    sheetThicknessMm: thick = 1.3,
    slitLengthMm: slitLen = 4.2,
    slitWidthMm: slitW = 0.75,
    bridgeLengthMm: bridgeLen = 1.8,
    cameraIsland,
    buttons
  } = config;

  const w = pw + 0.7; // slight clearance
  const h = ph + 0.7;
  const hw = w / 2;
  const hh = h / 2;
  const r = pr;

  // ============================================================
  // 1. CENTER BACKPLATE WITH OPEN CAMERA BUMP APERTURE & FOLD SLITS
  // ============================================================
  const centerShape = createRoundedRectShape(w, h, r);

  // A) Completely Open Camera Bump Window (Curved rounded rectangle, NO internal holes)
  const bumpW = cameraIsland.widthMm + 0.8;
  const bumpH = cameraIsland.heightMm + 0.8;
  const bumpX = -w / 2 + cameraIsland.leftMm + cameraIsland.widthMm / 2;
  const bumpY = h / 2 - cameraIsland.topMm - cameraIsland.heightMm / 2;
  const bumpR = Math.max(4.0, cameraIsland.cornerRadiusMm);

  const bumpOpenHole = createHoleRoundedRectPath(bumpX, bumpY, bumpW, bumpH, bumpR);
  centerShape.holes.push(bumpOpenHole);

  // B) Perforated Folding Slits along all 4 edges (Dashed Living Hinge)
  // Left fold line
  appendPerforatedSlits(centerShape, -hw, -hh + r, -hw, hh - r, slitLen, slitW, bridgeLen);
  // Right fold line
  appendPerforatedSlits(centerShape, hw, -hh + r, hw, hh - r, slitLen, slitW, bridgeLen);
  // Top fold line
  appendPerforatedSlits(centerShape, -hw + r, hh, hw - r, hh, slitLen, slitW, bridgeLen);
  // Bottom fold line
  appendPerforatedSlits(centerShape, -hw + r, -hh, hw - r, -hh, slitLen, slitW, bridgeLen);

  const centerGeo = new THREE.ExtrudeGeometry(centerShape, {
    depth: thick,
    bevelEnabled: false,
    curveSegments: 20
  });
  centerGeo.translate(0, 0, -thick / 2);
  const centerMesh = new THREE.Mesh(centerGeo, material);
  rootGroup.add(centerMesh);

  // ============================================================
  // 2. FOLDING SIDE FLAPS (LEFT, RIGHT, TOP, BOTTOM)
  // ============================================================
  const flapLenY = h - r * 2;
  const flapLenX = w - r * 2;

  // --- LEFT FLAP (with Volume Rocker & Power Button curved cutouts) ---
  const leftFlapGroup = new THREE.Group();
  leftFlapGroup.position.set(-hw, 0, 0); // hinge pivot

  const leftFlapShape = new THREE.Shape();
  // Flap geometry extending left from hinge x=0 to x=-wallHeightMm
  // Chamfered 45° corner reliefs for clean fold clearance
  const chamfer = Math.min(2.5, wallHeightMm * 0.4);
  leftFlapShape.moveTo(0, flapLenY / 2);
  leftFlapShape.lineTo(-wallHeightMm + chamfer, flapLenY / 2);
  leftFlapShape.lineTo(-wallHeightMm, flapLenY / 2 - chamfer);
  leftFlapShape.lineTo(-wallHeightMm, -flapLenY / 2 + chamfer);
  leftFlapShape.lineTo(-wallHeightMm + chamfer, -flapLenY / 2);
  leftFlapShape.lineTo(0, -flapLenY / 2);
  leftFlapShape.lineTo(0, flapLenY / 2);

  // Add curved button slot holes
  buttons.filter(b => b.side === 'left').forEach(btn => {
    const btnCenterY = hh - (btn.topOffsetMm + btn.lengthMm / 2);
    const btnSlotLen = btn.lengthMm + 2.0;
    const btnSlotH = Math.min(4.2, wallHeightMm - 2.0);
    const btnSlotX = -wallHeightMm / 2;
    const btnSlotR = btnSlotH / 2;

    const btnHole = createHoleRoundedRectPath(btnSlotX, btnCenterY, btnSlotH, btnSlotLen, btnSlotR);
    leftFlapShape.holes.push(btnHole);
  });

  const leftFlapGeo = new THREE.ExtrudeGeometry(leftFlapShape, {
    depth: thick,
    bevelEnabled: false,
    curveSegments: 16
  });
  leftFlapGeo.translate(0, 0, -thick / 2);
  const leftFlapMesh = new THREE.Mesh(leftFlapGeo, material);
  leftFlapGroup.add(leftFlapMesh);
  rootGroup.add(leftFlapGroup);

  // --- RIGHT FLAP (Seamless side with corner chamfers) ---
  const rightFlapGroup = new THREE.Group();
  rightFlapGroup.position.set(hw, 0, 0); // hinge pivot

  const rightFlapShape = new THREE.Shape();
  rightFlapShape.moveTo(0, flapLenY / 2);
  rightFlapShape.lineTo(wallHeightMm - chamfer, flapLenY / 2);
  rightFlapShape.lineTo(wallHeightMm, flapLenY / 2 - chamfer);
  rightFlapShape.lineTo(wallHeightMm, -flapLenY / 2 + chamfer);
  rightFlapShape.lineTo(wallHeightMm - chamfer, -flapLenY / 2);
  rightFlapShape.lineTo(0, -flapLenY / 2);
  rightFlapShape.lineTo(0, flapLenY / 2);

  const rightFlapGeo = new THREE.ExtrudeGeometry(rightFlapShape, {
    depth: thick,
    bevelEnabled: false,
    curveSegments: 16
  });
  rightFlapGeo.translate(0, 0, -thick / 2);
  const rightFlapMesh = new THREE.Mesh(rightFlapGeo, material);
  rightFlapGroup.add(rightFlapMesh);
  rootGroup.add(rightFlapGroup);

  // --- TOP FLAP (Secondary mic hole cutout) ---
  const topFlapGroup = new THREE.Group();
  topFlapGroup.position.set(0, hh, 0); // hinge pivot

  const topFlapShape = new THREE.Shape();
  topFlapShape.moveTo(-flapLenX / 2, 0);
  topFlapShape.lineTo(-flapLenX / 2, wallHeightMm - chamfer);
  topFlapShape.lineTo(-flapLenX / 2 + chamfer, wallHeightMm);
  topFlapShape.lineTo(flapLenX / 2 - chamfer, wallHeightMm);
  topFlapShape.lineTo(flapLenX / 2, wallHeightMm - chamfer);
  topFlapShape.lineTo(flapLenX / 2, 0);
  topFlapShape.lineTo(-flapLenX / 2, 0);

  // Mic hole
  const micHole = new THREE.Path();
  micHole.absarc(0, wallHeightMm / 2, 1.4, 0, Math.PI * 2, true);
  topFlapShape.holes.push(micHole);

  const topFlapGeo = new THREE.ExtrudeGeometry(topFlapShape, {
    depth: thick,
    bevelEnabled: false,
    curveSegments: 16
  });
  topFlapGeo.translate(0, 0, -thick / 2);
  const topFlapMesh = new THREE.Mesh(topFlapGeo, material);
  topFlapGroup.add(topFlapMesh);
  rootGroup.add(topFlapGroup);

  // --- BOTTOM FLAP (USB-C & Speaker cutouts) ---
  const botFlapGroup = new THREE.Group();
  botFlapGroup.position.set(0, -hh, 0); // hinge pivot

  const botFlapShape = new THREE.Shape();
  botFlapShape.moveTo(-flapLenX / 2, 0);
  botFlapShape.lineTo(-flapLenX / 2, -wallHeightMm + chamfer);
  botFlapShape.lineTo(-flapLenX / 2 + chamfer, -wallHeightMm);
  botFlapShape.lineTo(flapLenX / 2 - chamfer, -wallHeightMm);
  botFlapShape.lineTo(flapLenX / 2, -wallHeightMm + chamfer);
  botFlapShape.lineTo(flapLenX / 2, 0);
  botFlapShape.lineTo(-flapLenX / 2, 0);

  // Center USB-C capsule hole
  const usbSlot = createHoleRoundedRectPath(0, -wallHeightMm / 2, 13.5, 4.2, 2.1);
  botFlapShape.holes.push(usbSlot);

  // Speaker grille slot
  const speakerSlot = createHoleRoundedRectPath(20.0, -wallHeightMm / 2, 11.0, 3.2, 1.6);
  botFlapShape.holes.push(speakerSlot);

  const botFlapGeo = new THREE.ExtrudeGeometry(botFlapShape, {
    depth: thick,
    bevelEnabled: false,
    curveSegments: 16
  });
  botFlapGeo.translate(0, 0, -thick / 2);
  const botFlapMesh = new THREE.Mesh(botFlapGeo, material);
  botFlapGroup.add(botFlapMesh);
  rootGroup.add(botFlapGroup);

  // ============================================================
  // 3. FOLDING CONTROLLER (0 = FLAT NET, 1 = FOLDED 3D)
  // ============================================================
  const setFoldProgress = (progress: number) => {
    const p = Math.max(0, Math.min(1, progress));
    const targetAngle = p * (Math.PI / 2);

    // Left folds +90° around Y
    leftFlapGroup.rotation.y = targetAngle;
    // Right folds -90° around Y
    rightFlapGroup.rotation.y = -targetAngle;
    // Top folds -90° around X
    topFlapGroup.rotation.x = -targetAngle;
    // Bottom folds +90° around X
    botFlapGroup.rotation.x = targetAngle;
  };

  return {
    rootGroup,
    centerMesh,
    leftFlapGroup,
    rightFlapGroup,
    topFlapGroup,
    bottomFlapGroup: botFlapGroup,
    setFoldProgress
  };
}
