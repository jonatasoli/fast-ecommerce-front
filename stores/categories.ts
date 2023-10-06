import { defineStore } from 'pinia'
import { computed, ref, useNuxtApp } from '#imports'

type CategoryItem = {
  category_id: number
  name: string
  path: string
  image_path?: string
}

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<CategoryItem[]>([])
  const { $config } = useNuxtApp()
  const serverUrl = $config.public.serverUrl

  const sortedCategories = computed(() => [...categories.value].sort((a, b) => {
    const order = { news: -1, sales: -1 }
    return (order[a.name] || 0) - (order[b.name] || 0)
  }))

  async function getCategorys() {
    try {
      const res = await fetch(`${serverUrl}/catalog/categories`)
      const data = await res.json()

      categories.value = data.categories || []
    } catch (error) {
      console.error(error)
    }
  }

  return {
    categories,
    getCategorys,
    sortedCategories,
  }
})
