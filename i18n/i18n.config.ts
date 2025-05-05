import { ptBR } from './index'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'pt-BR', // Fallback apenas, não padrão
  fallbackLocale: 'pt-BR',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    alwaysRedirect: true,
    fallbackLocale: 'pt-BR',
  },
  messages: {
    'pt-BR': ptBR,
    // adicione outros idiomas se necessário
  },
}))
