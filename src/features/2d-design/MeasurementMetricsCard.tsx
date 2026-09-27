import type { ReferenceAnalysis, UpscaleMeasurementResult } from '../../referenceAnalysis';

interface MeasurementMetricsCardProps {
  analysis: ReferenceAnalysis | null;
  upscaleData: UpscaleMeasurementResult | null;
  cutoutMode?: 'open-bump' | 'net-holes';
  onCutoutModeChange?: (mode: 'open-bump' | 'net-holes') => void;
  analyzing: boolean;
  upscaling: boolean;
  onScan: () => void;
  onUpscale: () => void;
  onApprove: () => void;
}

export function MeasurementMetricsCard({
  analysis,
  upscaleData,
  cutoutMode = 'open-bump',
  onCutoutModeChange,
  analyzing,
  upscaling,
  onScan,
  onUpscale,
  onApprove
}: MeasurementMetricsCardProps) {
  const avgCurvature = upscaleData?.cornerCurvature.averageRadiusMm ?? 7.34;
  const cameraIsland = upscaleData?.cameraIsland ?? analysis?.geometry.cameraIsland;

  const holes = upscaleData?.cameraHoles ?? [
    { name: 'Main (108MP)', diameterMm: 6.0, cutoutDiameterMm: 9.7, shrinkageOffsetMm: 3.6 },
    { name: 'Ultra-Wide (12MP)', diameterMm: 6.0, cutoutDiameterMm: 11.5, shrinkageOffsetMm: 3.6 },
    { name: 'Depth (5MP)', diameterMm: 7.0, cutoutDiameterMm: 10.7, shrinkageOffsetMm: 3.4 },
    { name: 'Macro (5MP)', diameterMm: 4.3, cutoutDiameterMm: 10.8, shrinkageOffsetMm: 2.9 },
    { name: 'Flash', diameterMm: 3.6, cutoutDiameterMm: 10.8, shrinkageOffsetMm: 2.8 }
  ];

  const buttons = upscaleData?.buttons ?? [
    { name: 'Volume Rocker', side: 'left', topOffsetMm: 27.5, lengthMm: 20 },
    { name: 'Side Key (Power)', side: 'left', topOffsetMm: 57.0, lengthMm: 10 }
  ];

  return (
    <aside className="metrics-card">
      <div className="card-head">
        <div>
          <h3>Measurements</h3>
        </div>
      </div>

      <dl className="metrics-grid">
        <div>
          <dt>Phone dimensions</dt>
          <dd>76.1 × 163.7 × 7.6 mm</dd>
        </div>
        <div>
          <dt>Corner curvature</dt>
          <dd>R {avgCurvature} mm</dd>
        </div>
        <div>
          <dt>Camera island</dt>
          <dd>{cameraIsland ? `${cameraIsland.widthMm} × ${cameraIsland.heightMm}` : '32.8 × 46.2'} mm</dd>
        </div>
        <div>
          <dt>Left / top gap</dt>
          <dd>{cameraIsland ? `${cameraIsland.leftMm} / ${cameraIsland.topMm}` : '3.8 / 3.6'} mm</dd>
        </div>
        <div>
          <dt>Camera elevation</dt>
          <dd>{analysis?.geometry.cameraProtrusion.valueMm ?? '—'} mm</dd>
        </div>
      </dl>

      <div className="measurement-subcard">
        {/* Open Bump or Net Holes Switch */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h4>Camera cutout</h4>
          {onCutoutModeChange && (
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                type="button"
                className={`cutout-toggle-btn ${cutoutMode === 'open-bump' ? 'active' : ''}`}
                onClick={() => onCutoutModeChange('open-bump')}
                title="Curved open camera bump window with no internal holes"
              >
                Open Bump
              </button>
              <button
                type="button"
                className={`cutout-toggle-btn ${cutoutMode === 'net-holes' ? 'active' : ''}`}
                onClick={() => onCutoutModeChange('net-holes')}
                title="Individual 3D print lens cutouts"
              >
                Net Holes
              </button>
            </div>
          )}
        </div>

        {cutoutMode === 'open-bump' ? (
          <div className="feature-pill-list">
            <div className="feature-pill">
              <span>Aperture:</span>
              <b>{cameraIsland ? `${cameraIsland.widthMm} × ${cameraIsland.heightMm}` : '32.8 × 46.2'} mm (Open Window)</b>
            </div>
            <div className="feature-pill">
              <span>Corners:</span>
              <b>R {cameraIsland?.cornerRadiusMm ?? 6.2} mm (Curved)</b>
            </div>
            <div className="feature-pill">
              <span>Living Hinge:</span>
              <b>4.2mm slit / 1.8mm bridge (Foldable Net)</b>
            </div>
          </div>
        ) : (
          <div className="feature-pill-list">
            {holes.map(hole => {
              const cutout = hole.cutoutDiameterMm ?? (hole.diameterMm + 3.6);
              return (
                <div className="feature-pill" key={hole.name}>
                  <span>{hole.name}:</span>
                  <b>Ø {cutout} mm <small style={{ fontWeight: 'normal', opacity: 0.7 }}>(lens Ø {hole.diameterMm})</small></b>
                </div>
              );
            })}
          </div>
        )}

        <h4 style={{ marginTop: '10px' }}>Side Buttons (Curved Slots)</h4>
        <div className="feature-pill-list">
          {buttons.map(btn => (
            <div className="feature-pill" key={btn.name}>
              <span>{btn.name}:</span>
              <b>{btn.lengthMm} mm (@ {btn.topOffsetMm} mm, {btn.side})</b>
            </div>
          ))}
        </div>
      </div>

      <button className="upscale-btn" onClick={onUpscale} disabled={upscaling}>
        {upscaling ? 'Measuring…' : 'Clean & measure ⌁'}
      </button>

      <div className={`recognition ${analysis ? 'ready' : ''}`}>
        <strong>
          {analysis ? `${analysis.summary.accepted}/${analysis.summary.total} accepted` : 'Ready'}
        </strong>
        <small>
          {analysis ? analysis.summary.detectedViews.join(' · ') : 'Not scanned'}
        </small>
      </div>

      <button className="primary" onClick={onScan} disabled={analyzing}>
        {analyzing ? 'Scanning images…' : analysis ? 'Scan again' : 'Scan and measure'} <span>⌁</span>
      </button>

      <button className="secondary" disabled={!analysis} onClick={onApprove}>
        Approve 2D and continue →
      </button>
    </aside>
  );
}
