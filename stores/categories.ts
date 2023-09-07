import { defineStore } from 'pinia'
import { ref, useNuxtApp } from '#imports'

interface CategoryItem {
  category: {
    category_id: number
    name: string
    path: string
  }[]
}

export const useCategoryStore = defineStore('categorys', () => {
  const categories = ref<CategoryItem>({ category: [] })
  const { $config } = useNuxtApp()
  const serverUrl = $config.public.serverUrl

  async function getCategorys() {
    const res = await fetch(`${serverUrl}/catalog/all/categorys`)
    const data = await res.json()
    categories.value = data
  }

  return {
    categories,
    getCategorys,
  }
})
