import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import type { CameraHoleFeature, ButtonFeature } from '../../referenceAnalysis';
import { createRoundedRectShape } from './phone_geometry_builder';

export type CutoutStyle = 'open-bump' | 'individual-holes';

export interface CaseGeometryConfig {
  phoneWidthMm: number;
  phoneHeightMm: number;
  phoneThicknessMm: number;
  phoneCornerRadiusMm: number;
  wallThicknessMm?: number;
  clearanceMm?: number;
  lipOverhangMm?: number;
  cutoutStyle?: CutoutStyle;
  cameraIsland: {
    widthMm: number;
    heightMm: number;
    leftMm: number;
    topMm: number;
    cornerRadiusMm: number;
    relaxationSpaceMm?: number;
  };
  cameraHoles: CameraHoleFeature[];
  buttons: ButtonFeature[];
  productDesignType?: 'back-case' | 'back-panel';
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

  // Clockwise for interior hole in Three.js Shape
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

export function buildParametricCaseGroup(
  config: CaseGeometryConfig,
  caseMaterial: THREE.Material
): THREE.Group {
  const group = new THREE.Group();
  group.name = 'case-shell';

  const {
    phoneWidthMm: pw,
    phoneHeightMm: ph,
    phoneThicknessMm: pt,
    phoneCornerRadiusMm: pr,
    wallThicknessMm: wall = 1.6,
    clearanceMm: clearance = 0.35,
    lipOverhangMm: lip = 0.85,
    cutoutStyle = 'open-bump',
    cameraIsland,
    cameraHoles,
    buttons,
    productDesignType = 'back-case'
  } = config;

  const isBackPanel = productDesignType === 'back-panel';

  // For back-panel: exact chassis dimensions without wrapping side wall offsets
  const plateW = isBackPanel ? pw : pw + (wall + clearance) * 2;
  const plateH = isBackPanel ? ph : ph + (wall + clearance) * 2;
  const plateCornerR = isBackPanel ? pr : pr + wall + clearance;
  const actualThickness = isBackPanel ? Math.min(1.2, wall) : wall;
  const backPlateZ = pt / 2 + actualThickness / 2;

  // -------------------------------------------------------------
  // 1. REAR BACKPLATE WITH CUTOUTS (HOLES)
  // -------------------------------------------------------------
  const backShape = createRoundedRectShape(plateW, plateH, plateCornerR);

  if (cutoutStyle === 'individual-holes' && cameraHoles.length > 0) {
    // Punch out each lens & flash with 3D print shrinkage offset
    cameraHoles.forEach(hole => {
      const cutoutR = hole.cutoutRadiusMm || hole.radiusMm + (hole.shrinkageOffsetMm || 1.5);
      const holeX = -pw / 2 + hole.xMm;
      const holeY = ph / 2 - hole.yMm;

      const holePath = new THREE.Path();
      // Clockwise circle for Three.js hole
      holePath.absarc(holeX, holeY, cutoutR, 0, Math.PI * 2, true);
      backShape.holes.push(holePath);
    });
  } else {
    // Relaxed Camera Island Window Cutout
    // Snug clearance around the camera bump without excessive overhang
    const islandCutoutW = cameraIsland.widthMm + 0.4;
    const islandCutoutH = cameraIsland.heightMm + 0.4;
    const islandCutoutX = -pw / 2 + cameraIsland.leftMm + cameraIsland.widthMm / 2;
    const islandCutoutY = ph / 2 - cameraIsland.topMm - cameraIsland.heightMm / 2;
    const islandCutoutR = Math.max(3.0, cameraIsland.cornerRadiusMm);

    const islandPath = createHoleRoundedRectPath(
      islandCutoutX,
      islandCutoutY,
      islandCutoutW,
      islandCutoutH,
      islandCutoutR
    );
    backShape.holes.push(islandPath);
  }

  const backGeometry = new THREE.ExtrudeGeometry(backShape, {
    depth: actualThickness,
    bevelEnabled: false,
    curveSegments: 24
  });
  backGeometry.translate(0, 0, -actualThickness / 2);
  const backMesh = new THREE.Mesh(backGeometry, caseMaterial);
  backMesh.position.z = backPlateZ;
  group.add(backMesh);

  // -------------------------------------------------------------
  // 2. RAISED PROTECTIVE CAMERA LIP (BEZEL COLLAR)
  // -------------------------------------------------------------
  const collarHeight = isBackPanel ? 0.6 : 1.1; // Low-profile bezel rim for back-panel replacement
  const islandW = cameraIsland.widthMm + 1.4;
  const islandH = cameraIsland.heightMm + 1.4;
  const islandX = -pw / 2 + cameraIsland.leftMm + cameraIsland.widthMm / 2;
  const islandY = ph / 2 - cameraIsland.topMm - cameraIsland.heightMm / 2;

  const collarOuter = createRoundedRectShape(islandW, islandH, cameraIsland.cornerRadiusMm + 0.8);
  const collarInner = createHoleRoundedRectPath(0, 0, islandW - 1.4, islandH - 1.4, cameraIsland.cornerRadiusMm);
  collarOuter.holes.push(collarInner);

  const collarGeo = new THREE.ExtrudeGeometry(collarOuter, {
    depth: collarHeight,
    bevelEnabled: false,
    curveSegments: 16
  });
  collarGeo.translate(0, 0, -collarHeight / 2);
  const collarMesh = new THREE.Mesh(collarGeo, caseMaterial);
  collarMesh.position.set(islandX, islandY, backPlateZ + actualThickness / 2 + collarHeight / 2);
  group.add(collarMesh);

  // IF TARGET IS BACK-PANEL (REPLACEMENT BACKPLATE):
  // We do not add side wrap rims, button pass-throughs, or front screen retention lips.
  // The back-panel is a direct flush plate mounting to the rear frame adhesive gasket.
  if (isBackPanel) {
    return group;
  }

  // -------------------------------------------------------------
  // 3. CASE SIDE WALLS WITH BUTTON CUTOUTS (PROTECTIVE CASE ONLY)
  // -------------------------------------------------------------
  const caseW = plateW;
  const caseH = plateH;
  const caseCornerR = plateCornerR;
  const sideDepth = pt + wall + lip;
  const sideZ = (pt / 2 + wall) - sideDepth / 2;

  // Solid Right Wall (Seamless edge)
  const rightWall = new THREE.Mesh(
    new RoundedBoxGeometry(wall, caseH - caseCornerR * 2, sideDepth, 4, wall / 2 - 0.05),
    caseMaterial
  );
  rightWall.position.set(caseW / 2 - wall / 2, 0, sideZ);
  group.add(rightWall);

  // Left Wall: Splice into segments to make pass-through cutouts for buttons
  // Sort buttons from top to bottom
  const sortedButtons = [...buttons]
    .filter(b => b.side === 'left')
    .sort((a, b) => a.topOffsetMm - b.topOffsetMm);

  const wallStartY = caseH / 2 - caseCornerR;
  const wallEndY = -caseH / 2 + caseCornerR;
  let currentY = wallStartY;

  sortedButtons.forEach(btn => {
    const btnTopY = ph / 2 - btn.topOffsetMm;
    const btnBottomY = btnTopY - btn.lengthMm;
    // Add 1.5mm safety clearance above and below button
    const cutoutTop = Math.min(currentY, btnTopY + 1.5);
    const cutoutBottom = btnBottomY - 1.5;

    const segmentLen = currentY - cutoutTop;
    if (segmentLen > 2.0) {
      const segMesh = new THREE.Mesh(
        new RoundedBoxGeometry(wall, segmentLen, sideDepth, 4, 0.4),
        caseMaterial
      );
      segMesh.position.set(-caseW / 2 + wall / 2, currentY - segmentLen / 2, sideZ);
      group.add(segMesh);
    }
    currentY = cutoutBottom;
  });

  // Final lower segment of left wall
  const remainingLen = currentY - wallEndY;
  if (remainingLen > 2.0) {
    const bottomSeg = new THREE.Mesh(
      new RoundedBoxGeometry(wall, remainingLen, sideDepth, 4, 0.4),
      caseMaterial
    );
    bottomSeg.position.set(-caseW / 2 + wall / 2, currentY - remainingLen / 2, sideZ);
    group.add(bottomSeg);
  }

  // -------------------------------------------------------------
  // 4. TOP RIM WALL WITH SECONDARY MIC PINHOLE CUTOUT
  // -------------------------------------------------------------
  const topSpan = caseW - caseCornerR * 2;
  const topPinholeGap = 4.0;
  const topHalfLen = (topSpan - topPinholeGap) / 2;

  const topLeft = new THREE.Mesh(
    new RoundedBoxGeometry(topHalfLen, wall, sideDepth, 4, 0.4),
    caseMaterial
  );
  topLeft.position.set(-topPinholeGap / 2 - topHalfLen / 2, caseH / 2 - wall / 2, sideZ);
  group.add(topLeft);

  const topRight = topLeft.clone();
  topRight.position.x = topPinholeGap / 2 + topHalfLen / 2;
  group.add(topRight);

  // -------------------------------------------------------------
  // 5. BOTTOM RIM WALL WITH USB-C AND SPEAKER GRILLE CUTOUTS
  // -------------------------------------------------------------
  const bottomSpan = caseW - caseCornerR * 2;
  const usbCutoutW = 14.0; // USB-C connector window
  const speakerCutoutW = 12.0; // Speaker grille window
  const cornerTabW = Math.max(4, (bottomSpan - (usbCutoutW + speakerCutoutW + 6)) / 2);

  // Bottom corner tabs
  const botLeft = new THREE.Mesh(
    new RoundedBoxGeometry(cornerTabW, wall, sideDepth, 4, 0.4),
    caseMaterial
  );
  botLeft.position.set(-bottomSpan / 2 + cornerTabW / 2, -caseH / 2 + wall / 2, sideZ);
  group.add(botLeft);

  const botRight = botLeft.clone();
  botRight.position.x = bottomSpan / 2 - cornerTabW / 2;
  group.add(botRight);

  // -------------------------------------------------------------
  // 6. PROTECTIVE FRONT LIP (SCREEN RETENTION RIM)
  // -------------------------------------------------------------
  const frontLipZ = -pt / 2 - lip / 2;
  const lipThickness = 0.9;
  const lipShape = createRoundedRectShape(caseW, caseH, caseCornerR);
  const lipHole = createHoleRoundedRectPath(0, 0, pw - 0.4, ph - 0.4, pr);
  lipShape.holes.push(lipHole);

  const lipGeo = new THREE.ExtrudeGeometry(lipShape, {
    depth: lipThickness,
    bevelEnabled: false,
    curveSegments: 16
  });
  lipGeo.translate(0, 0, -lipThickness / 2);
  const lipMesh = new THREE.Mesh(lipGeo, caseMaterial);
  lipMesh.position.z = frontLipZ;
  group.add(lipMesh);

  return group;
}
