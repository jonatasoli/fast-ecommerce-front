import { LOCALES, enUS, ptBR } from '@/i18n'

export default {
  legacy: false,
  locale: LOCALES.PT_BR,
  fallbackLocale: LOCALES.PT_BR,
  messages: { [LOCALES.EN]: enUS, [LOCALES.PT_BR]: ptBR },
}
