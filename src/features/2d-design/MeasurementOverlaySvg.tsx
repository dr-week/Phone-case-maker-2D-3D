import type { UpscaleMeasurementResult } from '../../referenceAnalysis';

interface MeasurementOverlaySvgProps {
  upscaleData: UpscaleMeasurementResult | null;
  cutoutMode?: 'open-bump' | 'net-holes';
}

export function MeasurementOverlaySvg({
  upscaleData,
  cutoutMode = 'open-bump'
}: MeasurementOverlaySvgProps) {
  const avgRadius = upscaleData?.cornerCurvature.averageRadiusMm ?? 7.34;
  const island = upscaleData?.cameraIsland ?? {
    leftMm: 3.8,
    topMm: 3.6,
    widthMm: 32.8,
    heightMm: 46.2,
    cornerRadiusMm: 6.2
  };
  const holes = upscaleData?.cameraHoles ?? [
    { role: 'main', xMm: 14.4, yMm: 13.8, radiusMm: 3.0, diameterMm: 6.0, cutoutRadiusMm: 4.85, cutoutDiameterMm: 9.7 },
    { role: 'ultrawide', xMm: 14.5, yMm: 27.1, radiusMm: 3.0, diameterMm: 6.0, cutoutRadiusMm: 5.75, cutoutDiameterMm: 11.5 },
    { role: 'depth', xMm: 14.4, yMm: 40.3, radiusMm: 3.5, diameterMm: 7.0, cutoutRadiusMm: 5.35, cutoutDiameterMm: 10.7 },
    { role: 'macro', xMm: 26.3, yMm: 20.5, radiusMm: 2.15, diameterMm: 4.3, cutoutRadiusMm: 5.4, cutoutDiameterMm: 10.8 },
    { role: 'flash', xMm: 26.3, yMm: 33.9, radiusMm: 1.8, diameterMm: 3.6, cutoutRadiusMm: 5.4, cutoutDiameterMm: 10.8 }
  ];

  return (
    <svg className="feature-overlay-svg" viewBox="0 0 76.1 163.7" preserveAspectRatio="none">
      {/* 4 Corner Curvature Arcs */}
      <path d="M 0 7.34 A 7.34 7.34 0 0 1 7.34 0" fill="none" stroke="#c9ff3d" strokeWidth="0.75" strokeDasharray="1.2 1.2" />
      <text x="3.5" y="10" fill="#c9ff3d" fontSize="2.4" fontFamily="monospace">R{avgRadius}</text>

      <path d="M 68.76 0 A 7.34 7.34 0 0 1 76.1 7.34" fill="none" stroke="#c9ff3d" strokeWidth="0.75" strokeDasharray="1.2 1.2" />
      <text x="63.5" y="10" fill="#c9ff3d" fontSize="2.4" fontFamily="monospace">R{avgRadius}</text>

      <path d="M 0 156.36 A 7.34 7.34 0 0 0 7.34 163.7" fill="none" stroke="#c9ff3d" strokeWidth="0.75" strokeDasharray="1.2 1.2" />
      <path d="M 68.76 163.7 A 7.34 7.34 0 0 0 76.1 156.36" fill="none" stroke="#c9ff3d" strokeWidth="0.75" strokeDasharray="1.2 1.2" />

      {/* Living Hinge Fold Slits (Perforated Dashed Fold Lines along All 4 Edges) */}
      <line x1="0" y1="12" x2="0" y2="152" stroke="#c9ff3d" strokeWidth="0.75" strokeDasharray="4.2 1.8" opacity="0.85" />
      <line x1="76.1" y1="12" x2="76.1" y2="152" stroke="#c9ff3d" strokeWidth="0.75" strokeDasharray="4.2 1.8" opacity="0.85" />
      <line x1="12" y1="0" x2="64" y2="0" stroke="#c9ff3d" strokeWidth="0.75" strokeDasharray="4.2 1.8" opacity="0.85" />
      <line x1="12" y1="163.7" x2="64" y2="163.7" stroke="#c9ff3d" strokeWidth="0.75" strokeDasharray="4.2 1.8" opacity="0.85" />

      {/* Camera Section: Open Bump Aperture (Curved) OR Individual Net Holes */}
      {cutoutMode === 'open-bump' ? (
        // Open Camera Bump Aperture (No middle holes, completely open curved window)
        <g>
          <rect
            x={island.leftMm}
            y={island.topMm}
            width={island.widthMm}
            height={island.heightMm}
            rx={island.cornerRadiusMm}
            fill="#c9ff3d10"
            stroke="#c9ff3d"
            strokeWidth="0.85"
          />
          <text
            x={island.leftMm + island.widthMm / 2}
            y={island.topMm + island.heightMm + 3.2}
            textAnchor="middle"
            fill="#c9ff3d"
            fontSize="2.1"
            fontWeight="bold"
            fontFamily="monospace"
          >
            Open Bump {island.widthMm}×{island.heightMm}mm (Curved)
          </text>
        </g>
      ) : (
        // Individual Net Holes
        <g>
          <rect
            x={island.leftMm}
            y={island.topMm}
            width={island.widthMm}
            height={island.heightMm}
            rx={island.cornerRadiusMm}
            fill="none"
            stroke="#88b520"
            strokeWidth="0.5"
            strokeDasharray="1.5 1.5"
          />
          {holes.map(hole => {
            const cutoutRad = hole.cutoutRadiusMm ?? (hole.radiusMm + 1.8);
            const cutoutDia = hole.cutoutDiameterMm ?? (hole.diameterMm + 3.6);
            return (
              <g key={hole.role}>
                {/* Physical lens reference */}
                <circle cx={hole.xMm} cy={hole.yMm} r={hole.radiusMm} fill="none" stroke="#88b520" strokeWidth="0.4" strokeDasharray="0.8 0.8" />
                {/* Enlarged 3D print cutout hole */}
                <circle cx={hole.xMm} cy={hole.yMm} r={cutoutRad} fill="#c9ff3d14" stroke="#c9ff3d" strokeWidth="0.7" />
                <circle cx={hole.xMm} cy={hole.yMm} r="0.4" fill="#c9ff3d" />
                <text x={hole.xMm + cutoutRad + 0.6} y={hole.yMm + 0.8} fill="#c9ff3d" fontSize="2.1" fontFamily="monospace">
                  Ø{cutoutDia}
                </text>
              </g>
            );
          })}
          <text
            x={island.leftMm + island.widthMm / 2}
            y={island.topMm + island.heightMm + 3.2}
            textAnchor="middle"
            fill="#c9ff3d"
            fontSize="2.0"
            fontFamily="monospace"
          >
            Net Holes ({holes.length} Cutouts)
          </text>
        </g>
      )}

      {/* Side Buttons (Left Rim: CAD-style labels embedded in curved rim pills) */}
      <rect x="0" y="27.5" width="2.2" height="19.5" rx="1.1" fill="#c9ff3d" opacity="0.95" />
      <text x="1.1" y="37.25" textAnchor="middle" fill="#0a0d0e" fontSize="1.5" fontWeight="bold" fontFamily="monospace" transform="rotate(-90, 1.1, 37.25)">VOL 20mm</text>

      <rect x="0" y="57.0" width="2.2" height="10.0" rx="1.1" fill="#c9ff3d" opacity="0.95" />
      <text x="1.1" y="62.0" textAnchor="middle" fill="#0a0d0e" fontSize="1.4" fontWeight="bold" fontFamily="monospace" transform="rotate(-90, 1.1, 62.0)">PWR 10</text>
    </svg>
  );
}
