import { defineStore } from 'pinia'
import type { ProductItem } from '~/utils/types'
import { computed, ref, useRuntimeConfig, useCookie } from '#imports'

export const useProductsStore = defineStore('products', () => {
  const products = ref<ProductItem[]>([])
  const getProducts = computed(() => products.value)
  const loading = ref(false)
  const config = useRuntimeConfig()
  const serverUrl = config.public.serverUrl
  const locale = useCookie('i18n_redirected').value || 'pt-BR'
  const currency = detectCurrencyByLocale(locale)

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
        `${serverUrl}/catalog/category/products/${category}?currency=${currency}`,
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
