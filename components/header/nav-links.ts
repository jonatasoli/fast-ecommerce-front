import { CATEGORIES, useI18n, useLocalePath } from '#imports'
import { useCategoryStore } from '@/stores/categories'

interface NavLink {
  label: string
  to: string
  key: string
  children: NavLink[]
}

export function useNavLinks() {
  const localePath = useLocalePath()
  const { t } = useI18n()
  const store = useCategoryStore()

  const sortingCategories = store.categories.sort((a, b) => {
    const order = { news: -1, sales: -1 }
    return (order[a.name] || 0) - (order[b.name] || 0)
  })

  const categoryLink = (uri: CATEGORIES | string, label: string, basePath = 'categories') => ({
    label,
    to: localePath(`/${basePath}${uri ? `/${uri}` : ''}`),
    key: uri || basePath,
    children: [],
  }) as NavLink

  const navLinks = sortingCategories.map(category => categoryLink(category.path, t(`navigation.${category.name}`)))

  return {
    categoryLink,
    navLinks,
  }
}
