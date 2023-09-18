import { defineStore } from 'pinia'
import { ref, useNuxtApp } from '#imports'

interface CategoryItem {
  categories: {
    category_id: number
    name: string
    path: string
  }[]
}

export const useCategoryStore = defineStore('categorys', () => {
  const categories = ref<CategoryItem>({ categories: [] })
  const { $config } = useNuxtApp()
  const serverUrl = $config.public.serverUrl

  async function getCategorys() {
    const res = await fetch(`${serverUrl}/catalog/categories`)
    const data = await res.json()
    categories.value = data
  }

  return {
    categories,
    getCategorys,
  }
})
