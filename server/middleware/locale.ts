import { defineEventHandler, getCookie, getRequestHeader, setCookie } from 'h3'

export default defineEventHandler((event) => {
  const existingLocale = getCookie(event, 'i18n_redirected')

  const browserLocale =
    getRequestHeader(event, 'accept-language')?.split(',')[0] || 'pt-BR'

  if (!existingLocale) {
    setCookie(event, 'i18n_redirected', browserLocale, {
      path: '/',

      maxAge: 60 * 60 * 24 * 30,
    })
  }
})
