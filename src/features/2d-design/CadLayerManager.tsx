import React, { useState } from 'react';
import type { CadLayer, CadViewMode } from './cad_layer_types';
import {
  Square,
  Columns,
  Rows,
  Layers,
  Plus,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Box,
  Trash2
} from 'lucide-react';

interface CadLayerManagerProps {
  layers: CadLayer[];
  activeLayerId: string;
  viewMode: CadViewMode;
  onSelectViewMode: (mode: CadViewMode) => void;
  onSelectLayer: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onToggleLock: (id: string) => void;
  onToggleWireframe: (id: string) => void;
  onUpdateExtrusionMm: (id: string, extrusionMm: number) => void;
  onAddLayer: (name: string, extrusionMm: number, color: string) => void;
  onRemoveLayer: (id: string) => void;
  onQuickToggleAll: (visible: boolean) => void;
}

export const CadLayerManager: React.FC<CadLayerManagerProps> = ({
  layers,
  activeLayerId,
  viewMode,
  onSelectViewMode,
  onSelectLayer,
  onToggleVisibility,
  onToggleLock,
  onToggleWireframe,
  onUpdateExtrusionMm,
  onAddLayer,
  onRemoveLayer,
  onQuickToggleAll
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLayerName, setNewLayerName] = useState('');
  const [newLayerExtrusion, setNewLayerExtrusion] = useState<number>(2.0);
  const [newLayerColor, setNewLayerColor] = useState('#e056fd');

  const handleCreateLayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLayerName.trim()) return;
    onAddLayer(newLayerName.trim(), newLayerExtrusion, newLayerColor);
    setNewLayerName('');
    setShowAddForm(false);
  };

  return (
    <div
      className="cad-layer-manager"
      style={{
        background: '#0d1113',
        border: '1px solid #242e31',
        borderRadius: '10px',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      {/* 1. Orthographic View Mode Selector (Front, Side, Top, 3-View) */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '9px', fontFamily: 'DM Mono, monospace', color: '#c9ff3d', letterSpacing: '0.08em' }}>
            PROJECTION VIEWPORT
          </span>
          <span style={{ fontSize: '8px', fontFamily: 'DM Mono, monospace', color: '#899193' }}>
            ISO / 1st-ANGLE
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
          {(
            [
              { id: 'front', label: 'Front', Icon: Square },
              { id: 'side', label: 'Side', Icon: Columns },
              { id: 'top', label: 'Top', Icon: Rows },
              { id: 'three-view', label: '3-View', Icon: Layers }
            ] as const
          ).map(view => {
            const isSelected = viewMode === view.id;
            const ViewIcon = view.Icon;
            return (
              <button
                key={view.id}
                type="button"
                onClick={() => onSelectViewMode(view.id)}
                style={{
                  background: isSelected ? '#1c2817' : '#121719',
                  border: isSelected ? '1px solid #9fcf24' : '1px solid #232d2f',
                  borderRadius: '6px',
                  color: isSelected ? '#c9ff3d' : '#899193',
                  padding: '6px 4px',
                  fontSize: '9px',
                  fontFamily: 'DM Mono, monospace',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '3px',
                  fontWeight: isSelected ? 'bold' : 'normal'
                }}
              >
                <ViewIcon size={13} />
                <span>{view.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Header bar: Title, Count, Add Layer, and Quick batch buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Layers size={13} color="#c9ff3d" />
          <span style={{ font: '600 11px "DM Mono", monospace', color: '#edf0ed', letterSpacing: '0.05em' }}>
            LAYERS
          </span>
          <span style={{ fontSize: '9px', color: '#899193', fontFamily: 'DM Mono, monospace' }}>
            ({layers.filter(l => l.visible).length}/{layers.length})
          </span>
        </div>

        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            type="button"
            title="Add Layer"
            onClick={() => setShowAddForm(v => !v)}
            style={{
              background: '#1a2416',
              border: '1px solid #4a6822',
              borderRadius: '4px',
              color: '#c9ff3d',
              fontSize: '10px',
              padding: '3px 6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <Plus size={11} />
          </button>
          <button
            type="button"
            title="Show all layers"
            onClick={() => onQuickToggleAll(true)}
            style={{
              background: '#161c1e',
              border: '1px solid #334044',
              borderRadius: '4px',
              color: '#cbd5d8',
              fontSize: '10px',
              padding: '2px 6px',
              cursor: 'pointer'
            }}
          >
            All
          </button>
          <button
            type="button"
            title="Isolate / hide optional layers"
            onClick={() => onQuickToggleAll(false)}
            style={{
              background: '#161c1e',
              border: '1px solid #334044',
              borderRadius: '4px',
              color: '#899193',
              fontSize: '10px',
              padding: '2px 6px',
              cursor: 'pointer'
            }}
          >
            Solo
          </button>
        </div>
      </div>

      {/* Optional Form: Add New Layer */}
      {showAddForm && (
        <form
          onSubmit={handleCreateLayer}
          style={{
            background: '#131b1e',
            border: '1px solid #304247',
            borderRadius: '6px',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}
        >
          <div style={{ fontSize: '9px', fontFamily: 'DM Mono, monospace', color: '#c9ff3d' }}>
            CREATE PARAMETRIC 2D LAYER
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <input
              type="text"
              placeholder="e.g. 05_EMBOSSED_LOGO"
              value={newLayerName}
              onChange={e => setNewLayerName(e.target.value)}
              style={{
                flex: 1,
                background: '#090d0e',
                border: '1px solid #29383c',
                color: '#edf0ed',
                fontSize: '10px',
                padding: '4px 6px',
                borderRadius: '4px'
              }}
            />
            <input
              type="color"
              value={newLayerColor}
              onChange={e => setNewLayerColor(e.target.value)}
              style={{
                width: '28px',
                height: '24px',
                background: 'transparent',
                border: 0,
                cursor: 'pointer'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '9px', color: '#899193', fontFamily: 'DM Mono, monospace', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Extrusion Z:
              <input
                type="number"
                step="0.1"
                min="0"
                max="50"
                value={newLayerExtrusion}
                onChange={e => setNewLayerExtrusion(parseFloat(e.target.value) || 0)}
                style={{
                  width: '45px',
                  background: '#090d0e',
                  border: '1px solid #29383c',
                  color: '#c9ff3d',
                  fontSize: '10px',
                  padding: '2px 4px',
                  borderRadius: '3px'
                }}
              />
              mm
            </label>
            <button
              type="submit"
              style={{
                marginLeft: 'auto',
                background: '#c9ff3d',
                border: 0,
                borderRadius: '4px',
                color: '#090c0d',
                fontSize: '9px',
                fontWeight: 'bold',
                padding: '3px 8px',
                cursor: 'pointer'
              }}
            >
              Confirm
            </button>
          </div>
        </form>
      )}

      {/* 3. Layer Stack (Blender Outliner / CAD Tree style) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {layers.map(layer => {
          const isActive = layer.id === activeLayerId;

          return (
            <div
              key={layer.id}
              onClick={() => onSelectLayer(layer.id)}
              style={{
                display: 'grid',
                gridTemplateColumns: '12px auto 1fr auto auto auto auto auto',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 8px',
                borderRadius: '6px',
                background: isActive ? '#192518' : '#121719',
                border: isActive ? '1px solid #9fcf24' : '1px solid #1f272a',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {/* Color swatch */}
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '2px',
                  background: layer.color,
                  opacity: layer.visible ? 1 : 0.25
                }}
              />

              {/* Layer category badge */}
              <span
                style={{
                  font: '500 7px "DM Mono", monospace',
                  padding: '2px 3px',
                  borderRadius: '3px',
                  background: '#1c2428',
                  color: '#899193'
                }}
              >
                {layer.category.slice(0, 3).toUpperCase()}
              </span>

              {/* Layer Name & Description */}
              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                <div
                  style={{
                    fontSize: '10px',
                    fontFamily: 'DM Mono, monospace',
                    fontWeight: isActive ? 600 : 400,
                    color: layer.visible ? '#edf0ed' : '#556266',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
                >
                  {layer.name}
                </div>
              </div>

              {/* Extrusion Level in mm (Variable input control) */}
              <div
                onClick={e => e.stopPropagation()}
                title="Extrusion height in millimeters"
                style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
              >
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="40"
                  value={layer.extrusionMm}
                  disabled={layer.locked}
                  onChange={e => onUpdateExtrusionMm(layer.id, parseFloat(e.target.value) || 0)}
                  style={{
                    width: '38px',
                    background: '#090d0e',
                    border: '1px solid #28373b',
                    color: '#c9ff3d',
                    fontSize: '9px',
                    fontFamily: 'DM Mono, monospace',
                    padding: '2px 3px',
                    borderRadius: '3px',
                    textAlign: 'right'
                  }}
                />
                <span style={{ fontSize: '8px', color: '#687b82', fontFamily: 'DM Mono, monospace' }}>
                  mm
                </span>
              </div>

              {/* Wireframe vs Solid Fill Mode Toggle */}
              <button
                type="button"
                title={layer.wireframeOnly ? 'Solid' : 'Wireframe'}
                onClick={e => {
                  e.stopPropagation();
                  onToggleWireframe(layer.id);
                }}
                style={{
                  background: 'transparent',
                  border: 0,
                  cursor: 'pointer',
                  color: layer.wireframeOnly ? '#3ed3ff' : '#687b82',
                  padding: '2px 3px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box size={11} strokeWidth={layer.wireframeOnly ? 2 : 1} />
              </button>

              {/* Lock / Unlock Toggle */}
              <button
                type="button"
                title={layer.locked ? 'Unlock' : 'Lock'}
                onClick={e => {
                  e.stopPropagation();
                  onToggleLock(layer.id);
                }}
                style={{
                  background: 'transparent',
                  border: 0,
                  cursor: 'pointer',
                  color: layer.locked ? '#f0b65b' : '#687b82',
                  padding: '2px 3px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {layer.locked ? <Lock size={11} /> : <Unlock size={11} />}
              </button>

              {/* Visibility Eye Toggle */}
              <button
                type="button"
                title={layer.visible ? 'Hide' : 'Show'}
                onClick={e => {
                  e.stopPropagation();
                  onToggleVisibility(layer.id);
                }}
                style={{
                  background: 'transparent',
                  border: 0,
                  cursor: 'pointer',
                  color: layer.visible ? '#c9ff3d' : '#455052',
                  padding: '2px 3px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {layer.visible ? <Eye size={12} /> : <EyeOff size={12} />}
              </button>

              {/* Delete Layer button (if removable) */}
              {layer.isRemovable && (
                <button
                  type="button"
                  title="Remove"
                  onClick={e => {
                    e.stopPropagation();
                    onRemoveLayer(layer.id);
                  }}
                  style={{
                    background: 'transparent',
                    border: 0,
                    color: '#803838',
                    cursor: 'pointer',
                    padding: '2px 3px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Trash2 size={11} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
