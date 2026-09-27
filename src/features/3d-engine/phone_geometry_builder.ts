import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import type { CameraHoleFeature, ButtonFeature } from '../../referenceAnalysis';
import type { PhoneMaterials } from './materials_factory';

export interface PhoneGeometryConfig {
  widthMm: number;
  heightMm: number;
  thicknessMm: number;
  cornerRadiusMm: number;
  cameraIsland: {
    widthMm: number;
    heightMm: number;
    leftMm: number;
    topMm: number;
    cornerRadiusMm: number;
  };
  cameraHoles: CameraHoleFeature[];
  buttons: ButtonFeature[];
  protrusionMm?: number;
}

export function createRoundedRectShape(w: number, h: number, r: number): THREE.Shape {
  const radius = Math.max(0.1, Math.min(r, w / 2 - 0.1, h / 2 - 0.1));
  const shape = new THREE.Shape();
  const hw = w / 2;
  const hh = h / 2;
  shape.moveTo(-hw + radius, -hh);
  shape.lineTo(hw - radius, -hh);
  shape.quadraticCurveTo(hw, -hh, hw, -hh + radius);
  shape.lineTo(hw, hh - radius);
  shape.quadraticCurveTo(hw, hh, hw - radius, hh);
  shape.lineTo(-hw + radius, hh);
  shape.quadraticCurveTo(-hw, hh, -hw, hh - radius);
  shape.lineTo(-hw, -hh + radius);
  shape.quadraticCurveTo(-hw, -hh, -hw + radius, -hh);
  return shape;
}

export function createExtrudedPrism(
  w: number,
  h: number,
  depth: number,
  radius: number,
  material: THREE.Material
): THREE.Mesh {
  const shape = createRoundedRectShape(w, h, radius);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: false,
    curveSegments: 16
  });
  geometry.translate(0, 0, -depth / 2);
  return new THREE.Mesh(geometry, material);
}

export function buildParametricPhoneGroup(
  config: PhoneGeometryConfig,
  materials: PhoneMaterials,
  textureLoader?: THREE.TextureLoader
): THREE.Group {
  const group = new THREE.Group();
  group.name = 'phone-device';

  const {
    widthMm: w,
    heightMm: h,
    thicknessMm: d,
    cornerRadiusMm: r,
    cameraIsland,
    cameraHoles,
    buttons,
    protrusionMm = 1.2
  } = config;

  // 1. Main unibody chassis / frame
  const frameMesh = createExtrudedPrism(w, h, d, r, materials.frame);
  frameMesh.castShadow = true;
  frameMesh.receiveShadow = true;
  group.add(frameMesh);

  // 2. Rear glass backplate
  const backMesh = createExtrudedPrism(w - 0.8, h - 0.8, 0.55, Math.max(1, r - 0.4), materials.back);
  backMesh.position.z = d / 2 - 0.18;
  group.add(backMesh);

  // 3. Front display screen
  const screenMesh = createExtrudedPrism(w - 1.2, h - 1.2, 0.35, Math.max(1, r - 0.6), materials.screen);
  screenMesh.position.z = -d / 2 - 0.02;
  group.add(screenMesh);

  // 4. Front punch-hole camera dot
  const punchHole = new THREE.Mesh(
    new THREE.CircleGeometry(1.6, 24),
    new THREE.MeshBasicMaterial({ color: 0x010203 })
  );
  punchHole.position.set(0, h / 2 - 7.5, -d / 2 - 0.22);
  punchHole.rotation.y = Math.PI;
  group.add(punchHole);

  // 5. Reference photo overlay for high visual fidelity
  if (textureLoader) {
    const texture = textureLoader.load('/a73-back-reference.png');
    texture.colorSpace = THREE.SRGBColorSpace;
    const photo = new THREE.Mesh(
      new THREE.PlaneGeometry(w - 0.7, h - 0.7),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.84,
        polygonOffset: true,
        polygonOffsetFactor: -2
      })
    );
    photo.position.z = d / 2 + 0.105;
    group.add(photo);
  }

  // 6. Physical side buttons (Volume Rocker & Power Key)
  buttons.forEach(btn => {
    const btnY = h / 2 - (btn.topOffsetMm + btn.lengthMm / 2);
    const isLeft = btn.side === 'left';
    const btnX = isLeft ? -w / 2 - btn.protrusionMm / 2 : w / 2 + btn.protrusionMm / 2;
    const btnMesh = new THREE.Mesh(
      new RoundedBoxGeometry(btn.protrusionMm, btn.lengthMm, 1.8, 4, 0.35),
      materials.button
    );
    btnMesh.position.set(btnX, btnY, 0);
    group.add(btnMesh);
  });

  // 7. Raised camera island bump
  const islandW = cameraIsland.widthMm;
  const islandH = cameraIsland.heightMm;
  const islandX = -w / 2 + cameraIsland.leftMm + islandW / 2;
  const islandY = h / 2 - cameraIsland.topMm - islandH / 2;
  const islandZ = d / 2 + protrusionMm / 2 + 0.1;

  const islandMesh = createExtrudedPrism(
    islandW,
    islandH,
    protrusionMm,
    cameraIsland.cornerRadiusMm,
    materials.island
  );
  islandMesh.position.set(islandX, islandY, islandZ);
  group.add(islandMesh);

  // 8. Individual camera lenses and LED flash
  const lensElevationZ = d / 2 + protrusionMm + 0.45;
  cameraHoles.forEach(hole => {
    const holeX = -w / 2 + hole.xMm;
    const holeY = h / 2 - hole.yMm;

    if (hole.role === 'flash') {
      const flashMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(hole.radiusMm, hole.radiusMm, 0.6, 28),
        materials.flashLed
      );
      flashMesh.rotation.x = Math.PI / 2;
      flashMesh.position.set(holeX, holeY, lensElevationZ);
      group.add(flashMesh);
    } else {
      // Machined metal outer bezel
      const bezel = new THREE.Mesh(
        new THREE.CylinderGeometry(hole.radiusMm + 0.55, hole.radiusMm + 0.55, 0.72, 36),
        materials.lensBezel
      );
      bezel.rotation.x = Math.PI / 2;
      bezel.position.set(holeX, holeY, lensElevationZ - 0.05);
      group.add(bezel);

      // Antireflective glass element
      const glass = new THREE.Mesh(
        new THREE.CylinderGeometry(hole.radiusMm, hole.radiusMm, 0.88, 36),
        materials.lensGlass
      );
      glass.rotation.x = Math.PI / 2;
      glass.position.set(holeX, holeY, lensElevationZ + 0.12);
      group.add(glass);
    }
  });

  return group;
}
