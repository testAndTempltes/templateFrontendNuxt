// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  devtools: { enabled: true },
  modules: [],

  typescript: {
    strict: true
  },

  imports: {
    autoImport: true,
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

  css: ['~/app/style/main.scss']
})
