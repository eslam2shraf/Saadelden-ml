export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });
    return {
      htmlAttrs: {
        ...i18nHead.htmlAttrs,
      },
      title: "MLDashboard",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/fav-icon.ico" }],
    };
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/styles/index.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/axios.js", "~/plugins/i18n.js", "~/plugins/inject.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/style-resources"],
  styleResources: {
    scss: [
      "@/assets/styles/base/_variables.scss",
      "@/assets/styles/base/_colors.scss",
      "@/assets/styles/sass-utils/_mixins.scss",
      "@/assets/styles/sass-utils/_functions.scss",
      "@/assets/styles/sass-utils/_animations.scss",
    ],
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/i18n",
    ["cookie-universal-nuxt", { path: "/" }],
  ],
  i18n: {
    locales: [
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en.js",
        dir: "ltr",
      },
      {
        code: "ar",
        iso: "ar-AR",
        name: "Arabic",
        file: "ar.js",
        dir: "rtl",
      },
    ],
    seo: true,
    lazy: true,
    langDir: "lang/",
    strategy: "prefix_and_default",
    defaultLocale: "en",
    vueI18n: {
      fallbackLocale: "en",
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "https://www.analytics.atwdemo.com/api",
  },
  env: {
    // VUE_APP_BASE_URL: process.env.VUE_APP_BASE_URL || 'https://admin.luxgems.co/api/'
    VUE_APP_BASE_URL:
      process.env.VUE_APP_BASE_URL || "https://www.analytics.atwdemo.com/api",
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    port: 2025, // default: 3000
  },
  loading: "~/components/layouts/LoadingSpinner.vue",
};
