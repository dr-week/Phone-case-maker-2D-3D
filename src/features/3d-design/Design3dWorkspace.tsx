import type { ReferenceAnalysis, UpscaleMeasurementResult } from '../../referenceAnalysis';
import { ThreeCasePreview } from '../../ThreeCasePreview';
import type { BackCoverDesignParams } from '../2d-design/cad_cover_types';
import { Box, Sparkles, Smartphone, Camera, Layers, Check } from 'lucide-react';

interface Design3dWorkspaceProps {
  analysis: ReferenceAnalysis | null;
  upscaleData?: UpscaleMeasurementResult | null;
  onGenerate: () => void;
  cutoutMode?: 'open-bump' | 'net-holes';
  backCoverParams?: BackCoverDesignParams;
}

export function Design3dWorkspace({
  analysis,
  upscaleData,
  onGenerate,
  cutoutMode = 'open-bump',
  backCoverParams
}: Design3dWorkspaceProps) {
  const phoneW = backCoverParams?.coverWidthMm ?? upscaleData?.dimensions.widthMm ?? analysis?.geometry.body.widthMm ?? 75.0;
  const phoneH = backCoverParams?.coverHeightMm ?? upscaleData?.dimensions.heightMm ?? analysis?.geometry.body.heightMm ?? 170.0;
  const phoneD = backCoverParams?.coverThicknessMm ?? upscaleData?.dimensions.thicknessMm ?? analysis?.geometry.body.thicknessMm ?? 7.6;
  const cornerR = backCoverParams?.cornerCurvatureMm ?? upscaleData?.cornerCurvature.averageRadiusMm ?? 8.5;

  const islandW = backCoverParams?.bumpWidthMm ?? upscaleData?.cameraIsland.widthMm ?? 65.0;
  const islandH = backCoverParams?.bumpHeightMm ?? upscaleData?.cameraIsland.heightMm ?? 45.0;

  const wall = 1.6;
  const clearance = 0.35;
  const caseW = (phoneW + (wall + clearance) * 2).toFixed(1);
  const caseH = (phoneH + (wall + clearance) * 2).toFixed(1);
  const caseD = (phoneD + wall + 0.85).toFixed(1);

  const flatWallH = (phoneD + 1.2).toFixed(1);
  const flatNetW = (phoneW + 0.7 + (phoneD + 1.2) * 2).toFixed(1);
  const flatNetH = (phoneH + 0.7 + (phoneD + 1.2) * 2).toFixed(1);

  return (
    <div className="design3d-page">
      <div className="viewport">
        <div className="view-label" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Box size={12} color="#c9ff3d" />
          <span>3D</span>
        </div>

        <ThreeCasePreview
          analysis={analysis}
          upscaleData={upscaleData}
          backCoverParams={backCoverParams}
          initialCutoutStyle={cutoutMode === 'net-holes' ? 'individual-holes' : 'open-bump'}
        />

        <div className="measurements">
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Smartphone size={10} /> PHONE</span>
          <b>{phoneW} × {phoneH} × {phoneD} mm (R{cornerR})</b>

          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Camera size={10} /> BUMP</span>
          <b>{islandW} × {islandH} mm</b>

          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Box size={10} /> CASE</span>
          <b>{caseW} × {caseH} × {caseD} mm</b>

          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Layers size={10} /> NET</span>
          <b>{flatNetW} × {flatNetH} mm (wall {flatWallH})</b>
        </div>

        <div className="axis">
          <b className="x">X</b>
          <b className="y">Y</b>
          <b className="z">Z</b>
        </div>

        <div className="model-chips">
          <span>APERTURE</span>
          <span>CURVED</span>
          <span>HINGED</span>
          <span>{analysis || upscaleData ? 'APPROVED' : 'LOCKED'}</span>
        </div>
      </div>

      <footer className="stage-foot">
        <div>
          <small>MANUFACTURING</small>
          <strong>Origami Net · Slits · Cutout</strong>
        </div>
        <button
          className="generate-inline"
          disabled={!analysis && !upscaleData}
          onClick={onGenerate}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Sparkles size={13} />
          <span>Prototype</span>
        </button>
      </footer>
    </div>
  );
}
