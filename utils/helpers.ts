import { CURRENCIES, LOCALES } from './enums'
import { ref, useRoute } from '#imports'

export function currencyFormat(value, locale = LOCALES.PT_BR, type = ''): string {
  const currency = CURRENCIES[locale] || LOCALES.PT_BR
  if (!value) return currencyFormat(0)
  const { format } = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })

  if (type === 'freight') {
    return format(value)
  }

  return format(value)
}

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
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return { month, year }
}
