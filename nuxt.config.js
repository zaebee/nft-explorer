export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/lazy-load.js',
    '~/plugins/chart.js'
  ],

// export default $http
  serverMiddleware: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  env: {
    API_URL: process.env.API_URL || 'https://nft.mebelstock.com',
    environment: process.env.NODE_ENV || 'development',
  },
  axios: {
    timeout: 30000,
    baseURL: process.env.API_URL || 'https://nft.mebelstock.com',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    xsrfCookieName: 'csrf-token',
    xsrfHeaderName: 'X-CSRFToken'
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/content',
    // https://go.nuxtjs.dev/chakra
    '@chakra-ui/nuxt',
    // https://go.nuxtjs.dev/emotion
    '@nuxtjs/emotion',
    '@nuxtjs/pwa',
    '@nuxtjs/yandex-metrika',
  ],
  yandexMetrika: {
      id: '76211581',
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true,
      webvisor:true
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      '@chakra-ui/vue',
      '@chakra-ui/theme-vue'
    ],
  }
}
