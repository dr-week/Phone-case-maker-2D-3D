/**
 * cad_layer_types.ts
 *
 * Parametric 2D/3D Orthographic CAD Layer Engine:
 * - Variable layer stack: Add / Remove custom engineering layers
 * - Extrusion depth (mm): Each 2D layer specifies its Z-height / extrusion level
 * - Orthographic projection modes:
 *     1. FRONT VIEW (Rear backplate face)
 *     2. SIDE VIEW (Thickness profile & stepped camera island extrusion)
 *     3. TOP VIEW (Port clearances & top rim profile)
 *     4. 3-VIEW ORTHO (Simultaneous engineering draft with fold lines)
 * - Auto-resizing for any mobile device
 */

export type CadViewMode = 'front' | 'side' | 'top' | 'three-view';

export type CadLayerCategory = 'Structural' | 'Features' | 'Annotation' | 'Reference' | 'Custom';

export interface CadLayer {
  id: string;
  name: string;
  category: CadLayerCategory;
  description: string;
  color: string;
  visible: boolean;
  locked: boolean;
  wireframeOnly: boolean;
  opacity: number; // 0.0 to 1.0
  extrusionMm: number; // Z-axis extrusion thickness in millimeters
  zOffsetMm: number; // Starting elevation level from base in millimeters
  order: number;
  isRemovable?: boolean;
}

export const createDefaultCadLayers = (
  plateThickness = 1.8,
  bumpDepth = 8.0,
  openingRim = 1.2
): CadLayer[] => [
  {
    id: 'layer-grid',
    name: '00_GRID_DATUM',
    category: 'Reference',
    description: '10mm/1mm millimeter grid and origin datum projection',
    color: '#313e43',
    visible: true,
    locked: true,
    wireframeOnly: true,
    opacity: 0.6,
    extrusionMm: 0,
    zOffsetMm: 0,
    order: 0,
    isRemovable: false
  },
  {
    id: 'layer-chassis-outline',
    name: '01_CHASSIS_PLATE',
    category: 'Structural',
    description: 'Outer perimeter phone back cover base plate',
    color: '#899193',
    visible: true,
    locked: false,
    wireframeOnly: false,
    opacity: 1.0,
    extrusionMm: plateThickness,
    zOffsetMm: 0,
    order: 1,
    isRemovable: false
  },
  {
    id: 'layer-camera-island',
    name: '02_BUMP_ENVELOPE',
    category: 'Features',
    description: 'Elevated camera island housing with stepped wall extrusion',
    color: '#3ed3ff',
    visible: true,
    locked: false,
    wireframeOnly: false,
    opacity: 1.0,
    extrusionMm: bumpDepth,
    zOffsetMm: plateThickness,
    order: 2,
    isRemovable: false
  },
  {
    id: 'layer-apertures',
    name: '03_LENS_APERTURES',
    category: 'Features',
    description: 'Through-hole camera apertures and raised protective rim',
    color: '#c9ff3d',
    visible: true,
    locked: false,
    wireframeOnly: false,
    opacity: 1.0,
    extrusionMm: openingRim,
    zOffsetMm: plateThickness + bumpDepth,
    order: 3,
    isRemovable: false
  },
  {
    id: 'layer-side-notches',
    name: '04_PERIPHERAL_NOTCHES',
    category: 'Structural',
    description: 'Volume rocker / power button cutouts & USB living-hinge slots',
    color: '#ff9800',
    visible: true,
    locked: false,
    wireframeOnly: false,
    opacity: 1.0,
    extrusionMm: plateThickness,
    zOffsetMm: 0,
    order: 4,
    isRemovable: true
  },
  {
    id: 'layer-callouts-rulers',
    name: '05_DIM_ANNOTATIONS',
    category: 'Annotation',
    description: 'Precision millimeter dimension lines, arrows, and tolerance labels',
    color: '#c9ff3d',
    visible: true,
    locked: false,
    wireframeOnly: true,
    opacity: 1.0,
    extrusionMm: 0,
    zOffsetMm: 0,
    order: 5,
    isRemovable: false
  }
];

export const DEFAULT_CAD_LAYERS = createDefaultCadLayers();
