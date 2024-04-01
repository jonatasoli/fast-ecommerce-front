import { defineStore } from 'pinia'
import type { ProductItem } from '~/utils/types'
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
      const headers = {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
      const res = await fetch(`${serverUrl}/catalog/showcase/all`, {
        headers,
      })
      const data = await res.json()

      showcase = data || []
    } catch (err) {
      console.error(err)
    }

    loading.value = false
    return showcase
  }

  async function getProductsByCategory(category: string) {
    try {
      loading.value = true
      const headers = {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
      const res = await fetch(
        `${serverUrl}/catalog/category/products/${category}`,
        {
          headers,
        },
      )
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
