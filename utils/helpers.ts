import { LOCALES, STATUS_ORDER } from './enums'
import { ref, useRoute, useLocaleFromCookie } from '#imports'

export function currencyFormat(
  value: number,
  passedLocale?: string,
  type: string = '',
): string {
  const locale = passedLocale || useLocaleFromCookie()
  const currency = CURRENCY_MAP[locale] || CURRENCY_MAP['pt-BR']

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })

  if (!value) {
    return formatter.format(0)
  }

  if (type === 'freight') {
    return formatter.format(value)
  }

  return formatter.format(value)
}

export function detectCurrencyByLocale(locale: string): 'BRL' | 'USD' | 'EUR' {
  return CURRENCY_MAP[locale] || 'BRL'
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
  { label: 'English (United States)', value: 'en-US', isDefault: false },
  { label: 'English (United Kingdom)', value: 'en-GB', isDefault: false },
  { label: 'Português (Brasil)', value: 'pt-BR', isDefault: true },
  { label: 'Português (Portugal)', value: 'pt-PT', isDefault: false },
  { label: 'Español (España)', value: 'es-ES', isDefault: false },
  { label: 'Español (México)', value: 'es-MX', isDefault: false },
  { label: 'Français (France)', value: 'fr-FR', isDefault: false },
  { label: 'Français (Canada)', value: 'fr-CA', isDefault: false },
  { label: 'Deutsch (Deutschland)', value: 'de-DE', isDefault: false },
  { label: 'Italiano (Italia)', value: 'it-IT', isDefault: false },
  { label: '日本語 (日本)', value: 'ja-JP', isDefault: false },
  { label: '中文 (中国)', value: 'zh-CN', isDefault: false },
  { label: '中文 (台灣)', value: 'zh-TW', isDefault: false },
  { label: 'Русский (Россия)', value: 'ru-RU', isDefault: false },
  { label: '한국어 (대한민국)', value: 'ko-KR', isDefault: false },
  {
    label: 'العربية (المملكة العربية السعودية)',
    value: 'ar-SA',
    isDefault: false,
  },
  { label: 'Nederlands (Nederland)', value: 'nl-NL', isDefault: false },
  { label: 'Svenska (Sverige)', value: 'sv-SE', isDefault: false },
  { label: 'Norsk (Norge)', value: 'no-NO', isDefault: false },
  { label: 'Suomi (Suomi)', value: 'fi-FI', isDefault: false },
]

export function getPageFromRoute() {
  const page = useRoute().query.p?.toString() || ''
  const intPage = parseInt(page)
  const pageRef = $ref(1)

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
