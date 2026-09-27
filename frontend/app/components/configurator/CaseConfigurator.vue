<script setup lang="ts">
import { SUPPORTED_MODELS } from '~/data/models';
import type { CasePayload } from '~/types/case';

const device = ref('A73_5G');
const search = ref('');
const activeSection = ref('model');
const material = ref('PLA');
const tolerances = reactive({ velvetThickness: 0.6, safetyMargin: 0.5, shrinkCompensation: 1.003 });
const slits = reactive({ enabled: true, width: 1.5, reliefRadius: 1.5, depthFromLip: 1 });
const wallThickness = ref(1.2);
const { pushToBlender, isPushing, error } = useBlenderBridge();
const model = computed(() => SUPPORTED_MODELS[device.value]);
const matches = computed(() => Object.entries(SUPPORTED_MODELS).filter(([, item]) => item.name.toLowerCase().includes(search.value.toLowerCase())));
const outer = computed(() => { const d = model.value.dimensions; const lining = tolerances.velvetThickness * 2 + tolerances.safetyMargin; return { width: (d.width + lining + wallThickness.value * 2) * tolerances.shrinkCompensation, height: (d.height + lining + wallThickness.value * 2) * tolerances.shrinkCompensation, depth: (d.depth + lining + wallThickness.value) * tolerances.shrinkCompensation }; });
function selectModel(id: string) { device.value = id; search.value = SUPPORTED_MODELS[id].name; activeSection.value = 'case'; }
function updateTolerance(key: keyof typeof tolerances, value: number) { tolerances[key] = value; }
function updateSlit(key: keyof typeof slits, value: number | boolean) { (slits[key] as typeof value) = value; }
async function sendToBlender() { const payload: CasePayload = { device: device.value, dimensions: model.value.dimensions, tolerances: { ...tolerances }, cornerSlits: { ...slits }, wallThickness: wallThickness.value }; await pushToBlender(payload); }
</script>

<template>
  <section class="builder-layout">
    <aside class="workflow-sidebar">
      <div class="sidebar-heading"><span class="eyebrow">WORKFLOW</span><span class="step-count">01 / 04</span></div>
      <div class="search-box"><i class="pi pi-search"/><input v-model="search" placeholder="Search phone model..." aria-label="Search phone model"/></div>
      <div v-if="search" class="model-results"><button v-for="([id, item]) in matches" :key="id" class="model-result" @click="selectModel(id)">{{ item.name }}<small>{{ item.dimensions.height }} × {{ item.dimensions.width }} mm</small></button><p v-if="!matches.length" class="empty-result">No model found</p></div>
      <div class="workflow-sections">
        <details :open="activeSection === 'model'" @toggle="activeSection = 'model'"><summary><span><b>01</b> Phone model</span><small>{{ model.name.replace('Samsung ', '') }}</small></summary><div class="section-content"><button class="selected-model" @click="selectModel('A73_5G')"><span class="phone-icon">▯</span><span>{{ model.name }}<small>India variant · {{ model.dimensions.height }} × {{ model.dimensions.width }} × {{ model.dimensions.depth }} mm</small></span><i class="pi pi-check"/></button></div></details>
        <details :open="activeSection === 'case'" @toggle="activeSection = 'case'"><summary><span><b>02</b> Create case</span><small>PLA shell</small></summary><div class="section-content"><label>Material</label><div class="material-choice"><span class="material-swatch"/> PLA <small>Rigid · selected</small></div><ToleranceControls :values="tolerances" @update="updateTolerance"/><SlitControls :values="slits" @update="updateSlit"/></div></details>
        <details :open="activeSection === 'review'" @toggle="activeSection = 'review'"><summary><span><b>03</b> Review fit</span><small>{{ outer.height.toFixed(1) }} × {{ outer.width.toFixed(1) }} mm</small></summary><div class="section-content review-copy"><p>Calculated outer size includes velvet lining, PLA safety margin, and wall thickness.</p><strong>{{ outer.height.toFixed(1) }} × {{ outer.width.toFixed(1) }} × {{ outer.depth.toFixed(1) }} mm</strong></div></details>
        <details :open="activeSection === 'export'" @toggle="activeSection = 'export'"><summary><span><b>04</b> Export</span><small>Blender handoff</small></summary><div class="section-content"><Message v-if="error" severity="error" :closable="false">{{ error }}</Message><Button label="Push to Blender" icon="pi pi-send" :loading="isPushing" fluid @click="sendToBlender"/></div></details>
      </div>
    </aside>
    <section class="preview-panel"><div class="preview-header"><div><span class="eyebrow">CASE PREVIEW</span><h2>{{ model.name }}</h2></div><Tag :value="material" severity="success"/></div><div class="case-stage"><div class="case-model"><span class="camera-dot"/><span class="ridge ridge-one"/><span class="ridge ridge-two"/><span class="ridge ridge-three"/></div><div class="dimension dimension-height">{{ outer.height.toFixed(1) }} mm</div><div class="dimension dimension-width">{{ outer.width.toFixed(1) }} mm</div></div><div class="preview-footer"><span><small>PHONE</small><strong>{{ model.dimensions.height }} × {{ model.dimensions.width }} × {{ model.dimensions.depth }} mm</strong></span><span><small>CASE OUTER</small><strong>{{ outer.height.toFixed(1) }} × {{ outer.width.toFixed(1) }} × {{ outer.depth.toFixed(1) }} mm</strong></span><span class="ready"><i/> READY</span></div></section>
  </section>
</template>
