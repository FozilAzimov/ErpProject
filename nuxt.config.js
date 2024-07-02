import path from 'path'
import fs from 'fs'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ERP',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { httpEquiv: 'Set-Cookie', content: 'SameSite=None; Secure' },
      {
        httpEquiv: 'Content-Security-Policy',
        content: 'upgrade-insecure-requests',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@assets/scss/main.scss', '@assets/css/main.css'],

  styleResources: {
    scss: [
      // Makes scss variables and mixins available in every component
      // Do not import here actual styles!
      'assets/scss/_variables.scss',
    ],
  },

  // server: {
  // },

  ssr: false,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vee-validate.js',
    // Custom plugin for getting information about the user's device
    '@/plugins/element-ui.js',
    '@/plugins/drugguble.js',
    '@/plugins/axios.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: '~/components', pathPrefix: false, extensions: ['vue'] },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // '@element-plus/nuxt',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    '@nuxtjs/i18n',
  ],

  generate: {
    fallback: true,
  },

  i18n: {
    locales: [
      {
        code: 'ru',
        iso: 'ru-RU',
        file: 'ru.js',
        title: 'Русский',
        url: 'russia.png',
        alt: 'rus.png',
      },
      {
        code: 'en',
        iso: 'en_cy-US_CY',
        file: 'en.js',
        title: 'English',
        url: 'usa.png',
        alt: 'usa.png',
      },
      {
        code: 'tr',
        iso: 'tr-TR',
        file: 'tr.js',
        title: 'Türkçe',
        url: 'turkey.png',
        alt: 'turkey.png',
      },
      {
        code: 'uz',
        iso: 'uz-UZ',
        file: 'uz.js',
        title: 'O’zbekcha',
        url: 'uzbekistan.png',
        alt: 'uzb.png',
      },
    ],
    defaultLocale: 'ru',
    sortRoutes: true, // set false if adding custom routes https://i18n.nuxtjs.org/options-reference#sortroutes
    langDir: '~/locales/',
    detectBrowserLanguage: {
      alwaysRedirect: false,
      useCookie: true,
      cookieKey: 'lang',
      useLocalStorage: true,
    },
    strategy: 'no_prefix',
  },

  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './keys/private.key')),
      cert: fs.readFileSync(path.resolve(__dirname, './keys/certificate.crt')),
    },
    // port: 3000,
    // host: '0.0.0.0',
  },

  env: {},

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: 'https://localhost:8443/api',
    // baseURL: 'https://localhost:443/api',
    // baseURL: 'https://localhost:8008/api',
    // baseURL: 'https://192.168.1.159:8443/api',
    // baseURL: 'https://192.168.1.64:8443/api',
    // baseURL: 'https://192.168.1.170:443/api',
    baseURL: 'https://192.168.1.150:443/api',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
