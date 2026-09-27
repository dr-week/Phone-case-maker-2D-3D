import * as THREE from 'three';
import type { ReferenceAnalysis, UpscaleMeasurementResult, CameraHoleFeature, ButtonFeature } from '../../referenceAnalysis';
import {
  createPhoneMaterials,
  createCaseMaterial,
  disposeMaterialGroup,
  type PhoneMaterials,
  type CaseFilamentType
} from './materials_factory';
import { buildParametricPhoneGroup, type PhoneGeometryConfig } from './phone_geometry_builder';
import { buildParametricCaseGroup, type CaseGeometryConfig, type CutoutStyle } from './case_geometry_builder';
import { buildFoldableCaseNet, type FlatPatternConfig, type FoldableCaseResult } from './flat_pattern_builder';

import type { BackCoverDesignParams } from '../2d-design/cad_cover_types';

export type CaseDisplayMode = '3d-case' | 'flattened-net';

export interface ModelBuildResult {
  rootGroup: THREE.Group;
  phoneGroup: THREE.Group;
  caseGroup: THREE.Group;
  foldableNet?: FoldableCaseResult;
  materials: {
    phone: PhoneMaterials;
    case: THREE.MeshPhysicalMaterial;
  };
  setFoldProgress?: (p: number) => void;
  dispose: () => void;
}

const DEFAULT_DIMENSIONS = { widthMm: 75.0, heightMm: 170.0, thicknessMm: 7.6 };
const DEFAULT_CORNER_RADIUS = 8.5;
const DEFAULT_CAMERA_ISLAND = {
  widthMm: 65.0,
  heightMm: 45.0,
  leftMm: 5.0,
  topMm: 6.0,
  cornerRadiusMm: 7.5,
  relaxationSpaceMm: 0.8
};
const DEFAULT_CAMERA_HOLES: CameraHoleFeature[] = [
  { role: 'camera-main', name: 'Camera Opening', xMm: 20.0, yMm: 24.0, radiusMm: 15.0, diameterMm: 30.0, cutoutRadiusMm: 15.0, cutoutDiameterMm: 30.0, shrinkageOffsetMm: 0 }
];
const DEFAULT_BUTTONS: ButtonFeature[] = [
  { name: 'Volume Rocker', side: 'left', topOffsetMm: 27.5, lengthMm: 20, protrusionMm: 0.9, purpose: 'Volume Up / Down' },
  { name: 'Side Key (Power)', side: 'left', topOffsetMm: 57.0, lengthMm: 10, protrusionMm: 0.85, purpose: 'Power / Screen Lock' }
];

export function buildCompletePhoneCaseScene(params: {
  analysis?: ReferenceAnalysis | null;
  upscaleData?: UpscaleMeasurementResult | null;
  backCoverParams?: BackCoverDesignParams;
  filament?: CaseFilamentType;
  cutoutStyle?: CutoutStyle;
  displayMode?: CaseDisplayMode;
  foldProgress?: number;
}): ModelBuildResult {
  const {
    analysis,
    upscaleData,
    backCoverParams,
    filament = 'neon-pla',
    cutoutStyle = 'open-bump',
    displayMode = '3d-case',
    foldProgress = 0
  } = params;

  // 1. Resolve phone/cover dimensions (Prioritize user-defined BackCoverDesignParams)
  const widthMm = backCoverParams?.coverWidthMm ?? upscaleData?.dimensions?.widthMm ?? analysis?.geometry.body.widthMm ?? DEFAULT_DIMENSIONS.widthMm;
  const heightMm = backCoverParams?.coverHeightMm ?? upscaleData?.dimensions?.heightMm ?? analysis?.geometry.body.heightMm ?? DEFAULT_DIMENSIONS.heightMm;
  const thicknessMm = backCoverParams?.coverThicknessMm ?? upscaleData?.dimensions?.thicknessMm ?? analysis?.geometry.body.thicknessMm ?? DEFAULT_DIMENSIONS.thicknessMm;
  const cornerRadiusMm = backCoverParams?.cornerCurvatureMm ?? upscaleData?.cornerCurvature?.averageRadiusMm ?? DEFAULT_CORNER_RADIUS;

  // 2. Resolve camera island/bump
  const cameraIsland = backCoverParams
    ? {
        widthMm: backCoverParams.bumpWidthMm,
        heightMm: backCoverParams.bumpHeightMm,
        leftMm: backCoverParams.bumpLeftMarginMm,
        topMm: backCoverParams.bumpTopMarginMm,
        cornerRadiusMm: backCoverParams.bumpCornerRadiusMm,
        relaxationSpaceMm: 0.8
      }
    : (upscaleData?.cameraIsland ?? {
        widthMm: analysis?.geometry.cameraIsland.widthMm ?? DEFAULT_CAMERA_ISLAND.widthMm,
        heightMm: analysis?.geometry.cameraIsland.heightMm ?? DEFAULT_CAMERA_ISLAND.heightMm,
        leftMm: analysis?.geometry.cameraIsland.leftMm ?? DEFAULT_CAMERA_ISLAND.leftMm,
        topMm: analysis?.geometry.cameraIsland.topMm ?? DEFAULT_CAMERA_ISLAND.topMm,
        cornerRadiusMm: analysis?.geometry.cameraIsland.cornerRadiusMm ?? DEFAULT_CAMERA_ISLAND.cornerRadiusMm,
        relaxationSpaceMm: 0.8
      });

  // 3. Resolve camera holes (with 3D print shrinkage compensation)
  let cameraHoles: CameraHoleFeature[] = upscaleData?.cameraHoles ?? [];
  if (cameraHoles.length === 0 && analysis?.geometry.cameraIsland.lenses) {
    cameraHoles = analysis.geometry.cameraIsland.lenses.map(lens => {
      const shrink = lens.radiusMm >= 2.5 ? 1.8 : 1.4;
      return {
        role: lens.role,
        name: `${lens.role} lens`,
        xMm: lens.xMm,
        yMm: lens.yMm,
        radiusMm: lens.radiusMm,
        diameterMm: lens.radiusMm * 2,
        cutoutRadiusMm: lens.radiusMm + shrink,
        cutoutDiameterMm: (lens.radiusMm + shrink) * 2,
        shrinkageOffsetMm: shrink * 2
      };
    });
    if (analysis.geometry.cameraIsland.flash) {
      const fl = analysis.geometry.cameraIsland.flash;
      cameraHoles.push({
        role: 'flash',
        name: 'LED Flash',
        xMm: fl.xMm,
        yMm: fl.yMm,
        radiusMm: fl.radiusMm,
        diameterMm: fl.radiusMm * 2,
        cutoutRadiusMm: fl.radiusMm + 1.4,
        cutoutDiameterMm: (fl.radiusMm + 1.4) * 2,
        shrinkageOffsetMm: 2.8
      });
    }
  }
  if (cameraHoles.length === 0) {
    cameraHoles = DEFAULT_CAMERA_HOLES;
  }

  // 4. Resolve buttons
  const buttons: ButtonFeature[] = (upscaleData?.buttons && upscaleData.buttons.length > 0)
    ? upscaleData.buttons
    : DEFAULT_BUTTONS;

  // 5. Build materials
  const phoneMaterials = createPhoneMaterials();
  const caseMaterial = createCaseMaterial(filament);
  const textureLoader = new THREE.TextureLoader();

  // 6. Build geometries
  const phoneConfig: PhoneGeometryConfig = {
    widthMm,
    heightMm,
    thicknessMm,
    cornerRadiusMm,
    cameraIsland,
    cameraHoles,
    buttons,
    protrusionMm: analysis?.geometry.cameraProtrusion.valueMm ?? 1.2
  };

  const phoneGroup = buildParametricPhoneGroup(phoneConfig, phoneMaterials, textureLoader);
  const rootGroup = new THREE.Group();
  rootGroup.name = 'parametric-caseforge-model';

  let caseGroup = new THREE.Group();
  let foldableNet: FoldableCaseResult | undefined;

  if (displayMode === 'flattened-net') {
    // Flattened sheet net with living-hinge dashed folding slits
    const flatConfig: FlatPatternConfig = {
      phoneWidthMm: widthMm,
      phoneHeightMm: heightMm,
      phoneThicknessMm: thicknessMm,
      phoneCornerRadiusMm: cornerRadiusMm,
      wallHeightMm: thicknessMm + 1.2,
      sheetThicknessMm: 1.3,
      slitLengthMm: 4.2,
      slitWidthMm: 0.75,
      bridgeLengthMm: 1.8,
      cameraIsland,
      buttons
    };

    foldableNet = buildFoldableCaseNet(flatConfig, caseMaterial);
    foldableNet.setFoldProgress(foldProgress);
    caseGroup = foldableNet.rootGroup;

    // Hover phone slightly above the flat sheet
    phoneGroup.position.z = -thicknessMm / 2 - 8.0;
    rootGroup.add(phoneGroup);
    rootGroup.add(caseGroup);
  } else {
    // Assembled 3D Case or Back Panel Replacement
    const caseConfig: CaseGeometryConfig = {
      phoneWidthMm: widthMm,
      phoneHeightMm: heightMm,
      phoneThicknessMm: thicknessMm,
      phoneCornerRadiusMm: cornerRadiusMm,
      wallThicknessMm: backCoverParams?.designType === 'back-panel' ? (backCoverParams.coverThicknessMm || 1.0) : 1.6,
      clearanceMm: backCoverParams?.designType === 'back-panel' ? 0.05 : 0.35,
      lipOverhangMm: 0.85,
      cutoutStyle,
      cameraIsland,
      cameraHoles,
      buttons,
      productDesignType: backCoverParams?.designType || 'back-case'
    };

    caseGroup = buildParametricCaseGroup(caseConfig, caseMaterial);
    rootGroup.add(phoneGroup);
    rootGroup.add(caseGroup);
  }

  // Center model origin at bounding center
  const bbox = new THREE.Box3().setFromObject(rootGroup);
  const center = bbox.getCenter(new THREE.Vector3());
  rootGroup.position.sub(center);

  const dispose = () => {
    disposeMaterialGroup(phoneMaterials as unknown as Record<string, THREE.Material>);
    caseMaterial.dispose();
    rootGroup.traverse(obj => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
      }
    });
  };

  return {
    rootGroup,
    phoneGroup,
    caseGroup,
    foldableNet,
    materials: {
      phone: phoneMaterials,
      case: caseMaterial
    },
    setFoldProgress: foldableNet?.setFoldProgress,
    dispose
  };
}
