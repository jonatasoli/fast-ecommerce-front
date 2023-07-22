import { defineStore } from 'pinia'
import { CartItem, ProductItem } from 'utils/types'
import { computed, ref } from '#imports'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartItem[]>([])

  function addToCart(item: ProductItem) {
    if (!item) {
      return
    }
    cart.value.push({
      product: { ...item },
      quantity: 1,
    })
  }

  const amountProducts = computed(() => {
    return cart.value.reduce((acc, item) => acc + item.product.value, 0)
  })

  return {
    cart,
    addToCart,
    amountProducts,
  }
})
