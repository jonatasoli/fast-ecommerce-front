import { LOCALES } from './utils/enums'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  imports: { autoImport: false },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxtjs/device', '@nuxtjs/google-fonts'],
  i18n: {
    baseUrl: process.env.I18N_BASE_URL,
    locales: [{ iso: 'pt-BR', code: LOCALES.PT_BR }],
    defaultLocale: LOCALES.PT_BR,
    vueI18n: './i18n.config.ts',
  },
  googleFonts: {
    families: {
      Poppins: true,
      Lato: true,
      Montserrat: true,
      download: true,
      inject: true,
    },
  },
  runtimeConfig: {
    public: {
      isProd: process.env.NODE_ENV === 'production',
    },
  },
})
