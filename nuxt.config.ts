import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { LOCALES } from './utils/enums'

const { VITEST, NODE_ENV, SERVER_BASE_URL } = process.env

const transpileNaive = NODE_ENV === 'production' || VITEST !== undefined

export default defineNuxtConfig({
  imports: {
    autoImport: true,
  },
  css: ['vue3-flag-icons/styles'],
  ssr: false,
  nitro: {
    preset: 'node-server', // Configuração essencial para Dokku
  },
  head: {
    __dangerouslyDisableSanitizers: ['script'],
    script: [
      {
        hid: 'NEWRELIC',
        src: 'new-relic.js',
        defer: true,
        type: 'text/javascript',
        charset: 'utf-8',
      },
    ],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  spaLoadingTemplate: 'spa-loading-template.html',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-gtag',
  ],

  i18n: {
    baseUrl: process.env.I18N_BASE_URL,
    strategy: 'no_prefix',
    locales: [
      { language: 'pt-BR', code: LOCALES.PT_BR },
      { language: 'en-US', code: LOCALES.EN_US },
      { language: 'pt-PT', code: LOCALES.PT_PT },
      { language: 'es-ES', code: LOCALES.ES_ES },
    ],
    defaultLocale: LOCALES.PT_BR,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: LOCALES.PT_BR,
    },
    vueI18n: './i18n.config.ts',
  },
  googleFonts: {
    families: {
      Montserrat: [300, 400, 500, 600, 700],
      download: true,
      inject: true,
    },
  },
  gtag: {
    enabled: false,
    loadingStrategy: 'async',
    tags: [
      {
        id: process.env.GTAG_ID ?? '',
        config: {
          send_page_view: true,
          linker: {
            domains: [process.env.I18N_BASE_URL],
          },
        },
      },
    ],
    initCommands: [
      // Setup up consent mode
      [
        'consent',
        'default',
        {
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          ad_storage: 'denied',
          analytics_storage: 'denied',
          wait_for_update: 300,
        },
      ],
    ],
  },
  plugins: [
    { src: '@/plugins/vue-tel-input', mode: 'client' },
    { src: '@/plugins/vue-the-mask', mode: 'client' },
    { src: '@/plugins/mercadopago', mode: 'client' },
    { src: '@/plugins/whatsapp', mode: 'client' },
    { src: '@/plugins/dompurify', mode: 'client' },
  ],
  build: {
    analyze: true,
    transpile: transpileNaive
      ? [
          'naive-ui',
          'vueuc',
          '@css-render/vue3-ssr',
          '@nuxtjs/i18n',
          '@juggle/resize-observer',
          '@nuxtjs/dotenv',
        ]
      : ['@nuxtjs/i18n', '@juggle/resize-observer'],
  },
  alias: {
    '~scss': resolve(__dirname, 'assets/scss'),
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/formatInTimeZone']
          : [],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~scss/variables.scss" as *;`,
        },
      },
    },
    plugins: [
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
  runtimeConfig: {
    public: {
      serverUrl: SERVER_BASE_URL,
      mercadoPagoPublicKey: process.env.MERCADO_PAGO_PUBLIC_KEY,
      recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
      recaptchaKey: process.env.RECAPTCHA_KEY,
      whatsappNumber: process.env.WHATSAPP_NUMBER,
      urlLogo: process.env.URL_LOGO,
      altLogo: process.env.ALT_LOGO,
      gtagId: process.env.GTAG_ID,
      isProd: process.env.NODE_ENV === 'production',
      sentry: {
        dsn: process.env.SENTRY_DSN,
        env: process.env.SENTRY_ENV,
      },
    },
  },

  compatibilityDate: '2024-10-21',
})
