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
    scss: ['assets/scss/_variables.scss'],
  },

  alias: {
    '@images': '@/static/images',
    '@icons': '@/static/icons',
    '@assets': '@/assets',
    '@components': '@/components',
    '@generics': '@/components/Generics',
    '@layouts': '@/layouts',
    '@pages': '@/pages',
    '@store': '@/store',
    '@middleware': '@/middleware',
  },

  ssr: false,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vee-validate.js',
    '@/plugins/element-ui.js',
    '@/plugins/draggable.js',
    '@/plugins/axios.js',
    '@/plugins/notification.js',
    '@/plugins/format-date.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: '~/components', pathPrefix: false, extensions: ['vue'] },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/eslint-module'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/eslint-module'],

  generate: {
    fallback: true,
  },

  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './keys/private.key')),
      cert: fs.readFileSync(path.resolve(__dirname, './keys/certificate.crt')),
    },
    port: 3000,
    host: '0.0.0.0',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: 'https://localhost:8443/api',
    // baseURL: 'https://localhost:443/api',
    // baseURL: 'https://localhost:8008/api',
    // baseURL: 'https://192.168.1.159:8443/api',
    // baseURL: 'https://192.168.1.64:8443/api',
    // baseURL: 'https://192.168.1.170:443/api',
    // baseURL: 'https://192.168.1.150:8443/api',
    // baseURL: 'https://192.168.1.150:443/api',
    baseURL: 'https://192.168.1.76:443/api',
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

  router: {
    middleware: 'auth',
  },
}
