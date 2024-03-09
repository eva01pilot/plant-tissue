// https://nuxt.com/docs/api/configuration/nuxt-config
import VueDevTools from 'vite-plugin-vue-devtools'
export default defineNuxtConfig({
  devtools: { enabled: true,  },
  ssr: false,
  alias: {
    "@Components": "./components",
  },
  hooks: {
    "components:dirs": (dirs) => {
      dirs.unshift({
        path: "~/components/ui",
        // this is required else Nuxt will autoImport `.ts` file
        extensions: [".vue"],
        // prefix for your components, eg: UiButton
        prefix: "Ui",
        // prevent adding another prefix component by it's path.
        pathPrefix: false,
      });
    },
  },
  runtimeConfig: {
    public: {
      TRPC_DOMAIN: "https://api.ilyadev.com/trpc",
    },
  },
  vite: {
    plugins:[
      VueDevTools()
    ]
  },
  devServer: {
    port: 8000,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  primevue: {
    options: {
    }
  },
  css: ["~/assets/css/tailwind.css", "primevue/resources/themes/aura-light-green/theme.css"],
  modules: ["@nuxtjs/tailwindcss",  '@pinia/nuxt','nuxt-primevue'],
});
