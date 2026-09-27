import React, { useRef, useState, useEffect } from 'react';
import type { BackCoverDesignParams } from './cad_cover_types';
import type { CadLayer, CadViewMode } from './cad_layer_types';

interface InteractiveBackCoverSvgProps {
  params: BackCoverDesignParams;
  onChange: (updated: BackCoverDesignParams) => void;
  showRulers?: boolean;
  layers?: CadLayer[];
  activeLayerId?: string;
  viewMode?: CadViewMode;
}

type DragHandle =
  | 'coverWidth'
  | 'coverHeight'
  | 'coverThickness'
  | 'bumpWidth'
  | 'bumpHeight'
  | 'bumpDepth'
  | 'bumpTopMargin'
  | 'bumpLeftMargin'
  | 'cameraOpeningWidth'
  | 'cameraOpeningHeight'
  | null;

export const InteractiveBackCoverSvg: React.FC<InteractiveBackCoverSvgProps> = ({
  params,
  onChange,
  showRulers = true,
  layers,
  activeLayerId,
  viewMode = 'front'
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeHandle, setActiveHandle] = useState<DragHandle>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; initialParams: BackCoverDesignParams } | null>(null);

  // Helper layer lookups with safe fallbacks
  const getLayer = (id: string) => {
    return layers?.find(l => l.id === id) || {
      visible: true,
      locked: false,
      wireframeOnly: false,
      opacity: 1.0,
      color: '#c9ff3d',
      extrusionMm: 1.8
    };
  };

  const gridLayer = getLayer('layer-grid');
  const chassisLayer = getLayer('layer-chassis-outline');
  const bumpLayer = getLayer('layer-camera-island');
  const aperturesLayer = getLayer('layer-apertures');
  const notchesLayer = getLayer('layer-side-notches');
  const rulersLayer = getLayer('layer-callouts-rulers');

  // SVG coordinate padding for clean centered orthographic draft:
  const padX = 18;
  const padY = 18;
  const totalW = params.coverWidthMm + padX * 2;
  const totalH = params.coverHeightMm + padY * 2;

  const ox = padX;
  const oy = padY;

  const bumpX = ox + params.bumpLeftMarginMm;
  const bumpY = oy + params.bumpTopMarginMm;

  const openingX = bumpX + params.cameraOpeningLeftOffsetMm;
  const openingY = bumpY + params.cameraOpeningTopOffsetMm;

  const closedX = openingX + params.cameraOpeningWidthMm + 3.0;
  const closedW = Math.max(8, bumpX + params.bumpWidthMm - closedX - 3.0);

  // Drag logic
  const handlePointerDown = (handle: DragHandle, e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    setActiveHandle(handle);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      initialParams: { ...params }
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeHandle || !dragStart || !svgRef.current) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const mmPerPixelX = totalW / svgRect.width;
    const mmPerPixelY = totalH / svgRect.height;

    const dx = (e.clientX - dragStart.x) * mmPerPixelX;
    const dy = (e.clientY - dragStart.y) * mmPerPixelY;

    const init = dragStart.initialParams;
    let next = { ...init };

    switch (activeHandle) {
      case 'coverWidth': {
        const val = Math.round((init.coverWidthMm + dx) * 2) / 2;
        next.coverWidthMm = Math.max(50, Math.min(110, val));
        break;
      }
      case 'coverHeight': {
        const val = Math.round((init.coverHeightMm + dy) * 2) / 2;
        next.coverHeightMm = Math.max(100, Math.min(220, val));
        break;
      }
      case 'coverThickness': {
        const val = Math.round((init.coverThicknessMm + dx) * 10) / 10;
        next.coverThicknessMm = Math.max(0.8, Math.min(5.0, val));
        break;
      }
      case 'bumpWidth': {
        const val = Math.round((init.bumpWidthMm + dx) * 2) / 2;
        const maxW = next.coverWidthMm - next.bumpLeftMarginMm - 2;
        next.bumpWidthMm = Math.max(25, Math.min(maxW, val));
        break;
      }
      case 'bumpHeight': {
        const val = Math.round((init.bumpHeightMm + dy) * 2) / 2;
        const maxH = next.coverHeightMm - next.bumpTopMarginMm - 20;
        next.bumpHeightMm = Math.max(25, Math.min(maxH, val));
        break;
      }
      case 'bumpDepth': {
        const val = Math.round((init.bumpDepthMm + dx) * 10) / 10;
        next.bumpDepthMm = Math.max(1.0, Math.min(15.0, val));
        break;
      }
      case 'bumpTopMargin': {
        const val = Math.round((init.bumpTopMarginMm + dy) * 2) / 2;
        next.bumpTopMarginMm = Math.max(2, Math.min(40, val));
        break;
      }
      case 'bumpLeftMargin': {
        const val = Math.round((init.bumpLeftMarginMm + dx) * 2) / 2;
        next.bumpLeftMarginMm = Math.max(2, Math.min(20, val));
        break;
      }
      case 'cameraOpeningWidth': {
        const val = Math.round((init.cameraOpeningWidthMm + dx) * 2) / 2;
        const maxW = next.bumpWidthMm - next.cameraOpeningLeftOffsetMm - 4;
        next.cameraOpeningWidthMm = Math.max(15, Math.min(maxW, val));
        break;
      }
      case 'cameraOpeningHeight': {
        const val = Math.round((init.cameraOpeningHeightMm + dy) * 2) / 2;
        const maxH = next.bumpHeightMm - next.cameraOpeningTopOffsetMm - 4;
        next.cameraOpeningHeightMm = Math.max(15, Math.min(maxH, val));
        break;
      }
    }

    onChange(next);
  };

  const handlePointerUp = () => {
    setActiveHandle(null);
    setDragStart(null);
  };

  useEffect(() => {
    const handleGlobalUp = () => {
      setActiveHandle(null);
      setDragStart(null);
    };
    window.addEventListener('pointerup', handleGlobalUp);
    return () => window.removeEventListener('pointerup', handleGlobalUp);
  }, []);

  /* -------------------------------------------------------------
     ORTHOGRAPHIC VIEW RENDERING LOGIC
  ------------------------------------------------------------- */
  return (
    <div
      className="interactive-svg-container"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        position: 'relative',
        userSelect: 'none',
        overflow: 'hidden'
      }}
    >
      <svg
        ref={svgRef}
        viewBox={
          viewMode === 'three-view'
            ? `0 0 ${totalW * 1.55} ${totalH * 1.25}`
            : viewMode === 'side'
            ? `0 0 100 ${totalH}`
            : viewMode === 'top'
            ? `0 0 ${totalW} 70`
            : `0 0 ${totalW} ${totalH}`
        }
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
        onPointerMove={handlePointerMove}
      >
        <defs>
          <pattern id="cadGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#172023" strokeWidth="0.4" />
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#233036" strokeWidth="0.8" />
          </pattern>
          <marker id="arrow" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 6 3 L 0 6 z" fill="#c9ff3d" />
          </marker>
        </defs>

        {/* =========================================================
            MODE 1: FRONT VIEW (Primary Rear Face 2D Draft)
        ========================================================= */}
        {(viewMode === 'front' || viewMode === 'three-view') && (
          <g id="front-ortho-projection">
            {/* Grid Datum */}
            {gridLayer.visible && (
              <g id="layer-grid" opacity={gridLayer.opacity}>
                <rect width={totalW} height={totalH} fill="url(#cadGrid)" />
                <circle cx={ox} cy={oy} r="1.5" fill="none" stroke="#3ed3ff" strokeWidth="0.5" />
                <line x1={ox - 3} y1={oy} x2={ox + 3} y2={oy} stroke="#3ed3ff" strokeWidth="0.4" />
                <line x1={ox} y1={oy - 3} x2={ox} y2={oy + 3} stroke="#3ed3ff" strokeWidth="0.4" />
                <text x={ox + 2} y={oy - 2} fill="#3ed3ff" fontSize="2.5" fontFamily="DM Mono, monospace">
                  (0,0) FRONT DATUM
                </text>
              </g>
            )}

            {/* Chassis Plate */}
            {chassisLayer.visible && (
              <g id="layer-chassis-outline" opacity={chassisLayer.opacity}>
                <rect
                  x={ox}
                  y={oy}
                  width={params.coverWidthMm}
                  height={params.coverHeightMm}
                  rx={params.cornerCurvatureMm}
                  ry={params.cornerCurvatureMm}
                  fill={chassisLayer.wireframeOnly ? 'none' : '#1b2226'}
                  stroke={chassisLayer.color}
                  strokeWidth={activeLayerId === 'layer-chassis-outline' ? '1.8' : '1.2'}
                />
                <line
                  x1={ox + params.coverWidthMm / 2}
                  y1={oy}
                  x2={ox + params.coverWidthMm / 2}
                  y2={oy + params.coverHeightMm}
                  stroke="#2f3d42"
                  strokeWidth="0.4"
                  strokeDasharray="4 4"
                />
                {!chassisLayer.wireframeOnly && (
                  <>
                    <rect
                      x={ox + 2}
                      y={bumpY + params.bumpHeightMm + 4}
                      width={params.coverWidthMm - 4}
                      height={oy + params.coverHeightMm - (bumpY + params.bumpHeightMm + 6)}
                      rx="4"
                      fill="#161c20"
                      stroke="#253035"
                      strokeWidth="0.6"
                    />
                    <text
                      x={ox + params.coverWidthMm / 2}
                      y={oy + params.coverHeightMm - 24}
                      textAnchor="middle"
                      fill="#44545a"
                      fontSize="3.8"
                      fontFamily="DM Mono, monospace"
                      letterSpacing="0.1em"
                    >
                      {params.designType === 'back-panel'
                        ? `FLUSH REPLACEMENT BACKPLATE (${chassisLayer.extrusionMm}mm Z)`
                        : `PROTECTIVE CASE BACKPLATE (${chassisLayer.extrusionMm}mm Z)`}
                    </text>
                  </>
                )}
              </g>
            )}

            {/* Peripheral Notches (Only rendered for Back Cases with side rims) */}
            {notchesLayer.visible && params.designType !== 'back-panel' && (
              <g id="layer-side-notches" opacity={notchesLayer.opacity}>
                <rect
                  x={ox + params.coverWidthMm - 1.5}
                  y={oy + 38}
                  width="2.5"
                  height="30"
                  rx="1.2"
                  fill={notchesLayer.wireframeOnly ? 'none' : '#2d1e0e'}
                  stroke="#ff9800"
                  strokeWidth="0.8"
                />
                <text
                  x={ox + params.coverWidthMm + 2.5}
                  y={oy + 54}
                  fill="#ff9800"
                  fontSize="2.2"
                  fontFamily="DM Mono, monospace"
                  transform={`rotate(90, ${ox + params.coverWidthMm + 2.5}, ${oy + 54})`}
                >
                  KEYS (30mm)
                </text>
                <line
                  x1={ox + params.coverWidthMm / 2 - 12}
                  y1={oy + params.coverHeightMm}
                  x2={ox + params.coverWidthMm / 2 + 12}
                  y2={oy + params.coverHeightMm}
                  stroke="#ff9800"
                  strokeWidth="1.2"
                  strokeDasharray="3 1.5"
                />
              </g>
            )}

            {/* Camera Bump Envelope */}
            {bumpLayer.visible && (
              <g id="layer-camera-island" opacity={bumpLayer.opacity}>
                <rect
                  x={bumpX}
                  y={bumpY}
                  width={params.bumpWidthMm}
                  height={params.bumpHeightMm}
                  rx={params.bumpCornerRadiusMm}
                  fill={bumpLayer.wireframeOnly ? 'none' : '#252f35'}
                  stroke={bumpLayer.color}
                  strokeWidth={activeLayerId === 'layer-camera-island' ? '2.0' : '1.4'}
                />
                <rect
                  x={bumpX + params.bumpWallThicknessMm}
                  y={bumpY + params.bumpWallThicknessMm}
                  width={params.bumpWidthMm - params.bumpWallThicknessMm * 2}
                  height={params.bumpHeightMm - params.bumpWallThicknessMm * 2}
                  rx={Math.max(2, params.bumpCornerRadiusMm - params.bumpWallThicknessMm)}
                  fill="none"
                  stroke="#415359"
                  strokeWidth="0.6"
                  strokeDasharray="2 2"
                />
                {!bumpLayer.wireframeOnly && (
                  <>
                    <rect
                      x={closedX}
                      y={bumpY + 3.5}
                      width={closedW}
                      height={params.bumpHeightMm - 7.0}
                      rx="4"
                      fill="#1d262b"
                      stroke="#36454a"
                      strokeWidth="0.8"
                    />
                    <text
                      x={closedX + closedW / 2}
                      y={bumpY + params.bumpHeightMm / 2}
                      textAnchor="middle"
                      fill="#788b93"
                      fontSize="2.6"
                      fontFamily="DM Mono, monospace"
                    >
                      CLOSED (+{bumpLayer.extrusionMm}mm)
                    </text>
                  </>
                )}
              </g>
            )}

            {/* Apertures */}
            {aperturesLayer.visible && (
              <g id="layer-apertures" opacity={aperturesLayer.opacity}>
                <rect
                  x={openingX - params.cameraOpeningRimMm}
                  y={openingY - params.cameraOpeningRimMm}
                  width={params.cameraOpeningWidthMm + params.cameraOpeningRimMm * 2}
                  height={params.cameraOpeningHeightMm + params.cameraOpeningRimMm * 2}
                  rx={params.cameraOpeningRadiusMm + params.cameraOpeningRimMm}
                  fill="none"
                  stroke="#9acd32"
                  strokeWidth="0.8"
                  strokeDasharray="1.5 1.5"
                />
                <rect
                  x={openingX}
                  y={openingY}
                  width={params.cameraOpeningWidthMm}
                  height={params.cameraOpeningHeightMm}
                  rx={params.cameraOpeningRadiusMm}
                  fill={aperturesLayer.wireframeOnly ? 'none' : '#0c1012'}
                  stroke={aperturesLayer.color}
                  strokeWidth={activeLayerId === 'layer-apertures' ? '1.8' : '1.2'}
                />
                <text
                  x={openingX + params.cameraOpeningWidthMm / 2}
                  y={openingY + params.cameraOpeningHeightMm / 2 + 1.2}
                  textAnchor="middle"
                  fill="#c9ff3d"
                  fontSize="3.0"
                  fontWeight="bold"
                  fontFamily="DM Mono, monospace"
                >
                  CAMERA OPENING
                </text>
                <text
                  x={openingX + params.cameraOpeningWidthMm / 2}
                  y={openingY + params.cameraOpeningHeightMm / 2 + 4.8}
                  textAnchor="middle"
                  fill="#899a77"
                  fontSize="2.2"
                  fontFamily="DM Mono, monospace"
                >
                  {params.cameraOpeningWidthMm} × {params.cameraOpeningHeightMm} mm
                </text>
              </g>
            )}

            {/* Clean CAD Dimension Arrows & Corner Fillet Tolerance Callout */}
            {rulersLayer.visible && showRulers && (
              <g id="layer-callouts-rulers" opacity={rulersLayer.opacity} style={{ pointerEvents: 'none' }}>
                {/* Subtle Width Dimension Line */}
                <line x1={ox} y1={oy - 5} x2={ox + params.coverWidthMm} y2={oy - 5} stroke="#c9ff3d" strokeWidth="0.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
                <rect x={ox + params.coverWidthMm / 2 - 12} y={oy - 9} width="24" height="5.5" rx="2" fill="#0d1113" stroke="#253035" strokeWidth="0.5" />
                <text x={ox + params.coverWidthMm / 2} y={oy - 5.2} textAnchor="middle" fill="#c9ff3d" fontSize="2.8" fontWeight="bold" fontFamily="DM Mono, monospace">
                  W {params.coverWidthMm.toFixed(1)} mm
                </text>

                {/* Subtle Height Dimension Line */}
                <line x1={ox - 5} y1={oy} x2={ox - 5} y2={oy + params.coverHeightMm} stroke="#c9ff3d" strokeWidth="0.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
                <rect x={ox - 10} y={oy + params.coverHeightMm / 2 - 12} width="5.5" height="24" rx="2" fill="#0d1113" stroke="#253035" strokeWidth="0.5" />
                <text
                  x={ox - 7.2}
                  y={oy + params.coverHeightMm / 2}
                  textAnchor="middle"
                  fill="#c9ff3d"
                  fontSize="2.8"
                  fontWeight="bold"
                  fontFamily="DM Mono, monospace"
                  transform={`rotate(-90, ${ox - 7.2}, ${oy + params.coverHeightMm / 2})`}
                >
                  H {params.coverHeightMm.toFixed(1)} mm
                </text>

                {/* Corner Curvature & Accuracy Tolerance Badge (Positioned at Top-Right to prevent camera island collision) */}
                <g id="corner-curvature-callout">
                  <path
                    d={`M ${ox} ${oy + params.cornerCurvatureMm} A ${params.cornerCurvatureMm} ${params.cornerCurvatureMm} 0 0 1 ${ox + params.cornerCurvatureMm} ${oy}`}
                    fill="none"
                    stroke="#3ed3ff"
                    strokeWidth="0.8"
                    strokeDasharray="1.2 1.2"
                  />
                  <circle cx={ox + params.cornerCurvatureMm} cy={oy + params.cornerCurvatureMm} r="0.6" fill="#3ed3ff" />
                  
                  {/* Right-aligned corner info card */}
                  <rect x={ox + params.coverWidthMm - 38} y={oy - 14} width="38" height="9" rx="3" fill="#0d1417" stroke="#25424c" strokeWidth="0.5" />
                  <text x={ox + params.coverWidthMm - 19} y={oy - 10.5} textAnchor="middle" fill="#3ed3ff" fontSize="2.5" fontWeight="bold" fontFamily="DM Mono, monospace">
                    FILLET R {params.cornerCurvatureMm.toFixed(1)} mm
                  </text>
                  <text x={ox + params.coverWidthMm - 19} y={oy - 7} textAnchor="middle" fill="#8da9b3" fontSize="1.8" fontFamily="DM Mono, monospace">
                    TOLERANCE ±0.05 mm
                  </text>
                </g>
              </g>
            )}

            {/* Drag Handles */}
            {chassisLayer.visible && !chassisLayer.locked && (
              <>
                <circle cx={ox + params.coverWidthMm} cy={oy + params.coverHeightMm / 2} r="3.5" fill="#c9ff3d" stroke="#0a0e10" strokeWidth="0.8" style={{ cursor: 'ew-resize' }} onPointerDown={e => handlePointerDown('coverWidth', e)} />
                <circle cx={ox + params.coverWidthMm / 2} cy={oy + params.coverHeightMm} r="3.5" fill="#c9ff3d" stroke="#0a0e10" strokeWidth="0.8" style={{ cursor: 'ns-resize' }} onPointerDown={e => handlePointerDown('coverHeight', e)} />
              </>
            )}
            {bumpLayer.visible && !bumpLayer.locked && (
              <>
                <circle cx={bumpX + params.bumpWidthMm} cy={bumpY + params.bumpHeightMm / 2} r="3.0" fill="#3ed3ff" stroke="#0a0e10" strokeWidth="0.8" style={{ cursor: 'ew-resize' }} onPointerDown={e => handlePointerDown('bumpWidth', e)} />
                <circle cx={bumpX + params.bumpWidthMm / 2} cy={bumpY + params.bumpHeightMm} r="3.0" fill="#3ed3ff" stroke="#0a0e10" strokeWidth="0.8" style={{ cursor: 'ns-resize' }} onPointerDown={e => handlePointerDown('bumpHeight', e)} />
                <circle cx={bumpX + params.bumpWidthMm / 4} cy={bumpY} r="2.8" fill="#3ed3ff" stroke="#0a0e10" strokeWidth="0.8" style={{ cursor: 'ns-resize' }} onPointerDown={e => handlePointerDown('bumpTopMargin', e)} />
              </>
            )}
            {aperturesLayer.visible && !aperturesLayer.locked && (
              <>
                <circle cx={openingX + params.cameraOpeningWidthMm} cy={openingY + params.cameraOpeningHeightMm / 2} r="2.5" fill="#ff9800" stroke="#0a0e10" strokeWidth="0.6" style={{ cursor: 'ew-resize' }} onPointerDown={e => handlePointerDown('cameraOpeningWidth', e)} />
                <circle cx={openingX + params.cameraOpeningWidthMm / 2} cy={openingY + params.cameraOpeningHeightMm} r="2.5" fill="#ff9800" stroke="#0a0e10" strokeWidth="0.6" style={{ cursor: 'ns-resize' }} onPointerDown={e => handlePointerDown('cameraOpeningHeight', e)} />
              </>
            )}
          </g>
        )}

        {/* =========================================================
            MODE 2: SIDE VIEW (Z-Extrusion Cross Section Profile)
        ========================================================= */}
        {(viewMode === 'side' || viewMode === 'three-view') && (
          <g
            id="side-ortho-projection"
            transform={viewMode === 'three-view' ? `translate(${totalW + 12}, 0)` : 'translate(10, 0)'}
          >
            {/* Side Datum Grid & Title */}
            <text x="24" y={oy - 8} fill="#3ed3ff" fontSize="3.2" fontWeight="bold" fontFamily="DM Mono, monospace">
              SIDE PROFILE (EXTRUSION Z)
            </text>

            {/* Base Plate Extrusion Thickness */}
            <rect
              x="20"
              y={oy}
              width={params.coverThicknessMm * 4}
              height={params.coverHeightMm}
              rx="1"
              fill="#1b2226"
              stroke="#899193"
              strokeWidth="0.8"
            />

            {/* Camera Bump Extrusion Stepped Profile */}
            <rect
              x={20 + params.coverThicknessMm * 4}
              y={bumpY}
              width={params.bumpDepthMm * 4}
              height={params.bumpHeightMm}
              rx="1.5"
              fill="#252f35"
              stroke="#3ed3ff"
              strokeWidth="1.0"
            />

            {/* Camera Rim Extrusion Profile */}
            <rect
              x={20 + (params.coverThicknessMm + params.bumpDepthMm) * 4}
              y={openingY}
              width={params.cameraOpeningRimMm * 4}
              height={params.cameraOpeningHeightMm}
              rx="0.8"
              fill="#0c1012"
              stroke="#c9ff3d"
              strokeWidth="0.8"
            />

            {/* Side Callout Dimension lines */}
            <line
              x1="20"
              y1={bumpY + params.bumpHeightMm / 2}
              x2={20 + (params.coverThicknessMm + params.bumpDepthMm) * 4}
              y2={bumpY + params.bumpHeightMm / 2}
              stroke="#c9ff3d"
              strokeWidth="0.5"
              markerStart="url(#arrow)"
              markerEnd="url(#arrow)"
            />
            <text
              x={20 + (params.coverThicknessMm + params.bumpDepthMm) * 2}
              y={bumpY + params.bumpHeightMm / 2 - 3}
              textAnchor="middle"
              fill="#c9ff3d"
              fontSize="2.4"
              fontFamily="DM Mono, monospace"
            >
              Z: {(params.coverThicknessMm + params.bumpDepthMm).toFixed(1)}mm
            </text>

            {/* Draggable Side Depth Handle */}
            <circle
              cx={20 + (params.coverThicknessMm + params.bumpDepthMm) * 4}
              cy={bumpY + params.bumpHeightMm / 2}
              r="2.5"
              fill="#3ed3ff"
              stroke="#000"
              strokeWidth="0.6"
              style={{ cursor: 'ew-resize' }}
              onPointerDown={e => handlePointerDown('bumpDepth', e)}
            />
          </g>
        )}

        {/* =========================================================
            MODE 3: TOP VIEW (Top Rim & Port Clearances)
        ========================================================= */}
        {(viewMode === 'top' || viewMode === 'three-view') && (
          <g
            id="top-ortho-projection"
            transform={viewMode === 'three-view' ? `translate(0, ${totalH + 8})` : 'translate(0, 10)'}
          >
            {/* Top View Title */}
            <text x={ox} y="14" fill="#3ed3ff" fontSize="3.2" fontWeight="bold" fontFamily="DM Mono, monospace">
              TOP VIEW (WIDTH × THICKNESS)
            </text>

            {/* Outer width plate */}
            <rect
              x={ox}
              y="20"
              width={params.coverWidthMm}
              height={params.coverThicknessMm * 4}
              rx="1.5"
              fill="#1b2226"
              stroke="#899193"
              strokeWidth="0.8"
            />

            {/* Stepped Bump profile seen from top */}
            <rect
              x={bumpX}
              y={20 + params.coverThicknessMm * 4}
              width={params.bumpWidthMm}
              height={params.bumpDepthMm * 4}
              rx="1.5"
              fill="#252f35"
              stroke="#3ed3ff"
              strokeWidth="1.0"
            />

            {/* Top Width Dimension callout */}
            <line
              x1={ox}
              y1="38"
              x2={ox + params.coverWidthMm}
              y2="38"
              stroke="#c9ff3d"
              strokeWidth="0.5"
              markerStart="url(#arrow)"
              markerEnd="url(#arrow)"
            />
            <text
              x={ox + params.coverWidthMm / 2}
              y="43"
              textAnchor="middle"
              fill="#c9ff3d"
              fontSize="2.6"
              fontFamily="DM Mono, monospace"
            >
              Width: {params.coverWidthMm}mm
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
