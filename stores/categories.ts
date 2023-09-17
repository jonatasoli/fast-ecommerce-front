import { defineStore } from 'pinia'
import { ref, useNuxtApp } from '#imports'

type CategoryItem = {
  category_id: number
  name: string
  path: string
}

export const useCategoryStore = defineStore('categorys', () => {
  const categories = ref<CategoryItem[]>([])
  const { $config } = useNuxtApp()
  const serverUrl = $config.public.serverUrl

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
  }
})
