import { defineStore } from 'pinia'
import { ref, useNuxtApp } from '#imports'

type CategoryItem = {
  category_id: number
  name: string
  path: string
  image_path?: string
}

export const useCategoryStore = defineStore('categories', () => {
  const loadingCategories = ref(true)
  const categories = ref<CategoryItem[]>([])
  const { $config } = useNuxtApp()
  const serverUrl = $config.public.serverUrl

  async function getCategorys() {
    try {
      const headers = {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
      const res = await fetch(`${serverUrl}/catalog/categories`, {
        headers,
      })
      const data = await res.json()

      categories.value = data.categories || []
    } catch (error) {
      console.error(error)
    } finally {
      loadingCategories.value = false
    }
  }

  return {
    categories,
    getCategorys,
    loadingCategories,
  }
})
