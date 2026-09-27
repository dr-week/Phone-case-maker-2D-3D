export default defineNuxtConfig({
  compatibilityDate: '2026-09-21',
  devtools: { enabled: false },
  modules: ['@primevue/nuxt-module'],
  primevue: { options: { ripple: true } },
  css: ['~/assets/css/main.css', '~/assets/css/workflow.css'],
  runtimeConfig: { public: { blenderBridgeUrl: 'http://localhost:3000/api/blender-bridge' } },
  typescript: { strict: true, typeCheck: true },
});
