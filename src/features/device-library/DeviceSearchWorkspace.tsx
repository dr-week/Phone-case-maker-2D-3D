import { useState, useMemo } from 'react';
import type { Inspection } from '../../referenceUploads';
import { type PhoneModelRecord } from './phone_database_india';
import { OnlineDeviceSpecService, type CustomDeviceInput } from './online_device_spec_fetcher';
import { CadParametricPermutator } from '../2d-design/cad_random_permutations';
import { Shield, Sparkles, Smartphone, Check, ArrowRight, Dices, Plus, Star, Search, ExternalLink } from 'lucide-react';
import type { ProductDesignType } from '../2d-design/cad_cover_types';

interface DeviceSearchWorkspaceProps {
  references: Array<{ file: File; url: string; inspection?: Inspection }>;
  onChooseReferences: (files: FileList | null) => void;
  selectedPhoneId: string;
  productDesignType?: ProductDesignType;
  onProductDesignTypeChange?: (type: ProductDesignType) => void;
  favorites: string[];
  phoneList: PhoneModelRecord[];
  onSelectPhoneModel: (phone: PhoneModelRecord, designType?: ProductDesignType) => void;
  onToggleFavorite: (phoneId: string) => void;
  onAddCustomPhone: (phone: PhoneModelRecord) => void;
  onProceedTo2D: () => void;
}

export function DeviceSearchWorkspace({
  references,
  onChooseReferences,
  selectedPhoneId,
  productDesignType = 'back-case',
  onProductDesignTypeChange,
  favorites,
  phoneList,
  onSelectPhoneModel,
  onToggleFavorite,
  onAddCustomPhone,
  onProceedTo2D
}: DeviceSearchWorkspaceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'favorites'>('all');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [pendingSelectionPhone, setPendingSelectionPhone] = useState<PhoneModelRecord | null>(null);

  // Custom device form state
  const [customBrand, setCustomBrand] = useState('');
  const [customModel, setCustomModel] = useState('');
  const [customH, setCustomH] = useState<number>(163.0);
  const [customW, setCustomW] = useState<number>(75.0);
  const [customT, setCustomT] = useState<number>(8.0);
  const [customR, setCustomR] = useState<number>(8.0);
  const [customBumpW, setCustomBumpW] = useState<number>(36.0);
  const [customBumpH, setCustomBumpH] = useState<number>(55.0);
  const [customBumpDepth, setCustomBumpDepth] = useState<number>(2.5);

  const favoritePhones = useMemo(() => {
    return phoneList.filter(phone => favorites.includes(phone.id));
  }, [phoneList, favorites]);

  const searchResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const sourceList = filterMode === 'favorites' ? favoritePhones : phoneList;
    if (!q) return sourceList;
    return sourceList.filter(
      phone =>
        phone.model.toLowerCase().includes(q) ||
        phone.brand.toLowerCase().includes(q) ||
        phone.specsSummary.toLowerCase().includes(q)
    );
  }, [searchTerm, filterMode, favoritePhones, phoneList]);

  const activePhone = useMemo(() => {
    return (
      phoneList.find(p => p.id === selectedPhoneId) ||
      phoneList[0]
    );
  }, [phoneList, selectedPhoneId]);

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customBrand.trim() || !customModel.trim()) return;

    const input: CustomDeviceInput = {
      brand: customBrand.trim(),
      model: customModel.trim(),
      heightMm: customH,
      widthMm: customW,
      thicknessMm: customT,
      cornerCurvatureMm: customR,
      bumpWidthMm: customBumpW,
      bumpHeightMm: customBumpH,
      bumpDepthMm: customBumpDepth
    };

    const newRecord = OnlineDeviceSpecService.createCustomDeviceRecord(input);
    onAddCustomPhone(newRecord);
    onSelectPhoneModel(newRecord);
    setShowCustomModal(false);
  };

  return (
    <div className="workspace-page search-page">
      <div className="page-intro" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="kicker" style={{ color: '#c9ff3d', fontSize: '10px', letterSpacing: '0.12em' }}>
              GLOBAL & INDIAN SMARTPHONE DATABASE · BACK PANEL REPLACEMENT WORKSPACES
            </span>
            <h2 style={{ margin: '4px 0 6px', fontSize: '22px' }}>
              Select or Measure Device to Create Dedicated Workspace
            </h2>
            <p style={{ margin: 0, color: '#899193', fontSize: '12px' }}>
              Each selected device automatically spins up a dedicated workspace with verified chassis specs and online back panel replacement data.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => {
                const randomPhone = CadParametricPermutator.generateRandomDeviceRecord();
                onAddCustomPhone(randomPhone);
              }}
              style={{
                background: '#141d20',
                border: '1px solid #33484f',
                borderRadius: '8px',
                color: '#3ed3ff',
                padding: '9px 12px',
                font: 'bold 11px "DM Mono", monospace',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Spawn Random Device"
            >
              <Dices size={14} />
              <span>Random</span>
            </button>

            <button
              type="button"
              onClick={() => setShowCustomModal(true)}
              style={{
                background: '#192816',
                border: '1px solid #9fcf24',
                borderRadius: '8px',
                color: '#c9ff3d',
                padding: '9px 14px',
                font: 'bold 11px "DM Mono", monospace',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Add Custom Device"
            >
              <Plus size={14} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      <div className="page-grid" style={{ gridTemplateColumns: 'minmax(360px, 1.25fr) minmax(300px, 0.75fr)', gap: '20px' }}>
        <section className="page-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Favorites Quick Bar */}
          <div style={{ background: '#080b0c', border: '1px solid #232d2f', borderRadius: '10px', padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ font: '600 10px "DM Mono", monospace', color: '#c9ff3d', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={11} fill="#c9ff3d" /> FAVORITES ({favoritePhones.length})
              </span>
              <button
                type="button"
                onClick={() => setFilterMode(m => (m === 'favorites' ? 'all' : 'favorites'))}
                style={{
                  background: filterMode === 'favorites' ? '#c9ff3d' : '#141c1e',
                  color: filterMode === 'favorites' ? '#0b0e0f' : '#899193',
                  border: '1px solid #334035',
                  borderRadius: '5px',
                  padding: '3px 8px',
                  fontSize: '9px',
                  fontFamily: 'DM Mono, monospace',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Star size={9} /> {filterMode === 'favorites' ? 'Filter: ON' : 'Filter: OFF'}
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {favoritePhones.map(fav => {
                const isSelected = fav.id === activePhone.id;
                return (
                  <button
                    key={fav.id}
                    type="button"
                    onClick={() => setPendingSelectionPhone(fav)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: isSelected ? '#25351a' : '#111718',
                      border: isSelected ? '1px solid #9fcf24' : '1px solid #293436',
                      borderRadius: '6px',
                      padding: '5px 9px',
                      color: isSelected ? '#c9ff3d' : '#cbd5d8',
                      fontSize: '11px',
                      cursor: 'pointer',
                      fontWeight: isSelected ? 'bold' : 'normal'
                    }}
                  >
                    <Star size={10} fill={isSelected ? '#c9ff3d' : 'transparent'} />
                    <span>{fav.model.replace(/\s*\(.*\)/, '')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Box */}
          <div>
            <label className="search-label" htmlFor="model-search" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Search size={11} /> Models ({phoneList.length})
            </label>
            <div className="search-box">
              <span style={{ display: 'flex', alignItems: 'center' }}><Search size={13} /></span>
              <input
                id="model-search"
                type="text"
                placeholder="Search models..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  style={{
                    background: 'transparent',
                    border: 0,
                    color: '#899193',
                    cursor: 'pointer',
                    fontSize: '14px',
                    padding: '0 4px'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Search / Device List */}
          <div
            style={{
              maxHeight: '260px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              paddingRight: '4px'
            }}
          >
            {searchResults.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: '#899193', fontSize: '11px' }}>
                No phone models match &quot;{searchTerm}&quot;
              </div>
            ) : (
              searchResults.map(phone => {
                const isSelected = phone.id === activePhone.id;
                const isFav = favorites.includes(phone.id);
                return (
                  <div
                    key={phone.id}
                    onClick={() => setPendingSelectionPhone(phone)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '24px 1fr auto auto',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      background: isSelected ? '#192016' : '#0d1112',
                      border: isSelected ? '1px solid #9fcf24' : '1px solid #202729',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div
                      style={{
                        width: '16px',
                        height: '28px',
                        border: isSelected ? '2px solid #c9ff3d' : '1.5px solid #4a5658',
                        borderRadius: '3px',
                        background: phone.isCustomDevice ? '#243217' : 'transparent'
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: isSelected ? 'bold' : 'normal', color: '#edf0ed' }}>
                        {phone.model}
                        {phone.isCustomDevice && (
                          <span style={{ marginLeft: '6px', fontSize: '8px', background: '#3b5220', color: '#c9ff3d', padding: '1px 5px', borderRadius: '3px' }}>
                            CUSTOM
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '9px', fontFamily: 'DM Mono, monospace', color: '#899193', marginTop: '2px' }}>
                        {phone.dimensions.heightMm} × {phone.dimensions.widthMm} × {phone.dimensions.thicknessMm} mm · {phone.specsSummary}
                      </div>
                    </div>
                    <button
                      type="button"
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      onClick={e => {
                        e.stopPropagation();
                        onToggleFavorite(phone.id);
                      }}
                      style={{
                        background: 'transparent',
                        border: 0,
                        color: isFav ? '#c9ff3d' : '#455052',
                        fontSize: '16px',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                    >
                      {isFav ? '★' : '☆'}
                    </button>
                    {isSelected && <i style={{ color: '#c9ff3d', fontStyle: 'normal', fontWeight: 'bold' }}>✓</i>}
                  </div>
                );
              })
            )}
          </div>

          {/* Active selection summary & confirm */}
          <div
            style={{
              marginTop: 'auto',
              background: '#141c1e',
              border: '1px solid #2f3e35',
              borderRadius: '8px',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '9px', fontFamily: 'DM Mono, monospace', color: '#c9ff3d' }}>
                    ACTIVE TARGET WORKSPACE
                  </span>
                  <span
                    style={{
                      fontSize: '9px',
                      fontFamily: 'DM Mono, monospace',
                      background: productDesignType === 'back-panel' ? '#122530' : '#223214',
                      color: productDesignType === 'back-panel' ? '#3ed3ff' : '#c9ff3d',
                      border: productDesignType === 'back-panel' ? '1px solid #1f475a' : '1px solid #3f601f',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      fontWeight: 'bold'
                    }}
                  >
                    {productDesignType === 'back-panel' ? 'BACK PANEL' : 'BACK CASE'}
                  </span>
                </div>
                <strong style={{ display: 'block', fontSize: '13px', color: '#ffffff' }}>
                  {activePhone.model}
                </strong>
                <small style={{ fontSize: '10px', color: '#899193', fontFamily: 'DM Mono, monospace' }}>
                  {productDesignType === 'back-panel'
                    ? `Plate: ${activePhone.dimensions.heightMm} × ${activePhone.dimensions.widthMm} × 1.0 mm (Flush, 0 side wrap)`
                    : `Cover: ${activePhone.dimensions.heightMm} × ${activePhone.dimensions.widthMm} mm | Wrap: ${activePhone.dimensions.thicknessMm + 1.6} mm`}
                </small>
              </div>
            </div>

            {/* Quick Switcher Buttons for Active Device */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  onProductDesignTypeChange?.('back-case');
                  onSelectPhoneModel(activePhone, 'back-case');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '7px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: productDesignType === 'back-case' ? 'bold' : 'normal',
                  background: productDesignType === 'back-case' ? '#223214' : '#0c1112',
                  border: productDesignType === 'back-case' ? '1px solid #9fcf24' : '1px solid #232d2f',
                  color: productDesignType === 'back-case' ? '#c9ff3d' : '#899193',
                  cursor: 'pointer'
                }}
              >
                <Shield size={12} />
                <span>Back Case</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onProductDesignTypeChange?.('back-panel');
                  onSelectPhoneModel(activePhone, 'back-panel');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '7px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: productDesignType === 'back-panel' ? 'bold' : 'normal',
                  background: productDesignType === 'back-panel' ? '#122530' : '#0c1112',
                  border: productDesignType === 'back-panel' ? '1px solid #3ed3ff' : '1px solid #232d2f',
                  color: productDesignType === 'back-panel' ? '#3ed3ff' : '#899193',
                  cursor: 'pointer'
                }}
              >
                <Smartphone size={12} />
                <span>Back Panel</span>
              </button>
            </div>

            <button
              type="button"
              className="primary"
              onClick={onProceedTo2D}
              style={{ padding: '10px 14px' }}
            >
              <span>Open Dedicated 2D CAD Workspace ({productDesignType === 'back-panel' ? 'Back Panel' : 'Back Case'})</span>
              <span>→</span>
            </button>
          </div>
        </section>

        {/* Online Back Panel Replacement Intel & Custom Reference */}
        <section className="page-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <span style={{ font: '600 10px "DM Mono", monospace', color: '#c9ff3d', letterSpacing: '0.08em' }}>
              ONLINE BACK PANEL REPLACEMENT SPECS
            </span>
            <p style={{ margin: '4px 0 0', color: '#899193', fontSize: '11px' }}>
              Extracted from manufacturer & Shenzhen supplier disassembly databases.
            </p>
          </div>

          {activePhone.backPanelReplacement ? (
            <div style={{ background: '#0a0e10', border: '1px solid #233136', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: '#899193' }}>Market Availability:</span>
                <b style={{ color: '#c9ff3d' }}>Available Online ✓</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: '#899193' }}>Substrate Material:</span>
                <b style={{ color: '#edf0ed' }}>{activePhone.backPanelReplacement.material}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: '#899193' }}>Estimated Cost:</span>
                <b style={{ color: '#edf0ed' }}>₹{activePhone.backPanelReplacement.marketPriceEstimateInr} INR (~$11 USD)</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: '#899193' }}>Supplier Origin:</span>
                <b style={{ color: '#3ed3ff' }}>{activePhone.backPanelReplacement.supplierOrigin}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: '#899193' }}>Repair Difficulty:</span>
                <b style={{ color: '#ffb84d' }}>{activePhone.backPanelReplacement.difficultyRating}</b>
              </div>
            </div>
          ) : (
            <div style={{ background: '#0a0e10', border: '1px solid #233136', borderRadius: '8px', padding: '12px', color: '#899193', fontSize: '11px' }}>
              Custom back panel: Direct 3D print or CNC manufacture using millimeter CAD drawings.
            </div>
          )}

          <label className="reference-picker large">
            <span>UPLOAD REAL REAR PHOTO</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              onChange={event => onChooseReferences(event.target.files)}
            />
            <b>{references.length ? 'Replace' : 'Upload'}</b>
          </label>

          <div className="image-manager" style={{ flex: 1, minHeight: '120px' }}>
            {references.length ? (
              references.map(item => (
                <figure key={item.url}>
                  <img src={item.url} alt={item.file.name} />
                  <figcaption>
                    <b>{item.file.name}</b>
                    <span>
                      {item.inspection?.views.map(view => view.kind).join(' + ') || 'Selected'}
                    </span>
                  </figcaption>
                </figure>
              ))
            ) : (
              <div className="empty-images" style={{ padding: '16px' }}>
                <b style={{ color: '#899193' }}>No custom photo required</b>
                <span>Using verified chassis & camera bump millimeter parameters</span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Modal: Add Custom Measured Device */}
      {showCustomModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(6px)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 9999
          }}
          onClick={() => setShowCustomModal(false)}
        >
          <form
            onSubmit={handleCreateCustom}
            onClick={e => e.stopPropagation()}
            style={{
              background: '#111516',
              border: '1px solid #293032',
              borderRadius: '12px',
              padding: '24px',
              width: 'min(480px, 92vw)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#edf0ed' }}>
                Add Custom Device & Workspace
              </h3>
              <button
                type="button"
                onClick={() => setShowCustomModal(false)}
                style={{ background: 'transparent', border: 0, color: '#899193', cursor: 'pointer', fontSize: '16px' }}
              >
                ✕
              </button>
            </div>

            <p style={{ margin: 0, fontSize: '11px', color: '#899193' }}>
              Input physical measurements using a caliper or ruler to generate a custom 2D/3D fabrication workspace.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <label style={{ fontSize: '10px', color: '#899193' }}>
                Brand
                <input
                  type="text"
                  required
                  placeholder="e.g. Motorola / Poco"
                  value={customBrand}
                  onChange={e => setCustomBrand(e.target.value)}
                  style={{ width: '100%', background: '#090d0e', border: '1px solid #334044', color: '#c9ff3d', padding: '6px', borderRadius: '5px' }}
                />
              </label>
              <label style={{ fontSize: '10px', color: '#899193' }}>
                Model Name
                <input
                  type="text"
                  required
                  placeholder="e.g. Edge 40 Neo"
                  value={customModel}
                  onChange={e => setCustomModel(e.target.value)}
                  style={{ width: '100%', background: '#090d0e', border: '1px solid #334044', color: '#c9ff3d', padding: '6px', borderRadius: '5px' }}
                />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <label style={{ fontSize: '10px', color: '#899193' }}>
                Height (mm)
                <input
                  type="number"
                  step="0.1"
                  required
                  value={customH}
                  onChange={e => setCustomH(parseFloat(e.target.value) || 160)}
                  style={{ width: '100%', background: '#090d0e', border: '1px solid #334044', color: '#c9ff3d', padding: '6px', borderRadius: '5px' }}
                />
              </label>
              <label style={{ fontSize: '10px', color: '#899193' }}>
                Width (mm)
                <input
                  type="number"
                  step="0.1"
                  required
                  value={customW}
                  onChange={e => setCustomW(parseFloat(e.target.value) || 75)}
                  style={{ width: '100%', background: '#090d0e', border: '1px solid #334044', color: '#c9ff3d', padding: '6px', borderRadius: '5px' }}
                />
              </label>
              <label style={{ fontSize: '10px', color: '#899193' }}>
                Thickness (mm)
                <input
                  type="number"
                  step="0.1"
                  required
                  value={customT}
                  onChange={e => setCustomT(parseFloat(e.target.value) || 8)}
                  style={{ width: '100%', background: '#090d0e', border: '1px solid #334044', color: '#c9ff3d', padding: '6px', borderRadius: '5px' }}
                />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <label style={{ fontSize: '10px', color: '#899193' }}>
                Bump W (mm)
                <input
                  type="number"
                  step="0.5"
                  value={customBumpW}
                  onChange={e => setCustomBumpW(parseFloat(e.target.value) || 35)}
                  style={{ width: '100%', background: '#090d0e', border: '1px solid #334044', color: '#c9ff3d', padding: '6px', borderRadius: '5px' }}
                />
              </label>
              <label style={{ fontSize: '10px', color: '#899193' }}>
                Bump H (mm)
                <input
                  type="number"
                  step="0.5"
                  value={customBumpH}
                  onChange={e => setCustomBumpH(parseFloat(e.target.value) || 50)}
                  style={{ width: '100%', background: '#090d0e', border: '1px solid #334044', color: '#c9ff3d', padding: '6px', borderRadius: '5px' }}
                />
              </label>
              <label style={{ fontSize: '10px', color: '#899193' }}>
                Bump Depth (mm)
                <input
                  type="number"
                  step="0.1"
                  value={customBumpDepth}
                  onChange={e => setCustomBumpDepth(parseFloat(e.target.value) || 2.5)}
                  style={{ width: '100%', background: '#090d0e', border: '1px solid #334044', color: '#c9ff3d', padding: '6px', borderRadius: '5px' }}
                />
              </label>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                type="button"
                className="secondary"
                onClick={() => setShowCustomModal(false)}
                style={{ flex: 1, padding: '10px' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="primary"
                style={{ flex: 1, padding: '10px' }}
              >
                <span>Create Workspace</span>
                <span>→</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Design Intent Selector (Back Case vs Back Panel) */}
      {pendingSelectionPhone && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.82)',
            backdropFilter: 'blur(8px)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 10000
          }}
          onClick={() => setPendingSelectionPhone(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0d1214',
              border: '1px solid #28373b',
              borderRadius: '16px',
              padding: '28px',
              width: 'min(580px, 94vw)',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.7)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '10px', color: '#c9ff3d', fontFamily: 'DM Mono, monospace', letterSpacing: '0.12em', fontWeight: 'bold' }}>
                  STEP 01 TARGET SPECIFICATION · {pendingSelectionPhone.brand.toUpperCase()}
                </span>
                <h3 style={{ margin: '4px 0 2px', fontSize: '20px', color: '#ffffff' }}>
                  {pendingSelectionPhone.model}
                </h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#899193' }}>
                  Select your design approach. Are you building a full protective snap-on case or a replacement backplate?
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPendingSelectionPhone(null)}
                style={{
                  background: 'transparent',
                  border: 0,
                  color: '#899193',
                  cursor: 'pointer',
                  fontSize: '18px',
                  padding: '4px'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {/* Option 1: Back Case */}
              <div
                onClick={() => {
                  const phone = pendingSelectionPhone;
                  setPendingSelectionPhone(null);
                  onProductDesignTypeChange?.('back-case');
                  onSelectPhoneModel(phone, 'back-case');
                }}
                style={{
                  background: productDesignType === 'back-case' ? '#182416' : '#111719',
                  border: productDesignType === 'back-case' ? '2px solid #9fcf24' : '1px solid #233136',
                  borderRadius: '12px',
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: '#243818',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#c9ff3d'
                    }}
                  >
                    <Shield size={20} />
                  </div>
                  <span
                    style={{
                      fontSize: '9px',
                      fontFamily: 'DM Mono, monospace',
                      background: '#283818',
                      color: '#c9ff3d',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                  >
                    1.8mm WALLS
                  </span>
                </div>

                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '15px', color: '#ffffff' }}>Back Case</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: '#97a2a4', lineHeight: '1.4' }}>
                    Protective shell with perimeter side rims, button passthroughs, corner bumpers, and screen lip overhang.
                  </p>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #243236', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '10px', fontFamily: 'DM Mono, monospace', color: '#899193' }}>
                  <div>• Side Wall Wrap: {pendingSelectionPhone.dimensions.thicknessMm + 1.6}mm</div>
                  <div>• Button Slots: Enabled (Volume / Power)</div>
                  <div>• Lip Retention: +0.85mm</div>
                </div>

                <button
                  type="button"
                  className="primary"
                  style={{ marginTop: '8px', width: '100%', padding: '8px', fontSize: '12px' }}
                >
                  <span>Select Back Case</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              {/* Option 2: Back Panel */}
              <div
                onClick={() => {
                  const phone = pendingSelectionPhone;
                  setPendingSelectionPhone(null);
                  onProductDesignTypeChange?.('back-panel');
                  onSelectPhoneModel(phone, 'back-panel');
                }}
                style={{
                  background: productDesignType === 'back-panel' ? '#11222c' : '#111719',
                  border: productDesignType === 'back-panel' ? '2px solid #3ed3ff' : '1px solid #233136',
                  borderRadius: '12px',
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: '#163544',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#3ed3ff'
                    }}
                  >
                    <Smartphone size={20} />
                  </div>
                  <span
                    style={{
                      fontSize: '9px',
                      fontFamily: 'DM Mono, monospace',
                      background: '#163544',
                      color: '#3ed3ff',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                  >
                    1.0mm FLUSH
                  </span>
                </div>

                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '15px', color: '#ffffff' }}>Back Panel</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: '#97a2a4', lineHeight: '1.4' }}>
                    Flush replacement chassis glass/plate. Zero side rim wrap. Mounts with adhesive gasket directly to the chassis frame.
                  </p>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #243236', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '10px', fontFamily: 'DM Mono, monospace', color: '#899193' }}>
                  <div>• Side Wall Wrap: 0mm (Flush)</div>
                  <div>• Button Slots: None (Chassis Exposed)</div>
                  <div>• Frame Adhesive Gasket: Active</div>
                </div>

                <button
                  type="button"
                  style={{
                    marginTop: '8px',
                    width: '100%',
                    padding: '8px',
                    fontSize: '12px',
                    background: '#1c3e4e',
                    border: '1px solid #3ed3ff',
                    color: '#3ed3ff',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontWeight: 'bold'
                  }}
                >
                  <span>Select Back Panel</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
