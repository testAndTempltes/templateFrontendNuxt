import { defineI18nConfig } from '#i18n'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      welcome: 'Welcome',
      language: {
        en: 'en',
        ru: 'ru'
      }
    },
    ru: {
      welcome: 'Добро пожаловать',
      language: {
        en: 'англ',
        ru: 'рус'
      }
    }
  }
}))
