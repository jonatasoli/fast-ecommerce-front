export function useEstimate() {
  const pending = ref(false)
  const fetching = ref(false)
  const data = ref()
  const error = ref<string | null>(null)

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
        'Access-Control-Allow-Origin': 'http://localhost:3000',
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
            coupon,
            affiliate,
          },
        },
      )

      const responseDataValue = unref(responseData)

      if (unref(fetchError)) {
        error.value = unref(fetchError)?.data.message
      }

      if (responseDataValue && responseDataValue?.cart_items) {
        data.value = responseDataValue
        error.value = null
      } else {
        data.value = cart.value
      }

      pending.value = false
    } catch (err) {
      error.value = (err as Error).message
      pending.value = false
    }
  }

  async function refresh(cartItems: CartItem[] = filteredCartItems) {
    fetching.value = true
    await execute(cartItems)
    fetching.value = false
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
