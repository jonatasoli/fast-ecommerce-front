import { enUS } from './enUS'
import { esES } from './esES'
import { ptPT } from './ptPT'
import { ptBR } from './index'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    alwaysRedirect: true,
    fallbackLocale: 'pt-BR',
  },
  messages: {
    'pt-BR': ptBR,
    'en-US': enUS,
    'pt-PT': ptPT,
    'es-ES': esES,
  },
}))
