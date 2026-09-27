import { StrictMode, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { getBlenderState, openInBlender } from './blenderBridge';
import {
  analyzeReferences,
  upscaleAndMeasureReference
} from './referenceAnalysis';
import { inspectReference, uploadReference } from './referenceUploads';
import { WorkflowSidebar, WORKFLOW_STEPS, type StepId } from './features/navigation/WorkflowSidebar';
import { DeviceSearchWorkspace } from './features/device-library/DeviceSearchWorkspace';
import { Design2dWorkspace } from './features/2d-design/Design2dWorkspace';
import { Design3dWorkspace } from './features/3d-design/Design3dWorkspace';
import { ExportWorkspace } from './features/export/ExportWorkspace';
import { AppLauncherOverlay } from './features/launcher/AppLauncherOverlay';
import { useCadStore } from './store/useCadStore';

import '../styles.css';
import './status.css';

function App() {
  const {
    openStep,
    sidebarCollapsed,
    logoAnimating,
    toast,
    blender,
    sending,
    cutoutMode,
    workspaces,
    activeWorkspaceIndex,
    showSettingsModal,
    newWorkspaceName,
    favorites,
    phoneList,
    selectedPhoneId,
    productDesignType,
    backCoverParams,
    references,
    analysis,
    analyzing,
    upscaleData,
    upscaling,
    generated,
    setOpenStep,
    setSidebarCollapsed,
    setLogoAnimating,
    notify,
    setBlender,
    setSending,
    setCutoutMode,
    setProductDesignType,
    setActiveWorkspaceIndex,
    setShowSettingsModal,
    setNewWorkspaceName,
    addWorkspace,
    toggleFavorite,
    selectPhoneModel,
    addCustomPhone,
    setBackCoverParams,
    setReferences,
    setAnalysis,
    setAnalyzing,
    setUpscaleData,
    setUpscaling,
    setGenerated,
    chooseReferences
  } = useCadStore();

  const selectedPhone = phoneList.find((p) => p.id === selectedPhoneId) || phoneList[0];
  const autoMeasureStarted = useRef(false);

  useEffect(() => {
    getBlenderState().then(setBlender);
  }, [openStep, setBlender]);

  const scanReferences = async () => {
    setAnalyzing(true);
    try {
      if (references.length) {
        const inspected = await Promise.all(
          references.map(async (item) => {
            const uploaded = await uploadReference(item.file);
            return { ...item, storedPath: uploaded.path, inspection: await inspectReference(uploaded.path) };
          })
        );
        setReferences(inspected);
        const back = inspected.find((item) => item.inspection?.views.some((view) => view.kind === 'back')) ?? inspected[0];
        setUpscaleData(await upscaleAndMeasureReference(back.storedPath));
      }
      const result = await analyzeReferences();
      setAnalysis(result);
      notify('2D ready');
    } catch {
      notify('Reference scanning failed');
    } finally {
      setAnalyzing(false);
    }
  };

  const runUpscaleAndMeasure = async () => {
    setUpscaling(true);
    try {
      const selected = references.find((item) => item.inspection?.views.some((view) => view.kind === 'back')) ?? references[0];
      const res = await upscaleAndMeasureReference(selected?.storedPath);
      setUpscaleData(res);
      notify('Measured');
    } catch {
      notify('Upscale & feature measurement failed');
    } finally {
      setUpscaling(false);
    }
  };

  useEffect(() => {
    if ((openStep === 'design2d' || openStep === 'design3d') && !upscaleData && !autoMeasureStarted.current) {
      autoMeasureStarted.current = true;
      runUpscaleAndMeasure();
    }
  }, [openStep, upscaleData]);

  const generate = () => {
    setGenerated(true);
    setOpenStep('export');
    notify(`${selectedPhone.model} 3D prototype generated`);
  };

  const exportBlender = async () => {
    setSending(true);
    try {
      await openInBlender(analysis?.geometry);
      setBlender('connected');
      notify('Case opened in Blender');
    } catch {
      setBlender('disconnected');
      notify('Open Blender and enable the CaseForm add-on');
    } finally {
      setSending(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((val) => !val);
    setLogoAnimating(false);
    window.requestAnimationFrame(() => setLogoAnimating(true));
    window.setTimeout(() => setLogoAnimating(false), 720);
  };

  const isComplete = (id: StepId) =>
    id === 'model' ||
    (id === 'design2d' && (!!analysis || !!backCoverParams)) ||
    (id === 'design3d' && generated) ||
    (id === 'export' && generated);

  const activeStep = WORKFLOW_STEPS.find((step) => step.id === openStep);

  return (
    <main className={`app-shell ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <AppLauncherOverlay
        phoneModel={selectedPhone.model}
        params={backCoverParams}
        onEnter={() => notify(`${selectedPhone.model} workspace active`)}
      />
      <WorkflowSidebar
        open={openStep}
        sidebarCollapsed={sidebarCollapsed}
        logoAnimating={logoAnimating}
        onToggleSidebar={toggleSidebar}
        onSelectStep={setOpenStep}
        isComplete={isComplete}
        onOpenSettings={() => setShowSettingsModal(true)}
        activeWorkspaceName={workspaces[activeWorkspaceIndex]}
      />

      <section className="stage">
        <header className="stage-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1>{activeStep?.title}</h1>
            <span
              style={{
                font: '10px "DM Mono", monospace',
                color: '#c9ff3d',
                background: '#192515',
                border: '1px solid #3c5222',
                borderRadius: '5px',
                padding: '3px 8px'
              }}
            >
              {selectedPhone.model.startsWith(selectedPhone.brand) ? selectedPhone.model.replace(/\s*\(.*\)/, '') : `${selectedPhone.brand} ${selectedPhone.model.replace(/\s*\(.*\)/, '')}`}
            </span>
          </div>
          <span className={`status ${generated ? 'done' : ''}`}>
            <i />
            {generated ? 'Ready' : analysis ? '2D' : 'Model'}
          </span>
        </header>

        {openStep === 'model' && (
          <DeviceSearchWorkspace
            references={references}
            onChooseReferences={chooseReferences}
            selectedPhoneId={selectedPhoneId}
            productDesignType={productDesignType}
            onProductDesignTypeChange={setProductDesignType}
            favorites={favorites}
            phoneList={phoneList}
            onSelectPhoneModel={selectPhoneModel}
            onToggleFavorite={toggleFavorite}
            onAddCustomPhone={addCustomPhone}
            onProceedTo2D={() => setOpenStep('design2d')}
          />
        )}

        {openStep === 'design2d' && (
          <Design2dWorkspace
            references={references}
            analysis={analysis}
            upscaleData={upscaleData}
            analyzing={analyzing}
            upscaling={upscaling}
            cutoutMode={cutoutMode}
            onCutoutModeChange={setCutoutMode}
            backCoverParams={backCoverParams}
            onBackCoverParamsChange={setBackCoverParams}
            onScanReferences={scanReferences}
            onRunUpscaleAndMeasure={runUpscaleAndMeasure}
            onApprove2d={() => setOpenStep('design3d')}
          />
        )}

        {openStep === 'design3d' && (
          <Design3dWorkspace
            analysis={analysis}
            upscaleData={upscaleData}
            cutoutMode={cutoutMode}
            backCoverParams={backCoverParams}
            onGenerate={generate}
          />
        )}

        {openStep === 'export' && (
          <ExportWorkspace
            generated={generated}
            blender={blender}
            sending={sending}
            onExportBlender={exportBlender}
          />
        )}
      </section>

      {/* Workspace Management Modal */}
      {showSettingsModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(6px)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 9999
          }}
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            style={{
              background: '#111516',
              border: '1px solid #293032',
              borderRadius: '12px',
              padding: '24px',
              width: 'min(440px, 90vw)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#edf0ed' }}>Workspace Settings</h3>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                style={{ background: 'transparent', border: 0, color: '#899193', cursor: 'pointer', fontSize: '16px' }}
              >
                ✕
              </button>
            </div>

            <div>
              <label style={{ display: 'block', font: '10px "DM Mono", monospace', color: '#899193', marginBottom: '8px' }}>
                ACTIVE WORKSPACE
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {workspaces.map((ws, idx) => (
                  <button
                    key={ws}
                    type="button"
                    onClick={() => {
                      setActiveWorkspaceIndex(idx);
                      notify(`Switched to "${ws}"`);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '10px 12px',
                      background: activeWorkspaceIndex === idx ? '#1c2817' : '#0a0d0e',
                      border: activeWorkspaceIndex === idx ? '1px solid #9fcf24' : '1px solid #232d2f',
                      borderRadius: '6px',
                      color: activeWorkspaceIndex === idx ? '#c9ff3d' : '#cbd5d8',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    {activeWorkspaceIndex === idx ? '● ' : '○ '}
                    {ws}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', font: '10px "DM Mono", monospace', color: '#899193', marginBottom: '6px' }}>
                CREATE NEW WORKSPACE
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="e.g. Broken Cover Custom Fit"
                  value={newWorkspaceName}
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#0a0d0e',
                    border: '1px solid #334035',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    color: '#edf0ed',
                    fontSize: '12px'
                  }}
                />
                <button
                  type="button"
                  onClick={() => addWorkspace(newWorkspaceName)}
                  style={{
                    background: '#c9ff3d',
                    border: 0,
                    borderRadius: '6px',
                    color: '#080a0b',
                    fontWeight: 'bold',
                    padding: '8px 14px',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  Add
                </button>
              </div>
            </div>

            <button
              type="button"
              className="primary"
              onClick={() => setShowSettingsModal(false)}
              style={{ marginTop: '8px', padding: '10px' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {toast && <div className="toast">✓ {toast}</div>}
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
