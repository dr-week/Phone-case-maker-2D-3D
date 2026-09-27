import { useEffect, useRef, useState } from 'react';
import type { ReferenceAnalysis, UpscaleMeasurementResult } from './referenceAnalysis';
import { ThreeViewportController, type ViewOrientationPreset } from './features/3d-engine/three_viewport_controller';
import {
  buildCompletePhoneCaseScene,
  type ModelBuildResult,
  type CaseDisplayMode
} from './features/3d-engine/case_3d_orchestrator';
import type { CaseFilamentType } from './features/3d-engine/materials_factory';
import type { CutoutStyle } from './features/3d-engine/case_geometry_builder';

import type { BackCoverDesignParams } from './features/2d-design/cad_cover_types';

export type LayerMode = 'both' | 'phone' | 'case';

export interface ThreeCasePreviewProps {
  analysis?: ReferenceAnalysis | null;
  upscaleData?: UpscaleMeasurementResult | null;
  backCoverParams?: BackCoverDesignParams;
  initialCutoutStyle?: CutoutStyle;
  initialFilament?: CaseFilamentType;
  initialDisplayMode?: CaseDisplayMode;
}

export function ThreeCasePreview({
  analysis,
  upscaleData,
  backCoverParams,
  initialCutoutStyle = 'open-bump',
  initialFilament = 'neon-pla',
  initialDisplayMode = '3d-case'
}: ThreeCasePreviewProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<ThreeViewportController | null>(null);
  const modelRef = useRef<ModelBuildResult | null>(null);

  const [layer, setLayer] = useState<LayerMode>('both');
  const [cutoutStyle, setCutoutStyle] = useState<CutoutStyle>(initialCutoutStyle);
  const [filament, setFilament] = useState<CaseFilamentType>(initialFilament);
  const [displayMode, setDisplayMode] = useState<CaseDisplayMode>(initialDisplayMode);
  const [foldProgress, setFoldProgressState] = useState<number>(0);

  // Initialize Viewport once
  useEffect(() => {
    if (!hostRef.current) return;
    const viewport = new ThreeViewportController({ container: hostRef.current });
    viewportRef.current = viewport;

    return () => {
      viewport.dispose();
      viewportRef.current = null;
    };
  }, []);

  // Build/rebuild 3D phone and case geometries whenever inputs change
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const scene = viewport.getScene();

    // Clean previous model
    if (modelRef.current) {
      scene.remove(modelRef.current.rootGroup);
      modelRef.current.dispose();
      modelRef.current = null;
    }

    // Build new parametric scene
    const newModel = buildCompletePhoneCaseScene({
      analysis,
      upscaleData,
      backCoverParams,
      filament,
      cutoutStyle,
      displayMode,
      foldProgress
    });

    modelRef.current = newModel;
    newModel.phoneGroup.visible = layer !== 'case';
    newModel.caseGroup.visible = layer !== 'phone';
    scene.add(newModel.rootGroup);

    return () => {
      if (modelRef.current) {
        scene.remove(modelRef.current.rootGroup);
        modelRef.current.dispose();
        modelRef.current = null;
      }
    };
  }, [analysis, upscaleData, filament, cutoutStyle, displayMode]);

  // Dynamic fold angle updates without full scene recreation
  const handleFoldChange = (value: number) => {
    setFoldProgressState(value);
    modelRef.current?.setFoldProgress?.(value);
  };

  // Handle visibility layers
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.phoneGroup.visible = layer !== 'case';
      modelRef.current.caseGroup.visible = layer !== 'phone';
    }
  }, [layer]);

  const handleView = (preset: ViewOrientationPreset) => {
    viewportRef.current?.setView(preset);
  };

  return (
    <>
      <div
        className="three-host"
        ref={hostRef}
        aria-label="Interactive parametric 3D model of phone and case"
      />

      {/* Primary Camera/Orbit Presets */}
      <div className="view-tools" aria-label="3D view controls">
        <button onClick={() => handleView('perspective')}>Perspective</button>
        <button onClick={() => handleView('back')}>Back (Camera)</button>
        <button onClick={() => handleView('front')}>Front</button>
        <button onClick={() => handleView('left')}>Left (Buttons)</button>
        <button onClick={() => handleView('bottom')}>Bottom (Ports)</button>
        <button onClick={() => handleView('reset')}>Reset</button>
      </div>

      {/* Layer Toggles */}
      <div className="layer-tools" aria-label="Model layers">
        <button
          className={layer === 'phone' ? 'active' : ''}
          onClick={() => setLayer('phone')}
        >
          Phone
        </button>
        <button
          className={layer === 'case' ? 'active' : ''}
          onClick={() => setLayer('case')}
        >
          Case
        </button>
        <button
          className={layer === 'both' ? 'active' : ''}
          onClick={() => setLayer('both')}
        >
          Both
        </button>
      </div>

      {/* Form Mode & Camera Cutout Options */}
      <div className="filament-tools" aria-label="Case form and cutouts">
        <button
          className={displayMode === '3d-case' ? 'active' : ''}
          onClick={() => {
            setDisplayMode('3d-case');
            setFoldProgressState(0);
          }}
          title="3D curved assembled phone case"
        >
          3D Case
        </button>
        <button
          className={displayMode === 'flattened-net' ? 'active' : ''}
          onClick={() => {
            setDisplayMode('flattened-net');
            setFoldProgressState(0);
          }}
          title="Flattened sheet net with dashed living hinge folding slits"
        >
          Flattened Net (Slits)
        </button>
        <span style={{ color: '#445053', margin: '0 3px' }}>|</span>
        <button
          className={cutoutStyle === 'open-bump' ? 'active' : ''}
          onClick={() => setCutoutStyle('open-bump')}
          title="Open camera bump aperture with smooth curved corners (no middle holes)"
        >
          Open Bump
        </button>
        <button
          className={cutoutStyle === 'individual-holes' ? 'active' : ''}
          onClick={() => setCutoutStyle('individual-holes')}
          title="Individual lens holes with 3D print clearance"
        >
          Lens Holes
        </button>
      </div>

      {/* Interactive Fold Slider (Visible in Flattened Net Mode) */}
      {displayMode === 'flattened-net' && (
        <div className="fold-controller" aria-label="Living hinge fold simulator">
          <div className="fold-header">
            <span>Living Hinge Perforated Slits</span>
            <b>{Math.round(foldProgress * 90)}° ({Math.round(foldProgress * 100)}%)</b>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={foldProgress}
            onChange={e => handleFoldChange(parseFloat(e.target.value))}
            aria-label="Fold angle percentage"
          />
          <div className="fold-legend">
            <span>0° (Flat Print Bed)</span>
            <span>45° (Bending)</span>
            <span>90° (3D Case Box)</span>
          </div>
        </div>
      )}
    </>
  );
}
