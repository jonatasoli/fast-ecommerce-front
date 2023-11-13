import { defineStore } from 'pinia'
import { CartAddress, CartItem, CreditCardPayment } from '@/utils/types'
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
        const headers = {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
        if (!uuid) {
          const res = await fetch(`${serverUrl}/cart/`, {
            method: 'POST',
            headers,
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
        const headers = {
          'accept': 'application/json',
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
        const res = await fetch(`${serverUrl}/cart/${uuid}/product`, {
          method: 'POST',
          headers,
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

        if (!data) {
          return
        }
        const res_cart = await estimate()
        cart.value = res_cart
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
      const headers = {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
      const res = await fetch(`${serverUrl}/cart/${cart.value.uuid}/estimate`, {
        method: 'POST',
        headers,
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

      const res = await fetch(`${serverUrl}/cart/${uuid}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${$config.public.apiKey}`,
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      const data = await res.json()
      return data
    } catch (err) {
      console.error(err)
    }
  }

  async function AddAddressCart(address: CartAddress) {
    try {
      const uuid = cart.value.uuid
      if (!uuid) {
        return
      }
      loadingCart.value = true
      const headers = {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }

      const res = await fetch(`${serverUrl}/cart/${uuid}/address`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...cart.value,
          address,
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

  async function addMercadoPagoCreditCardPayment(payment: CreditCardPayment) {
    try {
      const uuid = cart.value.uuid
      if (!uuid) {
        return
      }
      loadingCart.value = true
      const headers = {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }

      const res = await fetch(`${serverUrl}/cart/${uuid}/payment/credit_card`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...cart.value,
          payment,
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

  async function getCartPreview() {
    try {
      const uuid = cart.value.uuid
      if (!uuid) {
        return
      }

      const res = await fetch(`${serverUrl}/cart/${uuid}/preview`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${$config.public.apiKey}`,
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      const data = await res.json()
      return data
    } catch (err) {
      console.error(err)
    }
  }

  async function Checkout() {
    try {
      const uuid = cart.value.uuid
      if (!uuid) {
        return
      }
      loadingCart.value = true
      const headers = {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }

      const res = await fetch(`${serverUrl}/cart/${uuid}/payment/credit_card`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...cart.value,
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
    AddAddressCart,
    addMercadoPagoCreditCardPayment,
    getCartPreview,
    Checkout,
  }
})
