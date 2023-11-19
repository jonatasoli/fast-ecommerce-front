import { CATEGORIES, useLocalePath } from '#imports'

interface NavLink {
  label: string
  to: string
  key: string
  children: NavLink[]
}

export function useNavLinks(categories) {
  const localePath = useLocalePath()

  const categoryLink = (uri: CATEGORIES | string, label: string, basePath = 'categories') => ({
    label,
    to: localePath(`/${basePath}${uri ? `/${uri}` : ''}`),
    key: uri || basePath,
    children: [],
  }) as NavLink

  const navLinks = unref(categories)?.map(category => categoryLink(category.path, category.name))

  return {
    categoryLink,
    navLinks,
  }
}
