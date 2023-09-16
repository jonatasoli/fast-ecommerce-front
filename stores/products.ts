import { defineStore } from 'pinia'
import { ProductItem } from '~/utils/types'
import { computed, ref, useNuxtApp } from '#imports'
export const useProductsStore = defineStore('products', () => {
  const products = ref<ProductItem[]>([])
  const getProducts = computed(() => products.value)
  const loading = ref(false)
  const { $config } = useNuxtApp()
  const serverUrl = $config.public.serverUrl

  async function getProductsShowcase() {
    try {
      loading.value = true
      const res = await fetch(`${serverUrl}/catalog/showcase/all`)
      const data = await res.json()
      products.value = data
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function getProductsByCategory(category: string) {
    try {
      loading.value = true
      const res = await fetch(`${serverUrl}/catalog/category/products/${category}`)
      const data = await res.json()
      products.value = data.product
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    getProducts,
    getProductsShowcase,
    getProductsByCategory,
    loading,
  }
})
