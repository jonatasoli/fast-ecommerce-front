interface IDataOrder {
  cancelledAt: string | null
  cancelledReason: string | null
  freight: string
  orderDate: string
  orderId: string
  orderStatus: string
  products: CartItem[]
  trackingNumber: string | null
}

export function useOrders(userId: string) {
  const config = useRuntimeConfig()
  const serverUrl = config.public.serverUrl
  const pending = ref(false)
  const data = ref<IDataOrder[]>()
  const error = ref<string | null>(null)

  async function execute() {
    try {
      pending.value = true

      const { data: responseData } = await useFetch<Order[] | undefined>(
        `${serverUrl}/order/user/${userId}`,
      )

      const responseDataValue = unref(responseData)
      if (responseDataValue) {
        data.value = responseDataValue.map((order) => ({
          cancelledAt: order.cancelled_at,
          cancelledReason: order.cancelled_reason,
          freight: order.freight,
          orderDate: order.order_date,
          orderId: order.order_id.toString(),
          orderStatus: order.order_status,
          products: order.products,
          trackingNumber: order.tracking_number,
        }))
      }
      pending.value = false
    } catch (err) {
      error.value = (err as Error).message
      pending.value = false
    }
  }

  onMounted(() => execute())

  return {
    pending,
    data,
    error,
    execute,
  }
}
