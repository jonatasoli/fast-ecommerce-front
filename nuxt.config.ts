import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { LOCALES } from './utils/enums'

const {
  VITEST,
  NODE_ENV,
} = process.env

const transpileNaive = NODE_ENV === 'production' || VITEST !== undefined

export default defineNuxtConfig({
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
      Montserrat: [400, 500, 600, 700],
      download: true,
      inject: true,
    },
  },
  build: {
    analyze: true,
    transpile:
      transpileNaive
        ? [
            'naive-ui',
            '@css-render/vue3-ssr',
            '@nuxtjs/i18n',
          ]
        : ['@nuxtjs/i18n'],
  },
  vite: {
    optimizeDeps: {
      include:
        !transpileNaive
          ? ['naive-ui']
          : [],
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
  },
  runtimeConfig: {
    public: {
      isProd: process.env.NODE_ENV === 'production',
    },
  },
})
