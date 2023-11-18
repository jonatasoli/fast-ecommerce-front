interface Checkout {
  status: string;
  message: string;
  order_id: string;
}

export const useCheckoutStore = defineStore('checkout', () => {
  const checkout = ref<Checkout>({
    status: '',
    message: '',
    order_id: ''
  })

  const setCheckout = (data: Checkout) => {
    checkout.value = data
  }

  return {
    checkout,
    setCheckout
  }
})