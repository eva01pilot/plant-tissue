// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 8000
  },
  runtimeConfig: {
    public: {
      TRPC_DOMAIN: "https://api.ilyadev.com/trpc",
    },
  },
  modules: ['nuxt-primevue', '@pinia/nuxt'],
  css: ['primeicons/primeicons.css', 'primevue/resources/themes/aura-light-green/theme.css'],
  primevue: {
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',

  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
