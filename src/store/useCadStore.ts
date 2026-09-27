import { create } from 'zustand';
import {
  INDIA_PHONE_DATABASE,
  DEFAULT_FAVORITE_IDS,
  type PhoneModelRecord
} from '../features/device-library/phone_database_india';
import { type BackCoverDesignParams, type ProductDesignType } from '../features/2d-design/cad_cover_types';
import { type StepId } from '../features/navigation/WorkflowSidebar';
import { type BlenderState } from '../blenderBridge';
import { type ReferenceAnalysis, type UpscaleMeasurementResult } from '../referenceAnalysis';
import { type Inspection } from '../referenceUploads';

export interface ReferenceItem {
  file: File;
  url: string;
  storedPath?: string;
  inspection?: Inspection;
}

interface CadState {
  // Navigation & UI
  openStep: StepId;
  sidebarCollapsed: boolean;
  logoAnimating: boolean;
  toast: string;
  blender: BlenderState;
  sending: boolean;
  cutoutMode: 'open-bump' | 'net-holes';
  productDesignType: ProductDesignType;

  // Workspaces
  workspaces: string[];
  activeWorkspaceIndex: number;
  showSettingsModal: boolean;
  newWorkspaceName: string;

  // Phone Database & Selection
  favorites: string[];
  phoneList: PhoneModelRecord[];
  selectedPhoneId: string;
  backCoverParams: BackCoverDesignParams;

  // References & Generation
  references: ReferenceItem[];
  analysis: ReferenceAnalysis | null;
  analyzing: boolean;
  upscaleData: UpscaleMeasurementResult | null;
  upscaling: boolean;
  generated: boolean;

  // Actions
  setOpenStep: (step: StepId) => void;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  setLogoAnimating: (animating: boolean) => void;
  setToast: (msg: string) => void;
  notify: (msg: string) => void;
  setBlender: (state: BlenderState) => void;
  setSending: (sending: boolean) => void;
  setCutoutMode: (mode: 'open-bump' | 'net-holes') => void;

  // Workspace actions
  setWorkspaces: (ws: string[] | ((prev: string[]) => string[])) => void;
  setActiveWorkspaceIndex: (idx: number) => void;
  setShowSettingsModal: (show: boolean) => void;
  setNewWorkspaceName: (name: string) => void;
  addWorkspace: (name: string) => void;

  // Phone / Device actions
  toggleFavorite: (phoneId: string) => void;
  selectPhoneModel: (phone: PhoneModelRecord, designType?: ProductDesignType) => void;
  setProductDesignType: (type: ProductDesignType) => void;
  addCustomPhone: (phone: PhoneModelRecord) => void;
  setBackCoverParams: (params: BackCoverDesignParams | ((prev: BackCoverDesignParams) => BackCoverDesignParams)) => void;

  // References actions
  setReferences: (refs: ReferenceItem[]) => void;
  setAnalysis: (analysis: ReferenceAnalysis | null) => void;
  setAnalyzing: (analyzing: boolean) => void;
  setUpscaleData: (data: UpscaleMeasurementResult | null) => void;
  setUpscaling: (upscaling: boolean) => void;
  setGenerated: (gen: boolean) => void;
  chooseReferences: (files: FileList | null) => void;
}

const getInitialFavorites = (): string[] => {
  try {
    const saved = localStorage.getItem('caseform_favorites');
    return saved ? JSON.parse(saved) : DEFAULT_FAVORITE_IDS;
  } catch {
    return DEFAULT_FAVORITE_IDS;
  }
};

const getInitialPhoneList = (): PhoneModelRecord[] => {
  try {
    const saved = localStorage.getItem('caseform_phone_database');
    return saved ? JSON.parse(saved) : INDIA_PHONE_DATABASE;
  } catch {
    return INDIA_PHONE_DATABASE;
  }
};

const initialPhoneList = getInitialPhoneList();
const initialSelected = initialPhoneList.find(p => p.id === 'xiaomi-11i-hypercharge') || initialPhoneList[0];

export const useCadStore = create<CadState>((set, get) => ({
  openStep: 'model',
  sidebarCollapsed: false,
  logoAnimating: false,
  toast: '',
  blender: 'checking',
  sending: false,
  cutoutMode: 'open-bump',
  productDesignType: 'back-case',

  workspaces: [
    'Xiaomi 11i HyperCharge Workspace',
    'Samsung Galaxy A73 Workspace',
    'General Repair / Custom Fabrication'
  ],
  activeWorkspaceIndex: 0,
  showSettingsModal: false,
  newWorkspaceName: '',

  favorites: getInitialFavorites(),
  phoneList: initialPhoneList,
  selectedPhoneId: initialSelected.id,
  backCoverParams: { ...initialSelected.backCoverDefault, designType: 'back-case' },

  references: [],
  analysis: null,
  analyzing: false,
  upscaleData: null,
  upscaling: false,
  generated: false,

  setOpenStep: (openStep) => set({ openStep }),
  setSidebarCollapsed: (collapsed) => set((s) => ({
    sidebarCollapsed: typeof collapsed === 'function' ? collapsed(s.sidebarCollapsed) : collapsed
  })),
  setLogoAnimating: (logoAnimating) => set({ logoAnimating }),
  setToast: (toast) => set({ toast }),
  notify: (msg) => {
    set({ toast: msg });
    window.setTimeout(() => {
      if (get().toast === msg) set({ toast: '' });
    }, 2400);
  },
  setBlender: (blender) => set({ blender }),
  setSending: (sending) => set({ sending }),
  setCutoutMode: (cutoutMode) => set({ cutoutMode }),

  setWorkspaces: (ws) => set((s) => ({
    workspaces: typeof ws === 'function' ? ws(s.workspaces) : ws
  })),
  setActiveWorkspaceIndex: (activeWorkspaceIndex) => set({ activeWorkspaceIndex }),
  setShowSettingsModal: (showSettingsModal) => set({ showSettingsModal }),
  setNewWorkspaceName: (newWorkspaceName) => set({ newWorkspaceName }),
  addWorkspace: (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    set((s) => {
      const next = [...s.workspaces, trimmed];
      return {
        workspaces: next,
        activeWorkspaceIndex: next.length - 1,
        newWorkspaceName: '',
        showSettingsModal: false
      };
    });
    get().notify(`Created workspace: ${trimmed}`);
  },

  toggleFavorite: (phoneId) => {
    set((s) => {
      const next = s.favorites.includes(phoneId)
        ? s.favorites.filter((id) => id !== phoneId)
        : [...s.favorites, phoneId];
      try {
        localStorage.setItem('caseform_favorites', JSON.stringify(next));
      } catch {
        // ignore
      }
      return { favorites: next };
    });
    get().notify('Favorites updated');
  },

  setProductDesignType: (productDesignType) => {
    set((s) => {
      const isPanel = productDesignType === 'back-panel';
      const updatedParams: BackCoverDesignParams = {
        ...s.backCoverParams,
        designType: productDesignType,
        coverThicknessMm: isPanel ? 1.0 : 1.8,
        bumpDepthMm: isPanel ? 1.2 : 6.0,
        bumpWallThicknessMm: isPanel ? 1.2 : 1.8
      };
      return { productDesignType, backCoverParams: updatedParams };
    });
    get().notify(`Switched design target: ${productDesignType === 'back-panel' ? 'Back Panel (Flush Plate)' : 'Back Case (Protective Shell)'}`);
  },

  selectPhoneModel: (phone, designType) => {
    const currentDesign = designType || get().productDesignType || 'back-case';
    const isPanel = currentDesign === 'back-panel';
    const targetParams: BackCoverDesignParams = {
      ...phone.backCoverDefault,
      designType: currentDesign,
      coverThicknessMm: isPanel ? 1.0 : (phone.backCoverDefault.coverThicknessMm || 1.8),
      bumpDepthMm: isPanel ? 1.2 : (phone.backCoverDefault.bumpDepthMm || 6.0),
      bumpWallThicknessMm: isPanel ? 1.2 : (phone.backCoverDefault.bumpWallThicknessMm || 1.8)
    };

    set({
      selectedPhoneId: phone.id,
      productDesignType: currentDesign,
      backCoverParams: targetParams
    });
    const typeLabel = isPanel ? 'Back Panel' : 'Back Case';
    const wsName = `${phone.brand} ${phone.model.replace(/\s*\(.*\)/, '')} [${typeLabel}] Workspace`;
    set((s) => {
      if (s.workspaces.includes(wsName)) {
        return { activeWorkspaceIndex: s.workspaces.indexOf(wsName) };
      }
      const nextWs = [...s.workspaces, wsName];
      return { workspaces: nextWs, activeWorkspaceIndex: nextWs.length - 1 };
    });
    get().notify(`Configured ${typeLabel} for ${phone.model}`);
  },

  addCustomPhone: (phone) => {
    set((s) => {
      const next = [phone, ...s.phoneList];
      try {
        localStorage.setItem('caseform_phone_database', JSON.stringify(next));
      } catch {
        // ignore
      }
      return { phoneList: next };
    });
    get().selectPhoneModel(phone);
    get().notify(`Created custom device workspace for ${phone.model}`);
  },

  setBackCoverParams: (params) => set((s) => ({
    backCoverParams: typeof params === 'function' ? params(s.backCoverParams) : params
  })),

  setReferences: (references) => set({ references }),
  setAnalysis: (analysis) => set({ analysis }),
  setAnalyzing: (analyzing) => set({ analyzing }),
  setUpscaleData: (upscaleData) => set({ upscaleData }),
  setUpscaling: (upscaling) => set({ upscaling }),
  setGenerated: (generated) => set({ generated }),

  chooseReferences: (files) => {
    if (!files) return;
    const current = get().references;
    current.forEach((item) => URL.revokeObjectURL(item.url));
    set({
      references: Array.from(files).slice(0, 8).map((file) => ({
        file,
        url: URL.createObjectURL(file)
      })),
      analysis: null,
      upscaleData: null,
      generated: false
    });
  }
}));
