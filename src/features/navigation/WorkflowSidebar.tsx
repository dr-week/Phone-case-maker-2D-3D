import type { ReactNode } from 'react';
import { Smartphone, Compass, Box, Share2, Settings, ArrowRight, Check } from 'lucide-react';

export type StepId = 'model' | 'design2d' | 'design3d' | 'export';

export interface WorkflowStep {
  id: StepId;
  n: string;
  title: string;
  Icon: React.ElementType;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  { id: 'model', n: '01', title: 'Device', Icon: Smartphone },
  { id: 'design2d', n: '02', title: 'CAD', Icon: Compass },
  { id: 'design3d', n: '03', title: '3D', Icon: Box },
  { id: 'export', n: '04', title: 'Export', Icon: Share2 }
];

interface WorkflowSidebarProps {
  open: StepId;
  sidebarCollapsed: boolean;
  logoAnimating: boolean;
  onToggleSidebar: () => void;
  onSelectStep: (id: StepId) => void;
  isComplete: (id: StepId) => boolean;
  onOpenSettings?: () => void;
  activeWorkspaceName?: string;
}

export function WorkflowSidebar({
  open,
  sidebarCollapsed,
  logoAnimating,
  onToggleSidebar,
  onSelectStep,
  isComplete,
  onOpenSettings,
  activeWorkspaceName = 'Repair / Back Cover'
}: WorkflowSidebarProps) {
  return (
    <aside className="workflow" aria-label="Case workflow">
      {/* Brand Header */}
      <div className="brand">
        <button
          className={`logo-toggle ${logoAnimating ? 'is-animating' : ''}`}
          onClick={onToggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand' : 'Collapse'}
          aria-expanded={!sidebarCollapsed}
        >
          <span className="pattern-mark">
            <img src="/caseform-mark.svg" alt="" />
          </span>
        </button>
        <span className="brand-name">CASEFORM</span>
      </div>

      {/* Nav Step Cards */}
      <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {WORKFLOW_STEPS.map(step => {
          const StepIcon = step.Icon;
          const isOpen = open === step.id;
          const done = isComplete(step.id);

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(step.id)}
              className={`step-trigger-card ${isOpen ? 'active' : ''}`}
              title={step.title}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '10px',
                background: isOpen ? '#141d14' : '#0c1012',
                border: isOpen ? '1px solid #7ea826' : '1px solid #1e2629',
                color: isOpen ? '#c9ff3d' : '#899193',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              {/* Left icon + number */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: isOpen ? '#1c2817' : '#13191c',
                    border: isOpen ? '1px solid #9fcf24' : '1px solid #232d30',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isOpen ? '#c9ff3d' : '#899193'
                  }}
                >
                  <StepIcon size={15} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'DM Mono, monospace', color: isOpen ? '#c9ff3d' : '#5f696b' }}>
                    {step.n}
                  </span>
                  {done && <Check size={11} color="#c9ff3d" />}
                </div>
              </div>

              {/* Right: Minimal single-word label & arrow indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: isOpen ? 'bold' : '500',
                    color: isOpen ? '#edf0ed' : '#899193',
                    fontFamily: 'DM Mono, monospace'
                  }}
                >
                  {step.title}
                </span>
                <ArrowRight
                  size={12}
                  style={{
                    color: isOpen ? '#c9ff3d' : '#334044',
                    transform: isOpen ? 'translateX(2px)' : 'none',
                    transition: 'transform 0.15s ease'
                  }}
                />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Workspace Footer Option */}
      {!sidebarCollapsed && (
        <div
          style={{
            marginTop: 'auto',
            padding: '12px 14px',
            borderTop: '1px solid #1c2427',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            background: '#090c0d'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', fontFamily: 'DM Mono, monospace', color: '#5f696b', letterSpacing: '0.08em' }}>
              WORKSPACE
            </span>
            <button
              type="button"
              onClick={onOpenSettings}
              title="Settings"
              style={{
                background: 'transparent',
                border: '1px solid #232d30',
                color: '#c9ff3d',
                borderRadius: '4px',
                padding: '3px 6px',
                fontSize: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Settings size={11} />
            </button>
          </div>
          <div
            style={{
              fontSize: '10px',
              color: '#cbd5d8',
              background: '#0f1416',
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid #1e2629',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {activeWorkspaceName}
          </div>
        </div>
      )}
    </aside>
  );
}
