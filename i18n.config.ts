import { LOCALES } from '@/utils/enums'
import { ptBR } from '@/i18n'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: LOCALES.PT_BR,
  fallbackLocale: LOCALES.PT_BR,
  messages: { [LOCALES.PT_BR]: ptBR },
  })
)
