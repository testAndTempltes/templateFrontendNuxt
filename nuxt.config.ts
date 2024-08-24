import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  ssr: true,

  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
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
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false
        }
      }
    }
  },

  pinia: {
    storesDirs: ['./app/stores/**']
  },

  i18n: {
    vueI18n: './shared/i18n/i18n.config.ts'
  },

  storybook: {
    port: 6006
  },

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode'
  }
})
