// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "nuxt-primevue", "shadcn-nuxt"],
  primevue: {
    options: {
      unstyled: true,
    },
  },
  shadcn: {
    prefix: "UI",

  },
  vite: {
    server: {
      hmr: {
        protocol: "ws",
        host: "0.0.0.0",
      },
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
  },
  devServer: {
    port: 8000,
  },
  runtimeConfig: {
    public: {
      TRPC_DOMAIN: "https://api.ilyadev.com/trpc",
    },
  },
  ssr: false,
  css: ["assets/css/main.css", "vue-advanced-cropper/dist/style.css"],
});
