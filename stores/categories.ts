import { defineStore } from 'pinia'
import { ref, useNuxtApp } from '#imports'

export type CategoryItem = {
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
      const { data, pending } = await useFetch(
        `${serverUrl}/catalog/categories`,
        {
          headers,
        },
      )

      const responseData = (await unref(data)) as {
        categories: CategoryItem[]
      }
      categories.value = responseData.categories
      loadingCategories.value = unref(pending)
      return responseData
    } catch (error) {
      console.error(error)
    }
  }

  return {
    categories,
    getCategorys,
    loadingCategories,
  }
})
