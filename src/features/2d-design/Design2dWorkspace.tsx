import { useState, useMemo, useEffect } from 'react';
import type { ReferenceAnalysis, UpscaleMeasurementResult } from '../../referenceAnalysis';
import type { Inspection } from '../../referenceUploads';
import { MeasurementOverlaySvg } from './MeasurementOverlaySvg';
import { MeasurementMetricsCard } from './MeasurementMetricsCard';
import { InteractiveBackCoverSvg } from './InteractiveBackCoverSvg';
import { BackCoverParamEditor } from './BackCoverParamEditor';
import { CadLayerManager } from './CadLayerManager';
import {
  createDefaultCadLayers,
  type CadLayer,
  type CadViewMode
} from './cad_layer_types';
import {
  type BackCoverDesignParams,
  IPHONE_INSPIRED_BACK_COVER_DEFAULT
} from './cad_cover_types';
import { AntiSlopCadGuard } from './anti_slop_cad_guard';
import { CadParametricPermutator } from './cad_random_permutations';
import { WorkspaceRulerFrame } from './rulers/WorkspaceRulerFrame';
import { LayaCodeAssistant } from '../launcher/laya_code_assistant';
import {
  Compass,
  Camera,
  Shield,
  Smartphone,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Dices,
  Ruler,
  Sliders,
  Layers,
  Copy,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export type WorkspaceDesignTab = 'back-cover-cad' | 'reference-scan';

interface Design2dWorkspaceProps {
  references: Array<{ file: File; url: string; inspection?: Inspection }>;
  analysis: ReferenceAnalysis | null;
  upscaleData: UpscaleMeasurementResult | null;
  cutoutMode?: 'open-bump' | 'net-holes';
  onCutoutModeChange?: (mode: 'open-bump' | 'net-holes') => void;
  analyzing: boolean;
  upscaling: boolean;
  onScanReferences: () => void;
  onRunUpscaleAndMeasure: () => void;
  onApprove2d: () => void;
  // Controlled back cover params
  backCoverParams?: BackCoverDesignParams;
  onBackCoverParamsChange?: (params: BackCoverDesignParams) => void;
}

export function Design2dWorkspace({
  references,
  analysis,
  upscaleData,
  cutoutMode: controlledCutoutMode,
  onCutoutModeChange,
  analyzing,
  upscaling,
  onScanReferences,
  onRunUpscaleAndMeasure,
  onApprove2d,
  backCoverParams: controlledParams,
  onBackCoverParamsChange
}: Design2dWorkspaceProps) {
  // Tabs: 'back-cover-cad' (interactive ruler CAD) vs 'reference-scan' (legacy photo scan)
  const [activeTab, setActiveTab] = useState<WorkspaceDesignTab>('back-cover-cad');
  const [showOverlays, setShowOverlays] = useState(true);
  const [showRulers, setShowRulers] = useState(true);
  const [useUpscaledImage, setUseUpscaledImage] = useState(true);
  const [internalCutoutMode, setInternalCutoutMode] = useState<'open-bump' | 'net-holes'>('open-bump');

  // Back cover parametric state
  const [internalParams, setInternalParams] = useState<BackCoverDesignParams>(IPHONE_INSPIRED_BACK_COVER_DEFAULT);
  const currentParams = controlledParams ?? internalParams;

  // Orthographic View Mode: 'front' | 'side' | 'top' | 'three-view'
  const [viewMode, setViewMode] = useState<CadViewMode>('front');

  // Interactive Graphic Design Zoom & Pan State (1.0 = 100%)
  const [zoom, setZoom] = useState<number>(1.0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleResetZoomPan = () => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  };

  // CAD Layer management state: dynamic stack with millimeter extrusions
  const [layers, setLayers] = useState<CadLayer[]>(() =>
    createDefaultCadLayers(
      currentParams.coverThicknessMm,
      currentParams.bumpDepthMm,
      currentParams.cameraOpeningRimMm
    )
  );
  const [activeLayerId, setActiveLayerId] = useState<string>('layer-chassis-outline');
  const [sidebarTab, setSidebarTab] = useState<'layers' | 'dimensions'>('dimensions');

  // Auto-sync layer extrusion depths when phone dimensions change
  useEffect(() => {
    setLayers(prev =>
      prev.map(layer => {
        if (layer.id === 'layer-chassis-outline') {
          return { ...layer, extrusionMm: currentParams.coverThicknessMm };
        }
        if (layer.id === 'layer-camera-island') {
          return {
            ...layer,
            extrusionMm: currentParams.bumpDepthMm,
            zOffsetMm: currentParams.coverThicknessMm
          };
        }
        if (layer.id === 'layer-apertures') {
          return {
            ...layer,
            extrusionMm: currentParams.cameraOpeningRimMm,
            zOffsetMm: currentParams.coverThicknessMm + currentParams.bumpDepthMm
          };
        }
        return layer;
      })
    );
  }, [
    currentParams.coverThicknessMm,
    currentParams.bumpDepthMm,
    currentParams.cameraOpeningRimMm
  ]);

  const handleParamsChange = (updated: BackCoverDesignParams) => {
    setInternalParams(updated);
    onBackCoverParamsChange?.(updated);
  };

  const handleResetParams = () => {
    handleParamsChange(IPHONE_INSPIRED_BACK_COVER_DEFAULT);
  };

  const cutoutMode = controlledCutoutMode ?? internalCutoutMode;
  const handleCutoutChange = (mode: 'open-bump' | 'net-holes') => {
    setInternalCutoutMode(mode);
    onCutoutModeChange?.(mode);
  };

  // Layer action handlers
  const handleToggleVisibility = (id: string) => {
    setLayers(prev =>
      prev.map(l => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  };

  const handleToggleLock = (id: string) => {
    setLayers(prev =>
      prev.map(l => (l.id === id ? { ...l, locked: !l.locked } : l))
    );
  };

  const handleToggleWireframe = (id: string) => {
    setLayers(prev =>
      prev.map(l => (l.id === id ? { ...l, wireframeOnly: !l.wireframeOnly } : l))
    );
  };

  const handleUpdateExtrusionMm = (id: string, extrusionMm: number) => {
    const validMm = Math.max(0, Math.min(50, extrusionMm));
    setLayers(prev =>
      prev.map(l => (l.id === id ? { ...l, extrusionMm: validMm } : l))
    );

    // Sync back to parametric parameters
    if (id === 'layer-chassis-outline') {
      handleParamsChange({ ...currentParams, coverThicknessMm: validMm });
    } else if (id === 'layer-camera-island') {
      handleParamsChange({ ...currentParams, bumpDepthMm: validMm });
    } else if (id === 'layer-apertures') {
      handleParamsChange({ ...currentParams, cameraOpeningRimMm: validMm });
    }
  };

  const handleAddLayer = (name: string, extrusionMm: number, color: string) => {
    const newId = `layer-custom-${Date.now()}`;
    const newLayer: CadLayer = {
      id: newId,
      name,
      category: 'Custom',
      description: `Custom layer with ${extrusionMm}mm extrusion`,
      color,
      visible: true,
      locked: false,
      wireframeOnly: false,
      opacity: 1.0,
      extrusionMm,
      zOffsetMm: currentParams.coverThicknessMm,
      order: layers.length,
      isRemovable: true
    };
    setLayers(prev => [...prev, newLayer]);
    setActiveLayerId(newId);
  };

  const handleRemoveLayer = (id: string) => {
    setLayers(prev => prev.filter(l => l.id !== id));
    if (activeLayerId === id) {
      setActiveLayerId('layer-chassis-outline');
    }
  };

  const handleQuickToggleAll = (visible: boolean) => {
    setLayers(prev =>
      prev.map(l => ({ ...l, visible }))
    );
  };

  // Anti-Slop diagnostics guardrail
  const antiSlopIssues = useMemo(() => {
    return AntiSlopCadGuard.auditDesignParameters(currentParams);
  }, [currentParams]);

  const hasFatalAntiSlopError = antiSlopIssues.some(issue => issue.severity === 'error');

  const imgSrc = useUpscaledImage
    ? '/a73-back-reference.png?v=clean-2'
    : '/a73-upscaled-analysis.png?v=scan-2';

  return (
    <div className="workspace-page design2d-page">
      {/* Compact Top Action Bar: diagnostics, curvature, quick actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', height: '36px', flex: '0 0 36px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Target Design Intent (Back Case vs Back Panel) */}
          <button
            type="button"
            onClick={() => {
              const nextType = currentParams.designType === 'back-panel' ? 'back-case' : 'back-panel';
              const isPanel = nextType === 'back-panel';
              handleParamsChange({
                ...currentParams,
                designType: nextType,
                coverThicknessMm: isPanel ? 1.0 : 1.8,
                bumpDepthMm: isPanel ? 1.2 : 6.0,
                bumpWallThicknessMm: isPanel ? 1.2 : 1.8
              });
            }}
            style={{
              fontSize: '11px',
              fontFamily: 'DM Mono, monospace',
              fontWeight: 'bold',
              background: currentParams.designType === 'back-panel' ? '#0f2430' : '#1b2c14',
              color: currentParams.designType === 'back-panel' ? '#3ed3ff' : '#c9ff3d',
              border: currentParams.designType === 'back-panel' ? '1px solid #1f5066' : '1px solid #4a6f20',
              borderRadius: '8px',
              padding: '4px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
            title="Click to toggle between Back Case (Protective Wrap) and Back Panel (Replacement Plate)"
          >
            {currentParams.designType === 'back-panel' ? <Smartphone size={13} /> : <Shield size={13} />}
            <span>{currentParams.designType === 'back-panel' ? 'BACK PANEL' : 'BACK CASE'}</span>
          </button>

          <span
            style={{
              fontSize: '11px',
              color: antiSlopIssues.length === 0 ? '#c9ff3d' : hasFatalAntiSlopError ? '#ff7168' : '#f0b65b',
              fontFamily: 'DM Mono, monospace',
              background: '#0d1214',
              border: '1px solid #232d30',
              borderRadius: '8px',
              padding: '4px 9px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
            title={antiSlopIssues.length === 0 ? 'Clean (0 errors)' : `${antiSlopIssues.length} diagnostics`}
          >
            {antiSlopIssues.length === 0 ? <ShieldCheck size={13} /> : <ShieldAlert size={13} />}
            <span>{antiSlopIssues.length === 0 ? 'Clean' : `!${antiSlopIssues.length}`}</span>
          </span>
          <span
            style={{
              fontSize: '11px',
              color: '#3ed3ff',
              fontFamily: 'DM Mono, monospace',
              background: '#0c1619',
              border: '1px solid #1c3640',
              borderRadius: '8px',
              padding: '4px 9px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="Chassis Corner Curvature"
          >
            R{currentParams.cornerCurvatureMm}mm
          </span>
          <button
            type="button"
            className="cutout-toggle-btn"
            onClick={() => {
              const audit = LayaCodeAssistant.auditCadModel(currentParams);
              if (audit.suggestedPatch && Object.keys(audit.suggestedPatch).length > 0) {
                handleParamsChange({ ...currentParams, ...audit.suggestedPatch });
              }
            }}
            title="Laya AI Auto-Fix (0 tokens)"
            style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', background: '#101712', color: '#c9ff3d', borderColor: '#3f6222', borderRadius: '8px', padding: '5px 10px' }}
          >
            <Sparkles size={11} />
            <span>Laya</span>
          </button>
          <button
            type="button"
            className="cutout-toggle-btn"
            onClick={() => {
              const part = CadParametricPermutator.selectRandomComponentPart();
              const mutated = CadParametricPermutator.mutateSingleComponentPart(currentParams, part.part);
              handleParamsChange(mutated);
            }}
            title="Randomize Part"
            style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', background: '#1c2817', color: '#c9ff3d', borderColor: '#4a6b22', borderRadius: '8px', padding: '5px 10px' }}
          >
            <Zap size={11} />
            <span>Part</span>
          </button>
          <button
            type="button"
            className="cutout-toggle-btn"
            onClick={() => handleParamsChange(CadParametricPermutator.generateRandomCoverParams())}
            title="Randomize All Dimensions"
            style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', background: '#172224', color: '#3ed3ff', borderColor: '#23444d', borderRadius: '8px', padding: '5px 10px' }}
          >
            <Dices size={11} />
            <span>All</span>
          </button>
          <button
            className={`cutout-toggle-btn ${showRulers ? 'active' : ''}`}
            onClick={() => setShowRulers(!showRulers)}
            title="Toggle Rulers"
            style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Ruler size={11} />
            <span>{showRulers ? 'Ruler' : 'Off'}</span>
          </button>
        </div>

        {/* View mode toggle: Front / Side / Top / 3-View */}
        <div style={{ display: 'flex', gap: '4px', background: '#0c1012', padding: '3px', borderRadius: '8px', border: '1px solid #1f272a' }}>
          {(['front', 'side', 'top', 'three-view'] as CadViewMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              style={{
                background: viewMode === mode ? '#182415' : 'transparent',
                border: viewMode === mode ? '1px solid #4a6b22' : '1px solid transparent',
                color: viewMode === mode ? '#c9ff3d' : '#899193',
                fontSize: '10px',
                fontFamily: 'DM Mono, monospace',
                borderRadius: '5px',
                padding: '3px 7px',
                cursor: 'pointer'
              }}
            >
              {mode.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'back-cover-cad' ? (
        /* --- INTERACTIVE 2D ORTHOGRAPHIC CAD WORKSPACE --- */
        <div className="design2d-layout" style={{ flex: 1, minHeight: 0 }}>
          <section className="reference-board" style={{ height: '100%', position: 'relative', borderRadius: '14px', border: '1px solid #232d30', overflow: 'hidden' }}>
            {/* View / Layer info pill overlay */}
            <div className="board-toolbar" style={{ position: 'absolute', top: '10px', right: '12px', zIndex: 12, display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#c9ff3d', background: '#121914cc', border: '1px solid #36501d', borderRadius: '6px', padding: '3px 8px', fontFamily: 'DM Mono, monospace', backdropFilter: 'blur(6px)' }}>
                VIEW: {viewMode.toUpperCase()}
              </span>
              <span style={{ fontSize: '10px', color: '#899193', background: '#111516cc', border: '1px solid #232d30', borderRadius: '6px', padding: '3px 8px', fontFamily: 'DM Mono, monospace', backdropFilter: 'blur(6px)' }}>
                LAYER: {layers.find(l => l.id === activeLayerId)?.name}
              </span>
            </div>

            {/* 100% Workspace Ruler Frame with Graphic Design Zoom & Pan */}
            <div style={{ position: 'absolute', inset: 0 }}>
              <WorkspaceRulerFrame
                showRulers={showRulers}
                unit="mm"
                zoom={zoom}
                pan={pan}
                onZoomChange={setZoom}
                onPanChange={setPan}
                onResetView={handleResetZoomPan}
              >
                <InteractiveBackCoverSvg
                  params={currentParams}
                  onChange={handleParamsChange}
                  showRulers={showRulers}
                  layers={layers}
                  activeLayerId={activeLayerId}
                  viewMode={viewMode}
                />
              </WorkspaceRulerFrame>
            </div>

            {/* Bottom Floating Dimension Readout Pills */}
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: showRulers ? '32px' : '10px',
                right: '10px',
                zIndex: 12,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                pointerEvents: 'none'
              }}
            >
              <span style={{ fontSize: '10px', color: '#c9ff3d', background: '#101712d9', border: '1px solid #2d451a', borderRadius: '6px', padding: '3px 8px', fontFamily: 'DM Mono, monospace', backdropFilter: 'blur(6px)' }}>
                PLATE: {currentParams.coverWidthMm} × {currentParams.coverHeightMm} × {currentParams.coverThicknessMm} mm (R{currentParams.cornerCurvatureMm})
              </span>
              <span style={{ fontSize: '10px', color: '#3ed3ff', background: '#0c161ad9', border: '1px solid #1c3c47', borderRadius: '6px', padding: '3px 8px', fontFamily: 'DM Mono, monospace', backdropFilter: 'blur(6px)' }}>
                BUMP: {currentParams.bumpWidthMm} × {currentParams.bumpHeightMm} × {currentParams.bumpDepthMm} mm
              </span>
              <span style={{ fontSize: '10px', color: '#ffb74d', background: '#17120ad9', border: '1px solid #4a3417', borderRadius: '6px', padding: '3px 8px', fontFamily: 'DM Mono, monospace', backdropFilter: 'blur(6px)' }}>
                EXT: {(currentParams.coverThicknessMm + currentParams.bumpDepthMm).toFixed(1)} mm
              </span>
            </div>
          </section>

          {/* Right CAD Controls Panel: Tab between Specs, Layers, and Photo Scan */}
          <aside className="metrics-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 0, borderRadius: '14px', border: '1px solid #232d30', overflow: 'hidden', background: '#0d1113' }}>
            {/* Header tab switcher */}
            <div style={{ display: 'flex', borderBottom: '1px solid #242e31', background: '#0e1315' }}>
              <button
                type="button"
                onClick={() => setSidebarTab('dimensions')}
                title="Dimensions & Parametric Specs"
                style={{
                  flex: 1,
                  padding: '9px 6px',
                  background: sidebarTab === 'dimensions' ? '#182014' : 'transparent',
                  border: 0,
                  borderBottom: sidebarTab === 'dimensions' ? '2px solid #c9ff3d' : '2px solid transparent',
                  color: sidebarTab === 'dimensions' ? '#c9ff3d' : '#899193',
                  fontSize: '11px',
                  fontFamily: 'DM Mono, monospace',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px'
                }}
              >
                <Sliders size={12} />
                <span>Specs</span>
              </button>
              <button
                type="button"
                onClick={() => setSidebarTab('layers')}
                title="Orthographic CAD Layers"
                style={{
                  flex: 1,
                  padding: '9px 6px',
                  background: sidebarTab === 'layers' ? '#182014' : 'transparent',
                  border: 0,
                  borderBottom: sidebarTab === 'layers' ? '2px solid #c9ff3d' : '2px solid transparent',
                  color: sidebarTab === 'layers' ? '#c9ff3d' : '#899193',
                  fontSize: '11px',
                  fontFamily: 'DM Mono, monospace',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px'
                }}
              >
                <Layers size={12} />
                <span>Layers ({layers.filter(l => l.visible).length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('reference-scan')}
                title="Switch to Photo Reference Scan"
                style={{
                  flex: 1,
                  padding: '9px 6px',
                  background: 'transparent',
                  border: 0,
                  borderBottom: '2px solid transparent',
                  color: '#899193',
                  fontSize: '11px',
                  fontFamily: 'DM Mono, monospace',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px'
                }}
              >
                <Camera size={12} />
                <span>Scan</span>
              </button>
            </div>

            {/* Panel Body */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {sidebarTab === 'dimensions' ? (
                <BackCoverParamEditor
                  params={currentParams}
                  onChange={handleParamsChange}
                  onReset={handleResetParams}
                />
              ) : (
                <div style={{ padding: '16px' }}>
                  <CadLayerManager
                    layers={layers}
                    activeLayerId={activeLayerId}
                    viewMode={viewMode}
                    onSelectViewMode={setViewMode}
                    onSelectLayer={setActiveLayerId}
                    onToggleVisibility={handleToggleVisibility}
                    onToggleLock={handleToggleLock}
                    onToggleWireframe={handleToggleWireframe}
                    onUpdateExtrusionMm={handleUpdateExtrusionMm}
                    onAddLayer={handleAddLayer}
                    onRemoveLayer={handleRemoveLayer}
                    onQuickToggleAll={handleQuickToggleAll}
                  />
                </div>
              )}
            </div>

            {/* Anti-Slop warning panel if issues detected */}
            {antiSlopIssues.length > 0 && (
              <div style={{ margin: '0 16px 10px', padding: '10px', background: '#1c1515', border: '1px solid #5e2626', borderRadius: '6px' }}>
                <span style={{ font: '600 9px "DM Mono", monospace', color: '#ff7168' }}>
                  ANTI-SLOP GEOMETRIC CHECKS:
                </span>
                <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {antiSlopIssues.map(issue => (
                    <small key={issue.ruleId} style={{ color: issue.severity === 'error' ? '#ff9e96' : '#f0b65b', fontSize: '9px' }}>
                      • {issue.message}
                    </small>
                  ))}
                </div>
              </div>
            )}

            <div style={{ padding: '12px 16px', borderTop: '1px solid #222d32', background: '#0e1315', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                className="secondary"
                style={{
                  width: '100%',
                  background: '#192214',
                  borderColor: '#66831b',
                  color: '#c9ff3d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '9px 12px',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}
                onClick={() => {
                  navigator.clipboard?.writeText(JSON.stringify(currentParams, null, 2));
                }}
                title="Copy JSON"
              >
                <Copy size={13} />
                <span>JSON</span>
              </button>
              <button
                className="primary"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px 12px',
                  fontSize: '12px'
                }}
                disabled={hasFatalAntiSlopError}
                onClick={onApprove2d}
                title="Proceed to 3D"
              >
                <span>3D</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </aside>
        </div>
      ) : (
        /* --- LEGACY PHOTO SCAN WORKSPACE --- */
        <div className="design2d-layout" style={{ flex: 1, minHeight: 0 }}>
          <section className="reference-board">
            <div className="board-toolbar" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button
                type="button"
                className="cutout-toggle-btn active"
                onClick={() => setActiveTab('back-cover-cad')}
                style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
                title="Return to CAD"
              >
                <Compass size={12} />
                <span>CAD</span>
              </button>
              <button
                className={showOverlays ? 'active' : ''}
                onClick={() => setShowOverlays(!showOverlays)}
              >
                {showOverlays ? 'Guides on' : 'Guides off'}
              </button>
              <button
                className={useUpscaledImage ? 'active' : ''}
                onClick={() => setUseUpscaledImage(!useUpscaledImage)}
              >
                {useUpscaledImage ? 'Cleaned' : 'Original'}
              </button>
            </div>

            {references.length && !upscaleData ? (
              references.map(item => (
                <figure key={item.url}>
                  <img src={item.url} alt={item.file.name} />
                  <figcaption>
                    {item.inspection?.views.map(view => view.kind).join(' + ') || 'Awaiting scan'}
                  </figcaption>
                </figure>
              ))
            ) : (
              <figure>
                <div className="reference-board-inner">
                  <img src={imgSrc} alt="Complete Samsung Galaxy A73 rear reference" />
                  {showOverlays && (
                    <MeasurementOverlaySvg
                      upscaleData={upscaleData}
                      cutoutMode={cutoutMode}
                    />
                  )}
                </div>
                <figcaption>
                  {cutoutMode === 'open-bump'
                    ? 'Open bump · '
                    : 'Lens holes · '}
                  Back {useUpscaledImage && upscaleData ? '· cleaned' : ''}
                </figcaption>
              </figure>
            )}

            <div className="dimension-lines">
              <span className="dim-height">163.7 mm</span>
              <span className="dim-width">76.1 mm</span>
            </div>
          </section>

          <MeasurementMetricsCard
            analysis={analysis}
            upscaleData={upscaleData}
            cutoutMode={cutoutMode}
            onCutoutModeChange={handleCutoutChange}
            analyzing={analyzing}
            upscaling={upscaling}
            onScan={onScanReferences}
            onUpscale={onRunUpscaleAndMeasure}
            onApprove={onApprove2d}
          />
        </div>
      )}
    </div>
  );
}
