export default defineNuxtConfig({
  ssr: true,

  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', 'nuxt-primevue'],

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

  css: ['~/app/style/main.scss'],

  i18n: {
    vueI18n: './app/i18n.config.ts'
  }

  // primevue: {
  //   autoImport: false,
  //
  //   options: {
  //     theme: {
  //       preset: Aura
  //     }
  //   }
  // }
})
