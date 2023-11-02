import { defineStore } from 'pinia'
import { CartAddress, CartItem, CreditCardPayment, ShippingAddress, User, UserAddress } from '@/utils/types'
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
interface Checkout {
  shipping_is_payment: boolean
  user_address: UserAddress
  shipping_address?: ShippingAddress | null
  user_data: User
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

  const checkout = ref<Checkout>({
      shipping_is_payment: false,
      user_address: {
        address_id: 0,
        user_id: 0,
        country: 'Brasil',
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        street_number: '',
        address_complement: '',
        zipcode: '',
        active: false,
      },
      user_data: {
        name: '',
        email: '',
        phone: '',
        document: '',
      }
  })

  const loading = ref(false)
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
        loading.value = true
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
        cart.value = data

        if (!data) {
          return
        }
        const res_cart = await estimate()
        cart.value = res_cart
      } catch (err) {
        console.error(err)
      } finally {
        loading.value = false
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
      loading.value = true
      const headers = {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
      const res = await fetch(`${serverUrl}/cart/${cart.value.uuid}/estimate`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          uuid: cart.value.uuid,
          cart_items: cart.value.cart_items,
          zipcode: cart.value.zipcode,
          subtotal: cart.value.subtotal,
          freight_product_code: '03298',
        }),
      })
      const data = await res.json()
      cart.value = data
      return data
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
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
      loading.value = true
      cart.value.zipcode = zipcode
      await estimate()
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
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

  async function addUserCart(user: User) {
    try {
      const uuid = cart.value.uuid
      if (!uuid) {
        return
      }

      loading.value = true
      const res = await fetch(`/api/cart/${uuid}/user`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          ...cart.value,
          user,
        }),
      })
      const {data, success} = await res.json()

      if (!success) {
        throw new Error("ERROR_ADD_USER_CART");
        
      }
      checkout.value.user_data = data.user_data
      return data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function addAddressCart(address: CartAddress) {
    try {
      const uuid = cart.value.uuid
      if (!uuid) {
        return
      }
      loading.value = true
      
      const res = await fetch(`/api/cart/${uuid}/address`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          cart: {
            ...cart.value,
            user_data: {
              ...checkout.value.user_data,
              user_id: null
            },
          },
          address: {
            ...address,
            address_id: null,
          },
        }),
      })
      
      const { data, success} = await res.json()

      if (!success) {
        throw new Error("ERROR_ADD_ADDRESS_CART");
      }
      const res_cart = {
        uuid: data.uuid,
        cart_items: data.cart_items,
        subtotal: data.subtotal,
        freight: data.freight,
        zipcode: data.zipcode,
      }

      const res_checkout = {
        shipping_address: data.shipping_address,
        shipping_is_payment: data.shipping_is_payment,
        user_address: data.user_address,
      }
     
      cart.value = res_cart
      checkout.value = res_checkout

      return data
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function addMercadoPagoCreditCardPayment(payment: CreditCardPayment) {
    try {
      const uuid = cart.value.uuid
      if (!uuid) {
        return
      }
      loading.value = true
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
      loading.value = false
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

  async function finishCheckout() {
    try {
      const uuid = cart.value.uuid
      if (!uuid) {
        return
      }
      loading.value = true
      const headers = {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }

      const res = await fetch(`${serverUrl}/cart/${uuid}/payment/credit_card`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...cart.value,
          ...checkout.value,
        }),
      })
      const data = await res.json()
      cart.value = data
      return data
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function getAddressByZipcode(zipcode: string, typeAddress: string) {
    try {
      loading.value = true
      const res = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`)
      const data = await res.json()
      console.log(typeAddress)
      return checkout.value[typeAddress] = {
        country: 'Brasil',
        state: data.uf,
        city: data.localidade,
        neighborhood: data.bairro,
        street: data.logradouro,
        street_number: '',
        address_complement: '',
        zipcode: data.cep,
      }
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function setUserAddress(values: any) {
    for (const key in values) {
      if (key === 'shipping_is_payment') {
        checkout.value.shipping_is_payment = values.shipping_is_payment
      }
      checkout.value.user_address[key] = values[key]
    }
  }

  function setShippingAddress(values: any) {
    if (!checkout.value.shipping_address) {
      checkout.value.shipping_address = {
        address_id: 0,
        user_id: 0,
        country: 'Brasil',
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        street_number: '',
        address_complement: '',
        zipcode: '',
        active: false,
      }
    }
    for (const key in values) {
      checkout.value.shipping_address[key] = values[key]
    }
  }

  function setShippingIsPayment(value: boolean) {
    checkout.value.shipping_is_payment = value
  }

  return {
    cart,
    checkout,
    getCart,
    loading,
    estimate,
    getCartUser,
    addToCart,
    updateQuantity,
    calculateFreight,
    removeItem,
    addUserCart,
    addAddressCart,
    addMercadoPagoCreditCardPayment,
    getCartPreview,
    getAddressByZipcode,
    setUserAddress,
    setShippingAddress,
    setShippingIsPayment,
    finishCheckout,
  }
})
