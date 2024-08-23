import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  ssr: true,

  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@nuxt/test-utils/module',
    '@nuxtjs/storybook'
  ],

  typescript: {
    strict: true
  },

  imports: {
    autoImport: false,
    dirs: [
      'shared/composables',
      'shared/utils'
      // You can specify here any folder from which you want to auto-import
    ]
  },

  dir: {
    pages: 'routes'
  },

  components: {
    dirs: [
      {
        path: '~/shared/components',
        pathPrefix: false
      }
    ]
  },
  css: [
    '~/app/style/main.scss',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css'
  ],

  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },

  pinia: {
    storesDirs: ['./app/stores/**']
  },

  i18n: {
    vueI18n: './app/i18n.config.ts'
  },

  storybook: {
    port: 6006
  }
})
