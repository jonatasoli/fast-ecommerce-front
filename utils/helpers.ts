import { CURRENCIES, LOCALES } from './enums'

export function currencyFormat(value: number, locale = LOCALES.PT_BR): string {
  const currency = CURRENCIES[locale] || LOCALES.PT_BR
  const { format } = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })

  return format(value / 100)
}
