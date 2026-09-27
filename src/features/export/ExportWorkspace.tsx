import type { BlenderState } from '../../blenderBridge';
import { Share2, Download, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ExportWorkspaceProps {
  generated: boolean;
  blender: BlenderState;
  sending: boolean;
  onExportBlender: () => void;
}

export function ExportWorkspace({
  generated,
  blender,
  sending,
  onExportBlender
}: ExportWorkspaceProps) {
  return (
    <div className="workspace-page export-page">
      <section className="export-panel">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Share2 size={18} color="#c9ff3d" />
          <span>{generated ? 'Ready' : 'Pending'}</span>
        </h2>

        <div className={`export-ready ${blender}`}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {blender === 'connected' ? (
              <CheckCircle2 size={12} color="#c9ff3d" />
            ) : blender === 'checking' ? (
              <Loader2 size={12} className="spin" color="#f0b65b" />
            ) : (
              <AlertCircle size={12} color="#ff7168" />
            )}
            BLENDER · {blender.toUpperCase()}
          </span>
          <strong>{generated ? '3D Case' : 'None'}</strong>
          <small>Mesh Export</small>
        </div>

        {blender === 'disconnected' && (
          <a className="addon-link" href="/caseform-blender-addon.zip" download style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Download size={13} />
            <span>Add-on</span>
          </a>
        )}

        <button
          className="primary"
          disabled={!generated || sending}
          onClick={onExportBlender}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
        >
          {sending ? (
            <>
              <Loader2 size={13} className="spin" />
              <span>Sending</span>
            </>
          ) : (
            <>
              <Share2 size={13} />
              <span>Blender</span>
            </>
          )}
        </button>
      </section>
    </div>
  );
}
