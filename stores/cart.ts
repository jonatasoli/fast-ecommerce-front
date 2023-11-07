import { defineStore } from 'pinia'
import type { CartAddress, CartItem, CreditCardPayment, ShippingAddress, User, UserAddress } from '@/utils/types'
import { computed, ref, unref, useCookie, useFetch, useNuxtApp } from '#imports'

interface Cart {
  uuid: string
  freight: {
    price: number
    delivery_time: string
  }
  subtotal: string
  total: string
  zipcode: string
  cart_items: CartItem[]
}

interface Checkout {
  shipping_is_payment: boolean
  user_address_id: number | null
  shipping_address_id?: number
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
      subtotal: "0",
      total: "0",
      cart_items: [],
    }),
  })

  const address = ref<Omit<CartAddress, "shipping_is_payment">>({
    user_address: {
      active: true,
      address_complement: '',
      address_id: null,
      city: '',
      country: '',
      neighborhood: '',
      state: '',
      street: '',
      street_number: '',
      user_id: null,
      zipcode: '',
    },
    shipping_address: {
      active: true,
      address_complement: '',
      address_id: null,
      city: '',
      country: '',
      neighborhood: '',
      state: '',
      street: '',
      street_number: '',
      user_id: null,
      zipcode: '',
    },
  })

  const checkout = ref<Checkout>({
      shipping_is_payment: false,
      user_address_id: null,
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

  async function addUserCart() {
    try {
      const uuid = cart.value.uuid
      if (!uuid) {
        return
      }

      loading.value = true  
      const {data, error } = await useFetch(`/api/cart/${uuid}/user`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          ...cart.value,
        }),
      })

      if (unref(error)) {
        throw new Error("ERROR_ADD_USER_CART");
      }
      
      const responseData = unref(data) as {
        data: {
          uuid: string
          affiliate: string
          cart_items: CartItem[]
          coupon: string
          discount: string
          zipcode: string
          subtotal: string
          total: string
          freight: {
            price: number
            delivery_time: string
          }
          user_data: User
        }
        success: boolean
      }

      if (!responseData.success) {
        throw new Error("ERROR_ADD_USER_CART");
      }
      const { user_data: userCart, ...restCart } = responseData.data
     
      setUserCart(userCart)
      setCart(restCart)
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
      
      const { data, error } = await useFetch(`/api/cart/${uuid}/address`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: {
          cart: {
            ...cart.value,
            user_data: {
              ...checkout.value.user_data,
              user_id: null
            },
          },
          address: {
            shipping_is_payment: address.shipping_is_payment,
            user_address: {
              ...address.user_address,
              user_id: null,
              address_id: null,
              active: true,
              address_complement: address.user_address.address_complement || ""
            },
            shipping_address: {
              ...address.shipping_address,
              user_id: null,
              address_id: null,
              active: true,
              address_complement: ""
            }
          },
        }
      })

      if (unref(error)) {
        throw new Error("ERROR_ADD_ADDRESS_CART"); // FIXME: show an error message
      }

      const responseData = unref(data) as {
        data: {
          uuid: string
          affiliate: string
          cart_items: CartItem[]
          coupon: string
          discount: string
          zipcode: string
          subtotal: string
          total: string
          freight: {
            price: number
            delivery_time: string
          }
          user_data: User
          user_address_id: number
          shipping_address_id: number
          shipping_is_payment: boolean
        }
        success: boolean
      }

      if (!responseData.success) {
        throw new Error("ERROR_ADD_ADDRESS_CART"); // FIXME: show an error message
      }

      const {
        shipping_is_payment: shippingIsPayment,
        shipping_address_id: shippingAddressId,
        user_address_id: userAddressId,
        ...restCart
      } = responseData.data

      setShippingIsPayment(shippingIsPayment)
      setShippingAddress(address?.shipping_address ?? null)
      setUserAddress(address.user_address)
      setShippingAddressId(shippingAddressId)
      setUserAddressId(userAddressId)
      setCart(restCart)
     
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

      const { data, error } = await useFetch(`/api/cart/${uuid}/payment/credit_card`, {
        method: 'POST',
        headers,
        body: {
          cart: {
            ...cart.value,
            ...checkout.value,
            user_address_id: null,
            user_data: {
              ...checkout.value.user_data,
              user_id: null
            },
          },
          payment
        },
      })

      console.log(unref(data))
      console.log(unref(error))

      if (unref(error) || !unref(data)) {
        throw new Error("ERROR_ADD_MERCADO_PAGO_CREDIT_CARD_PAYMENT"); // FIXME: show an error message
      }
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
      return checkout.value[typeAddress] = {
        country: 'Brasil', // TODO: i18n
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

  function setCart(userCart: Cart) {
    cart.value = userCart
  }

  function setUserCart(userCart: User) {
    checkout.value.user_data = userCart
  }

  function setUserAddress(userAddress: UserAddress) {
    address.value.user_address = userAddress
  }

  function setShippingAddress(shippingAddress: ShippingAddress) {
    address.value.shipping_address = shippingAddress
  }

  function setUserAddressId(userAddressId: number) {
    checkout.value.user_address_id = userAddressId
  }

  function setShippingAddressId(shippingAddressId: number) {
    checkout.value.shipping_address_id = shippingAddressId
  }

  function setShippingIsPayment(value: boolean) {
    checkout.value.shipping_is_payment = value
  }

  return {
    cart,
    address,
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
    setUserAddressId,
    setShippingAddressId,
    setShippingIsPayment,
    finishCheckout,
  }
})
