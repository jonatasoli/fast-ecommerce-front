import { useCookie } from '#app'

export const supportedFlags = ['br', 'us', 'es', 'pt'] as const
export type SupportedFlag = (typeof supportedFlags)[number]

const localeToFlag: Record<string, SupportedFlag> = {
  'pt-BR': 'br',
  'en-US': 'us',
  'es-ES': 'es',
  'pt-PT': 'pt',
}

const flagToLocale: Record<SupportedFlag, string> = {
  br: 'pt-BR',
  us: 'en-US',
  es: 'es-ES',
  pt: 'pt-PT',
}

export const useLocale = () => {
  const cookie = useCookie('i18n_redirected')
  const initialFlag = localeToFlag[cookie.value || 'pt-BR'] || 'br'
  const locale = useState<SupportedFlag>('locale', () => initialFlag)

  const setLocale = (flag: SupportedFlag) => {
    locale.value = flag
    cookie.value = flagToLocale[flag]
  }

  return { locale, setLocale }
}
