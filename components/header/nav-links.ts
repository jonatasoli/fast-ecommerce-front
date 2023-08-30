import { CATEGORIES, useI18n, useLocalePath } from '#imports'

export function useNavLinks() {
  const localePath = useLocalePath()
  const { t } = useI18n()

  const categoryLink = (uri: CATEGORIES | '', label: string, basePath = 'categories') => ({
    label,
    to: localePath(`/${basePath}${uri ? `/${uri}` : ''}`),
    key: uri || basePath,
    children: [],
  })

  const navLinks = ([
    categoryLink(CATEGORIES.NEWS, t('navigation.news')),
    {
      ...categoryLink('', t('navigation.categories'), 'categories'),
      children: [
        categoryLink(CATEGORIES.CELEBRITY, t('navigation.celebrity')),
        categoryLink(CATEGORIES.DIAMMONT_LISS, t('navigation.diammontLiss')),
        categoryLink(CATEGORIES.HAIR_SPRAY, t('navigation.hairSpray')),
        categoryLink(CATEGORIES.HELP_THERAPY, t('navigation.helpTherapy')),
        categoryLink(CATEGORIES.OVERDOSE_COLOR, t('navigation.overdoseColor')),
        categoryLink(CATEGORIES.VIBRANCE_CURLS, t('navigation.vibranceCurls')),
        categoryLink(CATEGORIES.WONDER_LISS, t('navigation.wonderLiss')),
      ],
    },
    categoryLink(CATEGORIES.SHOWER, t('navigation.shower')),
    categoryLink(CATEGORIES.KITS, t('navigation.kits')),
    categoryLink(CATEGORIES.NATURAL_COMPOUND, t('navigation.naturalCompound')),
    {
      ...categoryLink('', t('navigation.accessories'), 'accessories'),
      children: [
        categoryLink(CATEGORIES.TRAINING_DOLL, t('navigation.trainningDoll'), 'accessories'),
        categoryLink(CATEGORIES.BOOKS, t('navigation.books'), 'accessories'),
        categoryLink(CATEGORIES.SCISSORS, t('navigation.scissors'), 'accessories'),
      ],
    },
    categoryLink('', t('navigation.sales'), 'sales'),
  ])

  return {
    categoryLink,
    navLinks,
  }
}
