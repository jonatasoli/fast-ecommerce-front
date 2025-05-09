import { useCookie } from '#app'

export function useLocaleFromCookie() {
  const locale = useCookie('i18n_redirected').value
  return locale || 'pt-BR'
}
