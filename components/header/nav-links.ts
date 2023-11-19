import { CATEGORIES, useLocalePath } from '#imports'
import { useCategoryStore } from '@/stores/categories'

interface NavLink {
  label: string
  to: string
  key: string
  children: NavLink[]
}

export function useNavLinks() {
  const localePath = useLocalePath()
  const store = useCategoryStore()

  const categoryLink = (uri: CATEGORIES | string, label: string, basePath = 'categories') => ({
    label,
    to: localePath(`/${basePath}${uri ? `/${uri}` : ''}`),
    key: uri || basePath,
    children: [],
  }) as NavLink

  const navLinks = store.categories.map(category => categoryLink(category.path, category.name))

  return {
    categoryLink,
    navLinks,
  }
}
