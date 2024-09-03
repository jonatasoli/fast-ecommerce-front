import { defineStore } from 'pinia'
import type { ProductItem, AlertMePayload } from '~/utils/types'
import { computed, ref, useRuntimeConfig, useCookie } from '#imports'

export const useProductsStore = defineStore('products', () => {
  const products = ref<ProductItem[]>([])
  const getProducts = computed(() => products.value)
  const loading = ref(false)
  const config = useRuntimeConfig()
  const serverUrl = config.public.serverUrl
  const token = useCookie('token')

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

  async function alertMe(formValue: AlertMePayload) {
    const { error, status } = await useFetch(`${serverUrl}/report/inform`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token.value}`,
      },
      body: formValue,
    })

    if (status.value === 'error') {
      if (error.value?.statusCode === 401) {
        return {
          status: 'error',
          statusCode: error.value?.statusCode,
          message:
            'Usuário não logado. Por favor, faça o login e tente novamente.',
        }
      }

      if (error.value?.statusCode === 422) {
        return {
          status: 'error',
          statusCode: error.value?.statusCode,
          message:
            'Falha no envio. Por favor, verifique os dados e tente novamente.',
        }
      }
    }

    if (status.value === 'success') {
      return {
        status: 'success',
        statusCode: 204,
        message: 'Enviado com sucesso.',
      }
    }

    return {
      status: 'error',
      statusCode: 500,
      message: 'Falha no envio. Por favor, tente novamente.',
    }
  }

  return {
    getProducts,
    getProductsShowcase,
    getProductsByCategory,
    alertMe,
    loading,
  }
})
