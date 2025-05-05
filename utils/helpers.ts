import { CURRENCIES, LOCALES, STATUS_ORDER } from './enums'
import { ref, useRoute } from '#imports'

export function currencyFormat(
  value,
  locale = LOCALES.PT_BR,
  type = '',
): string {
  const currency = CURRENCIES[locale] || LOCALES.PT_BR

  const { format } = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })

  if (!value) {
    return format(0)
  }

  if (type === 'freight') {
    return format(value)
  }

  return format(value)
}

export function dateFormat(value, locale = LOCALES.PT_BR): string {
  const date = new Date(value)
  const { format } = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })

  return format(date)
}

export const locales = [
  { label: 'Inglês (Estados Unidos)', value: 'en-US', isDefault: false },
  { label: 'Inglês (Reino Unido)', value: 'en-GB', isDefault: false },
  { label: 'Português (Brasil)', value: 'pt-BR', isDefault: true },
  { label: 'Português (Portugal)', value: 'pt-PT', isDefault: false },
  { label: 'Espanhol (Espanha)', value: 'es-ES', isDefault: false },
  { label: 'Espanhol (México)', value: 'es-MX', isDefault: false },
  { label: 'Francês (França)', value: 'fr-FR', isDefault: false },
  { label: 'Francês (Canadá)', value: 'fr-CA', isDefault: false },
  { label: 'Alemão (Alemanha)', value: 'de-DE', isDefault: false },
  { label: 'Italiano (Itália)', value: 'it-IT', isDefault: false },
  { label: 'Japonês (Japão)', value: 'ja-JP', isDefault: false },
  { label: 'Chinês Simplificado (China)', value: 'zh-CN', isDefault: false },
  { label: 'Chinês Tradicional (Taiwan)', value: 'zh-TW', isDefault: false },
  { label: 'Russo (Rússia)', value: 'ru-RU', isDefault: false },
  { label: 'Coreano (Coreia do Sul)', value: 'ko-KR', isDefault: false },
  { label: 'Árabe (Arábia Saudita)', value: 'ar-SA', isDefault: false },
  { label: 'Holandês (Países Baixos)', value: 'nl-NL', isDefault: false },
  { label: 'Sueco (Suécia)', value: 'sv-SE', isDefault: false },
  { label: 'Norueguês (Noruega)', value: 'no-NO', isDefault: false },
  { label: 'Finlandês (Finlândia)', value: 'fi-FI', isDefault: false },
]

export function getPageFromRoute() {
  const page = useRoute().query.p?.toString() || ''
  const intPage = parseInt(page)
  const pageRef = ref(1)

  if (page && !isNaN(intPage) && intPage > 0) {
    pageRef.value = intPage
  }

  return {
    page: pageRef,
  }
}

export function getMonthYearFromTimestamp(timestamp) {
  const date = new Date(timestamp)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()

  return { month, year }
}

export function getOrderStatus(status) {
  return STATUS_ORDER[status] || status
}

export function capitalizeFirstLetter(string) {
  const lowerCaseString = string.toLowerCase()
  return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1)
}
