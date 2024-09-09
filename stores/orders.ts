import { defineStore } from 'pinia'
import type { ResponseOrder } from '~/utils/types'
import { computed, ref, useRuntimeConfig } from '#imports'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<ResponseOrder[]>([])

  const getOrders = computed(() => orders.value)
  const loading = ref(false)
  const config = useRuntimeConfig()
  const serverUrl = config.public.serverUrl

  async function getOrdersList(page: number): Promise<ResponseOrder> {
    loading.value = true

    try {
      const headers = {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
      const res = await fetch(
        `${serverUrl}/order/orders?page=${page}&offset=10`,
        {
          headers,
        },
      )
      const data: ResponseOrder = await res.json()

      return data
    } catch (err) {
      console.error(err)
      // Retorne um objeto padrão ou nulo em caso de erro, se necessário
      return {
        orders: [],
        page: 0,
        offset: 0,
        total_pages: 0,
        total_records: 0,
      }
    } finally {
      loading.value = false
    }
  }

  return {
    getOrders,
    getOrdersList,
    loading,
  }
})
