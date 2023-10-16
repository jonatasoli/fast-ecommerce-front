import { defineStore } from 'pinia'
import { CartItem } from '@/utils/types'
import { computed, ref, useCookie, useNuxtApp } from '#imports'

interface Cart {
  uuid: string
  freight: {
    price: number
    delivery_time: string
  }
  subtotal: number
  zipcode: string
  cart_items: CartItem[]
}

export const useCartStore = defineStore('cart', () => {
  const cart = useCookie<Cart>('cart', {
    default: () => ref({
      uuid: '',
      freight: {
        price: 0,
        delivery_time: '',
      },
      zipcode: '',
      subtotal: 0,
      cart_items: [],
    }),
  })

  const loadingCart = ref(false)
  const getCart = computed(() => cart.value)
  const { $config } = useNuxtApp()
  const serverUrl = $config.public.serverUrl
  async function addToCart(item: CartItem) {
    if (!item) {
      return
    }
    const uuid = cart.value.uuid
    async function createCart() {
      try {
        if (!uuid) {
          const res = await fetch(`${serverUrl}/cart/`, {
            method: 'POST',
          })
          const data = await res.json()
          cart.value.uuid = data.uuid
          return data
        }
        return {
          data: {
            uuid,
          },
        }
      } catch (err) {
        console.error(err)
      }
    }

    async function addProduct(uuid: string = cart.value.uuid) {
      try {
        loadingCart.value = true
        const res = await fetch(`${serverUrl}/cart/${uuid}/product/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_id: item.product_id,
            name: item.name,
            image_path: item.image_path,
            quantity: item.quantity,
            price: item.price,
            discount_price: 0,
          }),
        },
        )
        const data = await res.json()
        cart.value = data
      } catch (err) {
        console.error(err)
      } finally {
        loadingCart.value = false
      }
    }

    createCart().then((data) => {
      addProduct(data.uuid)
    })
  }

  async function updateQuantity(id: number, quantity: number | null) {
    try {
      const product = cart.value.cart_items.find(p => p.product_id === id)
      if (!product || !quantity) {
        return
      }
      product.quantity = quantity
      await estimate()
    } catch (err) {
      console.error(err)
    }
  }

  async function estimate() {
    try {
      loadingCart.value = true
      const res = await fetch(`${serverUrl}/cart/${cart.value.uuid}/estimate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...cart.value,
          freight_product_code: '03298',
        }),
      })
      const data = await res.json()
      cart.value = data
      return data
    } catch (err) {
      console.error(err)
    } finally {
      loadingCart.value = false
    }
  }

  async function removeItem(id: number) {
    try {
      cart.value.cart_items = cart.value.cart_items.filter(p => p.product_id !== id)
      await estimate()
    } catch (err) {
      console.error(err)
    }
  }

  async function calculateFreight(zipcode: string) {
    try {
      if (!zipcode) {
        return
      }
      loadingCart.value = true
      cart.value.zipcode = zipcode
      await estimate()
    } catch (err) {
      console.error(err)
    } finally {
      loadingCart.value = false
    }
  }

  async function getCartUser() {
    try {
      const uuid = cart.value.uuid
      if (!uuid) {
        return
      }

      const res = await fetch(`${serverUrl}/cart/${uuid}`/, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${$config.public.apiKey}`,
        },
      })
      const data = await res.json()
      return data
    } catch (err) {
      console.error(err)
    }
  }

  return {
    cart,
    getCart,
    loadingCart,
    estimate,
    getCartUser,
    addToCart,
    updateQuantity,
    calculateFreight,
    removeItem,
  }
})
