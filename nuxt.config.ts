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

  modules: [
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/eslint'
  ],
  css: ['assets/css/main.css']
})