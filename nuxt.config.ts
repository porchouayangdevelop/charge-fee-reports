// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {enabled: false},
  ssr: false,

  app: {
    head: {
      charset: 'utf8',
      titleTemplate: 'Charge-fee-report'
    }
  },
  plugins: ['@/plugins/ApexCharts.ts'],
  modules: [
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/eslint'
  ],
  css: ['assets/css/main.css'],
  ui: {
    fonts: false,
    colorMode: true,
    theme: {
      colors: ['primary', 'error', 'info', 'success', 'warning', 'secondary',
        'gray',
        'blue',
        'green',
        'purple',
        'pink',
        'orange',
        'deep-orange',
        'indigo',

      ]
    }
  }
})