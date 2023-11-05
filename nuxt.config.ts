import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { LOCALES } from './utils/enums'

const {
  VITEST,
  NODE_ENV,
  SERVER_BASE_URL,
} = process.env

const transpileNaive = NODE_ENV === 'production' || VITEST !== undefined

export default defineNuxtConfig({
  ssr: false,
  spaLoadingTemplate: 'spa-loading-template.html',
  devtools: { enabled: true },
  imports: { autoImport: false },
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  i18n: {
    baseUrl: process.env.I18N_BASE_URL,
    locales: [{ iso: 'pt-BR', code: LOCALES.PT_BR }],
    defaultLocale: LOCALES.PT_BR,
    vueI18n: './i18n.config.ts',
  },
  googleFonts: {
    families: {
      Montserrat: [300, 400, 500, 600, 700],
      download: true,
      inject: true,
    },
  },
  plugins: [
    { src: '@/plugins/vue-tel-input', mode: 'client' },
    { src: '@/plugins/vue-the-mask', mode: 'client' },
    { src: '@/plugins/mercadopago', mode: 'client' },
  ],
  build: {
    analyze: true,
    transpile:
      transpileNaive
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@nuxtjs/i18n',
            '@juggle/resize-observer',
          ]
        : ['@nuxtjs/i18n', '@juggle/resize-observer'],
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/formatInTimeZone']
          : []
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/main.scss";',
        },
      },
    },
    plugins: [
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],

    server: {
      watch: {
        ignored: ['**/pages/checkout/_*/**'],
      }
    }
  },
  ignore: ['**/pages/checkout/_*/**'],
  runtimeConfig: {
    public: {
      serverUrl: SERVER_BASE_URL,
      mercadoPagoPublicKey: process.env.MERCADO_PAGO_PUBLIC_KEY,
      isProd: process.env.NODE_ENV === 'production',
    },
  },
})
