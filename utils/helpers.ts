import { CURRENCIES, LOCALES } from './enums'

export function currencyFormat(value = 0, locale = LOCALES.PT_BR, type = ''): string {
  const currency = CURRENCIES[locale] || LOCALES.PT_BR
  const { format } = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })

  if (type === 'freight') {
    return format(value)
  }

  return format(value / 100)
}
