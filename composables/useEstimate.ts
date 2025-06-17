// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IDataCart extends Cart {}

export function useEstimate() {
  const config = useRuntimeConfig()
  const pending = $ref(false)
  const fetching = $ref(false)
  const data = $ref<IDataCart | null>(null)
  const error = $ref<string | null>(null)
  const serverUrl = config.public.serverUrl
  const cartStore = useCartStore()
  const { cart, coupon, affiliate } = storeToRefs(cartStore)
  const cartItems = cart.value.cart_items
  const filteredCartItems = cartItems.filter(
    (item) => item.available_quantity > 0,
  )

  async function execute(cartItems: CartItem[]) {
    try {
      pending.value = true

      const headers = {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': serverUrl,
      }

      const uuid = unref(cart).uuid

      const { data: responseData, error: fetchError } = await useFetch(
        `/api/cart/${uuid}/estimate`,
        {
          method: 'POST',
          headers,
          body: {
            uuid: cart.value.uuid,
            cart_items: cartItems,
            subtotal: cart.value.subtotal,
            total: cart.value.total,
            zipcode: cart.value.zipcode,
            freight_product_code: cart.value.freight_product_code,
            coupon: coupon.value,
            affiliate: affiliate.value,
          },
        },
      )

      const responseDataValue = unref(responseData)

      if (unref(fetchError)) {
        error.value = unref(fetchError)?.data.message
        pending.value = false
        return null
      }

      if (responseDataValue && responseDataValue.cart_items) {
        data.value = responseDataValue
        error.value = null
      } else {
        data.value = cart.value
      }

      pending.value = false
      return responseDataValue
    } catch (err) {
      error.value = (err as Error).message
      pending.value = false
      return null
    }
  }

  async function refresh(cartItems: CartItem[] = filteredCartItems) {
    fetching.value = true
    const res = await execute(cartItems)
    fetching.value = false
    return res
  }

  onMounted(() => execute(filteredCartItems))

  return {
    pending,
    fetching,
    data,
    error,
    execute,
    refresh,
  }
}
