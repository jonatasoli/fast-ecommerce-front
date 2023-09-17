import { defineStore } from 'pinia'
import { ProductItem } from '~/utils/types'
import { computed, ref, useRuntimeConfig } from '#imports'

export const useProductsStore = defineStore('products', () => {
  const products = ref<ProductItem[]>([])
  const getProducts = computed(() => products.value)
  const loading = ref(false)
  const config = useRuntimeConfig()
  const serverUrl = config.public.serverUrl

  async function getProductsShowcase() {
    loading.value = true
    let showcase: ProductItem[] = []

    try {
      const res = await fetch(`${serverUrl}/catalog/all`)
      const data = await res.json()

      showcase = data?.slice?.(0, 4) || []
    } catch (err) {
      console.error(err)
    }

    loading.value = false
    return showcase
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
