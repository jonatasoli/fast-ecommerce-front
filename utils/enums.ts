export enum LOCALES {
  PT_BR = 'pt-BR',
  EN_US = 'en-US',
  PT_PT = 'pt-PT',
  ES_ES = 'es-ES',
}

export enum CURRENCIES {
  'pt-BR' = 'BRL',
  'en-US' = 'USD',
  'pt-PT' = 'EUR',
}

export const CURRENCY_MAP: Record<string, 'BRL' | 'USD' | 'EUR'> = {
  'pt-BR': 'BRL',

  'en-US': 'USD',
  'en-CA': 'USD',
  'en-AU': 'USD',
  'es-MX': 'USD',
  'es-AR': 'USD',
  'en-IN': 'USD',

  'pt-PT': 'EUR',
  'fr-FR': 'EUR',
  'de-DE': 'EUR',
  'es-ES': 'EUR',
  'it-IT': 'EUR',
  'nl-NL': 'EUR',
  'fi-FI': 'EUR',
  'el-GR': 'EUR',
}

export enum CATEGORIES {
  NEWS = 'novidades',
  KITS = 'kits',
  ACCESSORIES = 'acessorios',
  SALE = 'ofertas',
  CELEBRITY = 'linha-celebrity',
  DIAMMONT_LISS = 'linha-diammont-liss',
  HAIR_SPRAY = 'linha-hair-spray',
  HELP_THERAPY = 'linha-help-therapy',
  SHOWER = 'linha-lavatorio',
  OVERDOSE_COLOR = 'linha-overdose-color',
  VIBRANCE_CURLS = 'linha-vibrance-curls',
  WONDER_LISS = 'linha-wonder-liss',
  NATURAL_COMPOUND = 'capsulas-composto-natural-19782450',
  TRAINING_DOLL = 'boneca-de-treino',
  BOOKS = 'livros-',
  SCISSORS = 'tesouras',
}

export enum STATUS_ORDER {
  PAYMENT_PAID = 'Pagamento Aprovado',
}
