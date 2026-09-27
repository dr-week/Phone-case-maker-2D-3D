import React, { useState, useMemo } from 'react';
import type { BackCoverDesignParams } from './cad_cover_types';
import { LayaCadDecisionEngine } from './laya_cad_decision_router';
import { CadParametricPermutator, type CadComponentPart, type RandomPartSelectionResult } from './cad_random_permutations';
import {
  RotateCcw,
  Sparkles,
  Sliders,
  Check,
  Dices,
  Zap,
  Smartphone,
  Shield,
  Camera,
  Search,
  Maximize2,
  Layers as LayersIcon
} from 'lucide-react';

interface BackCoverParamEditorProps {
  params: BackCoverDesignParams;
  onChange: (updated: BackCoverDesignParams) => void;
  onReset: () => void;
}

export const BackCoverParamEditor: React.FC<BackCoverParamEditorProps> = ({
  params,
  onChange,
  onReset
}) => {
  const [editorMode, setEditorMode] = useState<'simplified' | 'full'>('simplified');
  const [selectedPart, setSelectedPart] = useState<RandomPartSelectionResult>(() =>
    CadParametricPermutator.selectRandomComponentPart()
  );

  const update = (field: keyof BackCoverDesignParams, value: number) => {
    onChange({
      ...params,
      [field]: Math.max(0.5, value)
    });
  };

  const layaDecision = useMemo(() => {
    const cutoutRouting = LayaCadDecisionEngine.routeCutoutStrategy(params, true);
    const fabProcess = LayaCadDecisionEngine.routeFabricationProcess(params);
    const tolerance = LayaCadDecisionEngine.verifyGeometricTolerances(params);
    return { cutoutRouting, fabProcess, tolerance };
  }, [params]);

  const handlePickRandomPart = () => {
    const next = CadParametricPermutator.selectRandomComponentPart(selectedPart.part);
    setSelectedPart(next);
  };

  const handleMutateSelectedPart = () => {
    const mutated = CadParametricPermutator.mutateSingleComponentPart(params, selectedPart.part);
    onChange(mutated);
  };

  const applyAutoCorrections = () => {
    if (layaDecision.tolerance.autoCorrectedParams) {
      onChange({
        ...params,
        ...layaDecision.tolerance.autoCorrectedParams
      });
    }
  };

  return (
    <div className="cad-param-editor" style={{ padding: '12px', color: '#edf0ed' }}>
      {/* Header with clean icons & minimal words */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Maximize2 size={13} color="#c9ff3d" />
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#c9ff3d', fontFamily: 'DM Mono, monospace' }}>
            CAD
          </span>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            type="button"
            onClick={() => setEditorMode(m => m === 'simplified' ? 'full' : 'simplified')}
            title={editorMode === 'simplified' ? 'Simple' : 'Full'}
            style={{
              background: editorMode === 'simplified' ? '#1c2817' : '#141a1c',
              border: `1px solid ${editorMode === 'simplified' ? '#4a6b22' : '#293539'}`,
              color: editorMode === 'simplified' ? '#c9ff3d' : '#899193',
              borderRadius: '4px',
              padding: '4px 6px',
              fontSize: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {editorMode === 'simplified' ? <Sparkles size={11} /> : <Sliders size={11} />}
            <span>{editorMode === 'simplified' ? 'Simple' : 'Full'}</span>
          </button>
          <button
            type="button"
            onClick={onReset}
            title="Reset"
            style={{
              background: 'transparent',
              border: '1px solid #334044',
              color: '#c9ff3d',
              borderRadius: '4px',
              padding: '4px 6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <RotateCcw size={11} />
          </button>
        </div>
      </div>

      {/* Target Design Intent Switcher (Back Case vs Back Panel) */}
      <div
        style={{
          marginBottom: '10px',
          background: '#090d0f',
          border: '1px solid #1c272a',
          borderRadius: '8px',
          padding: '6px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6px'
        }}
      >
        <button
          type="button"
          onClick={() => {
            onChange({
              ...params,
              designType: 'back-case',
              coverThicknessMm: 1.8,
              bumpDepthMm: 6.0,
              bumpWallThicknessMm: 1.8
            });
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            padding: '6px',
            borderRadius: '6px',
            fontSize: '11px',
            fontFamily: 'DM Mono, monospace',
            cursor: 'pointer',
            background: params.designType !== 'back-panel' ? '#1c2817' : 'transparent',
            border: params.designType !== 'back-panel' ? '1px solid #4a6b22' : '1px solid transparent',
            color: params.designType !== 'back-panel' ? '#c9ff3d' : '#899193',
            fontWeight: params.designType !== 'back-panel' ? 'bold' : 'normal'
          }}
        >
          <Shield size={12} />
          <span>Back Case</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onChange({
              ...params,
              designType: 'back-panel',
              coverThicknessMm: 1.0,
              bumpDepthMm: 1.2,
              bumpWallThicknessMm: 1.2
            });
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            padding: '6px',
            borderRadius: '6px',
            fontSize: '11px',
            fontFamily: 'DM Mono, monospace',
            cursor: 'pointer',
            background: params.designType === 'back-panel' ? '#10222c' : 'transparent',
            border: params.designType === 'back-panel' ? '1px solid #1f4f66' : '1px solid transparent',
            color: params.designType === 'back-panel' ? '#3ed3ff' : '#899193',
            fontWeight: params.designType === 'back-panel' ? 'bold' : 'normal'
          }}
        >
          <Smartphone size={12} />
          <span>Back Panel</span>
        </button>
      </div>

      {/* LAYA System 1 Status Pill */}
      <div
        style={{
          marginBottom: '10px',
          background: layaDecision.tolerance.isValid ? '#101712' : '#221414',
          border: `1px solid ${layaDecision.tolerance.isValid ? '#3f6222' : '#732c2c'}`,
          borderRadius: '5px',
          padding: '6px 8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span style={{ fontSize: '10px', fontFamily: 'DM Mono, monospace', color: layaDecision.tolerance.isValid ? '#c9ff3d' : '#ff7a7a', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Zap size={10} /> {layaDecision.tolerance.score}%
        </span>
        <span style={{ fontSize: '10px', fontFamily: 'DM Mono, monospace', color: '#899193' }}>
          {layaDecision.cutoutRouting.decision}
        </span>
        {layaDecision.tolerance.autoCorrectedParams && (
          <button
            type="button"
            onClick={applyAutoCorrections}
            title="Fix"
            style={{
              background: '#c9ff3d',
              border: 0,
              borderRadius: '3px',
              color: '#0a0d0e',
              fontSize: '9px',
              fontWeight: 'bold',
              padding: '2px 5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <Check size={9} />
          </button>
        )}
      </div>

      {/* SIMPLIFIED UI: Focus on one part with artistic icons */}
      {editorMode === 'simplified' ? (
        <div style={{ background: '#121719', border: '1px solid #232d30', borderRadius: '12px', padding: '12px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#edf0ed' }}>
              {selectedPart.name}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={handlePickRandomPart}
                style={{
                  background: '#1d2719',
                  border: '1px solid #41591f',
                  color: '#c9ff3d',
                  borderRadius: '8px',
                  padding: '5px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Random Part"
              >
                <Dices size={13} />
              </button>
              <button
                type="button"
                onClick={handleMutateSelectedPart}
                style={{
                  background: '#2b361d',
                  border: '1px solid #638528',
                  color: '#c9ff3d',
                  borderRadius: '8px',
                  padding: '5px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Tweak Value"
              >
                <Zap size={13} />
              </button>
            </div>
          </div>

          {/* Quick part selector pill buttons with clean icons */}
          <div style={{ display: 'flex', gap: '3px', marginBottom: '10px' }}>
            {[
              { id: 'chassis-plate', Icon: Smartphone, label: 'Plate' },
              { id: 'camera-island', Icon: Camera, label: 'Bump' },
              { id: 'lens-apertures', Icon: Search, label: 'Lens' },
              { id: 'corner-fillets', Icon: Maximize2, label: 'Fillet' },
              { id: 'extrusions', Icon: LayersIcon, label: 'Extrude' }
            ].map(({ id, Icon, label }) => {
              const active = selectedPart.part === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    const partObj = CadParametricPermutator.selectRandomComponentPart();
                    setSelectedPart({
                      ...partObj,
                      part: id as CadComponentPart,
                      name: label
                    });
                  }}
                  title={label}
                  style={{
                    flex: 1,
                    background: active ? '#c9ff3d' : '#0c0f10',
                    color: active ? '#0a0d0e' : '#899193',
                    border: '1px solid #232d30',
                    borderRadius: '4px',
                    fontSize: '9px',
                    padding: '4px 2px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    fontWeight: active ? 'bold' : 'normal'
                  }}
                >
                  <Icon size={12} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Render dedicated control for selected part */}
          {selectedPart.part === 'chassis-plate' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <label style={{ fontSize: '9px', color: '#899193' }}>
                W (mm)
                <input
                  type="number"
                  step="0.5"
                  value={params.coverWidthMm}
                  onChange={e => update('coverWidthMm', parseFloat(e.target.value) || 75)}
                  style={{ width: '100%', background: '#0b0e0f', border: '1px solid #334044', color: '#c9ff3d', padding: '5px', borderRadius: '3px', font: '10px DM Mono, monospace' }}
                />
              </label>
              <label style={{ fontSize: '9px', color: '#899193' }}>
                H (mm)
                <input
                  type="number"
                  step="0.5"
                  value={params.coverHeightMm}
                  onChange={e => update('coverHeightMm', parseFloat(e.target.value) || 170)}
                  style={{ width: '100%', background: '#0b0e0f', border: '1px solid #334044', color: '#c9ff3d', padding: '5px', borderRadius: '3px', font: '10px DM Mono, monospace' }}
                />
              </label>
            </div>
          )}

          {selectedPart.part === 'camera-island' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <label style={{ fontSize: '9px', color: '#899193' }}>
                W (mm)
                <input
                  type="number"
                  step="0.5"
                  value={params.bumpWidthMm}
                  onChange={e => update('bumpWidthMm', parseFloat(e.target.value) || 65)}
                  style={{ width: '100%', background: '#0b0e0f', border: '1px solid #334044', color: '#c9ff3d', padding: '5px', borderRadius: '3px', font: '10px DM Mono, monospace' }}
                />
              </label>
              <label style={{ fontSize: '9px', color: '#899193' }}>
                H (mm)
                <input
                  type="number"
                  step="0.5"
                  value={params.bumpHeightMm}
                  onChange={e => update('bumpHeightMm', parseFloat(e.target.value) || 45)}
                  style={{ width: '100%', background: '#0b0e0f', border: '1px solid #334044', color: '#c9ff3d', padding: '5px', borderRadius: '3px', font: '10px DM Mono, monospace' }}
                />
              </label>
            </div>
          )}

          {selectedPart.part === 'lens-apertures' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <label style={{ fontSize: '9px', color: '#899193' }}>
                W (mm)
                <input
                  type="number"
                  step="0.5"
                  value={params.cameraOpeningWidthMm}
                  onChange={e => update('cameraOpeningWidthMm', parseFloat(e.target.value) || 30)}
                  style={{ width: '100%', background: '#0b0e0f', border: '1px solid #334044', color: '#c9ff3d', padding: '5px', borderRadius: '3px', font: '10px DM Mono, monospace' }}
                />
              </label>
              <label style={{ fontSize: '9px', color: '#899193' }}>
                H (mm)
                <input
                  type="number"
                  step="0.5"
                  value={params.cameraOpeningHeightMm}
                  onChange={e => update('cameraOpeningHeightMm', parseFloat(e.target.value) || 36)}
                  style={{ width: '100%', background: '#0b0e0f', border: '1px solid #334044', color: '#c9ff3d', padding: '5px', borderRadius: '3px', font: '10px DM Mono, monospace' }}
                />
              </label>
            </div>
          )}

          {selectedPart.part === 'corner-fillets' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <label style={{ fontSize: '10px', color: '#899193', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span>Body Edge (mm)</span>
                  <input
                    type="number"
                    step="0.5"
                    value={params.cornerCurvatureMm}
                    onChange={e => update('cornerCurvatureMm', parseFloat(e.target.value) || 8.5)}
                    style={{ width: '100%', background: '#0b0e0f', border: '1px solid #334044', color: '#c9ff3d', padding: '6px 8px', borderRadius: '6px', font: '11px DM Mono, monospace' }}
                  />
                </label>
                <label style={{ fontSize: '10px', color: '#899193', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span>Bump Edge (mm)</span>
                  <input
                    type="number"
                    step="0.5"
                    value={params.bumpCornerRadiusMm}
                    onChange={e => update('bumpCornerRadiusMm', parseFloat(e.target.value) || 6.0)}
                    style={{ width: '100%', background: '#0b0e0f', border: '1px solid #334044', color: '#c9ff3d', padding: '6px 8px', borderRadius: '6px', font: '11px DM Mono, monospace' }}
                  />
                </label>
              </div>

              {/* Edge Curvature Tolerance & Fitment Accuracy Card */}
              <div
                style={{
                  background: '#0d1316',
                  border: '1px solid #253942',
                  borderRadius: '8px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#3ed3ff', fontFamily: 'DM Mono, monospace' }}>
                    EDGE CURVATURE ACCURACY
                  </span>
                  <span style={{ fontSize: '9px', color: '#c9ff3d', fontFamily: 'DM Mono, monospace' }}>
                    ±0.05 mm
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '10px', color: '#899fa6', lineHeight: 1.45 }}>
                  Outer chassis corners follow G2 continuous tangent arcs. Phone chassis tolerance is calibrated for <strong>0.3mm snap-fit offset</strong> to avoid friction scratches while ensuring rigid retention.
                </p>
                <div style={{ display: 'flex', gap: '6px', marginTop: '4px', fontSize: '9px', fontFamily: 'DM Mono, monospace' }}>
                  <span style={{ background: '#172228', padding: '2px 6px', borderRadius: '4px', color: '#7ea4b2' }}>
                    CNC: ±0.02mm
                  </span>
                  <span style={{ background: '#172228', padding: '2px 6px', borderRadius: '4px', color: '#7ea4b2' }}>
                    FDM 3D: ±0.10mm
                  </span>
                  <span style={{ background: '#172228', padding: '2px 6px', borderRadius: '4px', color: '#7ea4b2' }}>
                    SLA/Resin: ±0.05mm
                  </span>
                </div>
              </div>
            </div>
          )}

          {selectedPart.part === 'extrusions' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <label style={{ fontSize: '9px', color: '#899193' }}>
                Plate (mm)
                <input
                  type="number"
                  step="0.1"
                  value={params.coverThicknessMm}
                  onChange={e => update('coverThicknessMm', parseFloat(e.target.value) || 1.8)}
                  style={{ width: '100%', background: '#0b0e0f', border: '1px solid #334044', color: '#c9ff3d', padding: '5px', borderRadius: '3px', font: '10px DM Mono, monospace' }}
                />
              </label>
              <label style={{ fontSize: '9px', color: '#899193' }}>
                Bump (mm)
                <input
                  type="number"
                  step="0.5"
                  value={params.bumpDepthMm}
                  onChange={e => update('bumpDepthMm', parseFloat(e.target.value) || 8.0)}
                  style={{ width: '100%', background: '#0b0e0f', border: '1px solid #334044', color: '#c9ff3d', padding: '5px', borderRadius: '3px', font: '10px DM Mono, monospace' }}
                />
              </label>
            </div>
          )}
        </div>
      ) : (
        /* FULL MODE */
        <>
          <div style={{ marginBottom: '10px', background: '#13191c', padding: '8px', borderRadius: '5px', border: '1px solid #222d32' }}>
            <div style={{ fontSize: '10px', color: '#899193', fontFamily: 'DM Mono, monospace', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Smartphone size={11} /> Plate
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <label style={{ fontSize: '9px', color: '#899193' }}>
                H
                <input
                  type="number"
                  step="0.5"
                  value={params.coverHeightMm}
                  onChange={e => update('coverHeightMm', parseFloat(e.target.value) || 170)}
                  style={{ width: '100%', background: '#0b0e0f', border: '1px solid #334044', color: '#c9ff3d', padding: '4px', borderRadius: '3px', font: '10px DM Mono, monospace' }}
                />
              </label>
              <label style={{ fontSize: '9px', color: '#899193' }}>
                W
                <input
                  type="number"
                  step="0.5"
                  value={params.coverWidthMm}
                  onChange={e => update('coverWidthMm', parseFloat(e.target.value) || 75)}
                  style={{ width: '100%', background: '#0b0e0f', border: '1px solid #334044', color: '#c9ff3d', padding: '4px', borderRadius: '3px', font: '10px DM Mono, monospace' }}
                />
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '10px', background: '#13191c', padding: '8px', borderRadius: '5px', border: '1px solid #222d32' }}>
            <div style={{ fontSize: '10px', color: '#899193', fontFamily: 'DM Mono, monospace', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Camera size={11} /> Bump
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <label style={{ fontSize: '9px', color: '#899193' }}>
                W
                <input
                  type="number"
                  step="0.5"
                  value={params.bumpWidthMm}
                  onChange={e => update('bumpWidthMm', parseFloat(e.target.value) || 65)}
                  style={{ width: '100%', background: '#0b0e0f', border: '1px solid #334044', color: '#c9ff3d', padding: '4px', borderRadius: '3px', font: '10px DM Mono, monospace' }}
                />
              </label>
              <label style={{ fontSize: '9px', color: '#899193' }}>
                H
                <input
                  type="number"
                  step="0.5"
                  value={params.bumpHeightMm}
                  onChange={e => update('bumpHeightMm', parseFloat(e.target.value) || 45)}
                  style={{ width: '100%', background: '#0b0e0f', border: '1px solid #334044', color: '#c9ff3d', padding: '4px', borderRadius: '3px', font: '10px DM Mono, monospace' }}
                />
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
