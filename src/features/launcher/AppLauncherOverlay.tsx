import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { LayaCodeAssistant } from './laya_code_assistant';
import type { BackCoverDesignParams } from '../2d-design/cad_cover_types';

interface AppLauncherOverlayProps {
  phoneModel: string;
  params: BackCoverDesignParams;
  onEnter: () => void;
}

export const AppLauncherOverlay: React.FC<AppLauncherOverlayProps> = ({
  phoneModel,
  params,
  onEnter
}) => {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  // Run local Laya System 1 audit without external API / credit costs
  const audit = LayaCodeAssistant.auditCadModel(params);

  const handleDismiss = () => {
    setFadingOut(true);
    setTimeout(() => {
      setVisible(false);
      onEnter();
    }, 350);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(5, 7, 8, 0.88)',
        backdropFilter: 'blur(16px)',
        opacity: fadingOut ? 0 : 1,
        transform: fadingOut ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.38s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Background Animated Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201, 255, 61, 0.15) 0%, rgba(62, 211, 255, 0.05) 50%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          animation: 'pulseGlow 6s ease-in-out infinite'
        }}
      />

      {/* Main Glass Launcher Card */}
      <div
        style={{
          position: 'relative',
          width: 'min(440px, 92vw)',
          background: '#0d1113',
          border: '1px solid #29383c',
          borderRadius: '16px',
          padding: '28px 24px',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(201, 255, 61, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        {/* Top Header with Brand */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: '#192518',
                border: '1px solid #7ea826',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c9ff3d'
              }}
            >
              <Sparkles size={16} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#edf0ed', letterSpacing: '0.08em', fontFamily: 'DM Mono, monospace' }}>
                CASEFORM
              </div>
              <div style={{ fontSize: '9px', color: '#899193', fontFamily: 'DM Mono, monospace' }}>
                PARAMETRIC CAD ENGINE
              </div>
            </div>
          </div>
          <span style={{ fontSize: '10px', color: '#c9ff3d', background: '#141d14', border: '1px solid #4a6b22', borderRadius: '6px', padding: '3px 8px', fontFamily: 'DM Mono, monospace' }}>
            v0.1.0
          </span>
        </div>

        {/* Device Active Status */}
        <div
          style={{
            background: '#121719',
            border: '1px solid #232d30',
            borderRadius: '10px',
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}
        >
          <div style={{ fontSize: '9px', fontFamily: 'DM Mono, monospace', color: '#899193', letterSpacing: '0.08em' }}>
            TARGET WORKSPACE
          </div>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#edf0ed' }}>
            {phoneModel}
          </div>
          <div style={{ fontSize: '11px', color: '#c9ff3d', fontFamily: 'DM Mono, monospace' }}>
            {params.coverWidthMm} × {params.coverHeightMm} × {params.coverThicknessMm} mm (R{params.cornerCurvatureMm})
          </div>
        </div>

        {/* Local Laya System 1 Audit Pill (Zero Token Cost) */}
        <div
          style={{
            background: audit.passed ? '#101712' : '#201414',
            border: `1px solid ${audit.passed ? '#3f6222' : '#6b2828'}`,
            borderRadius: '8px',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {audit.passed ? <ShieldCheck size={14} color="#c9ff3d" /> : <Zap size={14} color="#ff7a7a" />}
            <span style={{ fontSize: '11px', fontFamily: 'DM Mono, monospace', color: audit.passed ? '#c9ff3d' : '#ff9e96' }}>
              LAYA ENGINE: {audit.score}%
            </span>
          </div>
          <span style={{ fontSize: '10px', color: '#899193', fontFamily: 'DM Mono, monospace' }}>
            0 tokens
          </span>
        </div>

        {/* Enter Button */}
        <button
          type="button"
          onClick={handleDismiss}
          style={{
            background: '#c9ff3d',
            border: 0,
            borderRadius: '10px',
            color: '#090d0e',
            fontWeight: 'bold',
            fontSize: '13px',
            padding: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'transform 0.12s ease'
          }}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <span>Launch Workspace</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
          50% { transform: scale(1.15) rotate(180deg); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};
