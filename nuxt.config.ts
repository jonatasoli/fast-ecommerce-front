import { LOCALES } from './i18n'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  imports: { autoImport: false },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxtjs/device', [
    '@nuxtjs/google-fonts',
    {
      families: {
        Poppins: true,
        Lato: true,
        Montserrat: true,
        download: true,
        inject: true,
      },
    },
  ]],
  i18n: {
    baseUrl: process.env.I18N_BASE_URL,
    locales: [{ iso: 'pt-BR', code: LOCALES.PT_BR }, { iso: 'en-US', code: LOCALES.EN }],
    defaultLocale: LOCALES.PT_BR,
    vueI18n: './i18n.config.ts',
  },
  runtimeConfig: {
    public: {
      isProd: process.env.NODE_ENV === 'production',
    },
  },
})
