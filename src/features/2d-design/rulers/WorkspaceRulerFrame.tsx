import React, { useEffect, useState, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Hand } from 'lucide-react';

interface WorkspaceRulerFrameProps {
  showRulers: boolean;
  unit?: string;
  zoom?: number;
  pan?: { x: number; y: number };
  onZoomChange?: (newZoom: number) => void;
  onPanChange?: (newPan: { x: number; y: number }) => void;
  onResetView?: () => void;
  children: React.ReactNode;
}

/**
 * WorkspaceRulerFrame
 * 
 * Provides:
 * 1. Edge-anchored Photoshop / After Effects / Canva precision rulers on top & left
 * 2. Infinite Pan & Zoom canvas navigation:
 *    - Mouse wheel to Zoom in / Zoom out smoothly centered at cursor position
 *    - Middle-click drag, or Spacebar + drag, or Pan Tool drag to pan across canvas
 *    - Quick floating zoom control bar (+, -, reset, zoom level %)
 * 3. Dynamic ruler tick scaling coordinated with zoom and pan offsets
 */
export const WorkspaceRulerFrame: React.FC<WorkspaceRulerFrameProps> = ({
  showRulers,
  unit = 'mm',
  zoom = 1,
  pan = { x: 0, y: 0 },
  onZoomChange,
  onPanChange,
  onResetView,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panMode, setPanMode] = useState(false);
  const panStartRef = useRef<{ mouseX: number; mouseY: number; initialPan: { x: number; y: number } } | null>(null);

  // ResizeObserver to track container bounds
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setDimensions({
          width: Math.round(entry.contentRect.width),
          height: Math.round(entry.contentRect.height)
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Listen for Spacebar key to toggle Pan hand cursor (Photoshop convention)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat && (e.target as HTMLElement).tagName !== 'INPUT') {
        setPanMode(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setPanMode(false);
        setIsPanning(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const gutterSize = showRulers ? 22 : 0;
  const canvasW = Math.max(0, dimensions.width - gutterSize);
  const canvasH = Math.max(0, dimensions.height - gutterSize);

  // Mouse wheel zoom centered at pointer (Photoshop / Canva convention)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - gutterSize;
    const mouseY = e.clientY - rect.top - gutterSize;

    // Zoom multiplier
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
    const nextZoom = Math.max(0.3, Math.min(6.0, zoom * zoomFactor));

    if (onZoomChange && onPanChange) {
      // Keep point under cursor stationary
      const nextPanX = mouseX - (mouseX - pan.x) * (nextZoom / zoom);
      const nextPanY = mouseY - (mouseY - pan.y) * (nextZoom / zoom);
      onZoomChange(Math.round(nextZoom * 100) / 100);
      onPanChange({ x: Math.round(nextPanX), y: Math.round(nextPanY) });
    }
  };

  // Pointer move for cursor crosshair & panning
  const handlePointerDown = (e: React.PointerEvent) => {
    // Start pan on middle mouse button (button === 1), or when panMode / hand is active
    if (e.button === 1 || panMode || e.altKey) {
      e.preventDefault();
      setIsPanning(true);
      panStartRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        initialPan: { ...pan }
      };
      (e.target as Element).setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    setCursorPos({
      x: e.clientX - rect.left - gutterSize,
      y: e.clientY - rect.top - gutterSize
    });

    if (isPanning && panStartRef.current && onPanChange) {
      const dx = e.clientX - panStartRef.current.mouseX;
      const dy = e.clientY - panStartRef.current.mouseY;
      onPanChange({
        x: panStartRef.current.initialPan.x + dx,
        y: panStartRef.current.initialPan.y + dy
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isPanning) {
      setIsPanning(false);
      panStartRef.current = null;
      try {
        (e.target as Element).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const handlePointerLeave = () => {
    setCursorPos(null);
    setIsPanning(false);
  };

  // Tick generator: coordinate ticks with zoom and pan
  const effectiveTickStep = zoom >= 2.5 ? 5 : zoom >= 1.2 ? 10 : zoom >= 0.6 ? 20 : 50;
  const tickPx = effectiveTickStep * zoom;
  const xOffset = pan.x % tickPx;
  const yOffset = pan.y % tickPx;
  const xStartVal = Math.floor(-pan.x / (effectiveTickStep * zoom)) * effectiveTickStep;
  const yStartVal = Math.floor(-pan.y / (effectiveTickStep * zoom)) * effectiveTickStep;

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: showRulers ? '22px 1fr' : '1fr',
        gridTemplateRows: showRulers ? '22px 1fr' : '1fr',
        background: '#07090a',
        overflow: 'hidden',
        userSelect: 'none',
        cursor: isPanning ? 'grabbing' : panMode ? 'grab' : 'default'
      }}
    >
      {showRulers && (
        <>
          {/* Top-Left Origin Corner Block */}
          <div
            style={{
              gridColumn: '1 / 2',
              gridRow: '1 / 2',
              background: '#0d1113',
              borderRight: '1px solid #232d30',
              borderBottom: '1px solid #232d30',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              fontFamily: 'DM Mono, monospace',
              color: '#c9ff3d',
              fontWeight: 'bold',
              zIndex: 15
            }}
            title="Origin (0,0) - Unit: Millimeters"
          >
            {unit}
          </div>

          {/* Top Edge Workspace Ruler */}
          <div
            style={{
              gridColumn: '2 / 3',
              gridRow: '1 / 2',
              background: '#0d1113',
              borderBottom: '1px solid #232d30',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 14
            }}
          >
            <svg width={canvasW} height={22} style={{ display: 'block' }}>
              {Array.from({ length: Math.ceil(canvasW / tickPx) + 2 }).map((_, i) => {
                const px = xOffset + i * tickPx;
                const value = xStartVal + i * effectiveTickStep;
                const isMajor = value % (effectiveTickStep * 5) === 0;
                const tickH = isMajor ? 10 : 5;
                if (px < 0 || px > canvasW) return null;
                return (
                  <g key={`x-tick-${i}`}>
                    <line
                      x1={px}
                      y1={22 - tickH}
                      x2={px}
                      y2={22}
                      stroke={isMajor ? '#8da2a9' : '#2a3539'}
                      strokeWidth={isMajor ? 0.8 : 0.5}
                    />
                    {isMajor && (
                      <text
                        x={px + 2}
                        y={10}
                        fill="#7e9198"
                        fontSize="7.5"
                        fontFamily="DM Mono, monospace"
                      >
                        {value}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Cursor Tracking Indicator */}
              {cursorPos && cursorPos.x >= 0 && cursorPos.x <= canvasW && (
                <line
                  x1={cursorPos.x}
                  y1={0}
                  x2={cursorPos.x}
                  y2={22}
                  stroke="#c9ff3d"
                  strokeWidth={1}
                />
              )}
            </svg>
          </div>

          {/* Left Edge Workspace Ruler */}
          <div
            style={{
              gridColumn: '1 / 2',
              gridRow: '2 / 3',
              background: '#0d1113',
              borderRight: '1px solid #232d30',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 14
            }}
          >
            <svg width={22} height={canvasH} style={{ display: 'block' }}>
              {Array.from({ length: Math.ceil(canvasH / tickPx) + 2 }).map((_, i) => {
                const py = yOffset + i * tickPx;
                const value = yStartVal + i * effectiveTickStep;
                const isMajor = value % (effectiveTickStep * 5) === 0;
                const tickW = isMajor ? 10 : 5;
                if (py < 0 || py > canvasH) return null;
                return (
                  <g key={`y-tick-${i}`}>
                    <line
                      x1={22 - tickW}
                      y1={py}
                      x2={22}
                      y2={py}
                      stroke={isMajor ? '#8da2a9' : '#2a3539'}
                      strokeWidth={isMajor ? 0.8 : 0.5}
                    />
                    {isMajor && (
                      <text
                        x={9}
                        y={py - 2}
                        textAnchor="end"
                        fill="#7e9198"
                        fontSize="7"
                        fontFamily="DM Mono, monospace"
                        transform={`rotate(-90, 9, ${py - 2})`}
                      >
                        {value}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Cursor Tracking Indicator */}
              {cursorPos && cursorPos.y >= 0 && cursorPos.y <= canvasH && (
                <line
                  x1={0}
                  y1={cursorPos.y}
                  x2={22}
                  y2={cursorPos.y}
                  stroke="#c9ff3d"
                  strokeWidth={1}
                />
              )}
            </svg>
          </div>
        </>
      )}

      {/* Main CAD Viewport Area with Transform Matrix */}
      <div
        style={{
          gridColumn: showRulers ? '2 / 3' : '1 / 2',
          gridRow: showRulers ? '2 / 3' : '1 / 2',
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            transition: isPanning ? 'none' : 'transform 0.08s ease-out'
          }}
        >
          {children}
        </div>

        {/* Floating Zoom / Pan Toolbar Controls (Photoshop / Canva Style) */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '14px',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: '#0d1214e6',
            border: '1px solid #232d30',
            borderRadius: '8px',
            padding: '4px 6px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
          }}
        >
          <button
            type="button"
            onClick={() => setPanMode(p => !p)}
            title="Pan Hand Tool (Spacebar + Drag)"
            style={{
              background: panMode ? '#1e2918' : 'transparent',
              border: panMode ? '1px solid #4a6b22' : '1px solid transparent',
              color: panMode ? '#c9ff3d' : '#899193',
              borderRadius: '5px',
              padding: '4px 6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Hand size={12} />
          </button>

          <button
            type="button"
            onClick={() => onZoomChange && onZoomChange(Math.max(0.3, Math.round((zoom - 0.15) * 100) / 100))}
            title="Zoom Out"
            style={{
              background: 'transparent',
              border: 0,
              color: '#899193',
              borderRadius: '5px',
              padding: '4px 6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ZoomOut size={12} />
          </button>

          <span
            style={{
              fontSize: '10px',
              fontFamily: 'DM Mono, monospace',
              color: '#c9ff3d',
              minWidth: '40px',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            {Math.round(zoom * 100)}%
          </span>

          <button
            type="button"
            onClick={() => onZoomChange && onZoomChange(Math.min(6.0, Math.round((zoom + 0.15) * 100) / 100))}
            title="Zoom In"
            style={{
              background: 'transparent',
              border: 0,
              color: '#899193',
              borderRadius: '5px',
              padding: '4px 6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ZoomIn size={12} />
          </button>

          <button
            type="button"
            onClick={() => {
              onResetView?.();
            }}
            title="Reset Zoom & Pan (100%)"
            style={{
              background: 'transparent',
              border: '1px solid #232d30',
              color: '#899193',
              borderRadius: '5px',
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
    </div>
  );
};
