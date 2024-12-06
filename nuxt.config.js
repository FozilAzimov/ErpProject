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
  css: ['@assets/css/main.css'],

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

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vee-validate.js',
    '@/plugins/element-ui.js',
    '@/plugins/draggable.js',
    '@/plugins/axios.js',
    '@/plugins/notification.js',
    '@/plugins/format-date.js',
    '@/plugins/format-number.js',
    '@/plugins/chart.js',
    '@/plugins/value-utils.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      extensions: ['vue'],
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/eslint-module'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    '@nuxtjs/proxy',
  ],

  ssr: false,

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
    proxy: true,
    prefix: '/api',
    withCredentials: true,
  },

  proxy: {
    '/api': {
      target: 'https://192.168.1.150:443',
      changeOrigin: true, // Origin o'zgartirish
      secure: false, // SSL sertifikatni tekshirmaslik, ishonchsiz sertifikat uchun.
      debug: true, // So'rovlarni kuzatish
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: '.*',
          handler: 'NetworkFirst',
        },
      ],
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
