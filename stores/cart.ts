import { defineStore } from 'pinia'
import type { Cart, CartAddress, CartItem, Checkout, CreditCardPayment, Payment, ShippingAddress, User, UserAddress } from '@/utils/types'
import { computed, ref, unref, useCookie, useFetch, useNuxtApp, type CreditCard } from '#imports'

export const useCartStore = defineStore('cart', () => {
  const cart = useCookie<Cart>('cart', {
   default: () => ref({
      uuid: '',
      affiliate: '',
      coupon: '',
      discount: '',
      freight: {
        price: '',
        delivery_time: '',
      },
      zipcode: '',
      subtotal: "0",
      total: "0",
      cart_items: [],
    }),
  })

  const address = ref<CartAddress>({
    shipping_is_payment: false,
    user_address_id: null,
    shipping_address_id: null,
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

  const user = ref<{user_data: User}>({
    user_data: {
      user_id: null,
      name: '',
      email: '',
      phone: '',
      document: ''  
    },
  })

  const paymentCreditCard = ref<CreditCard>({
    creditCardNumber: '',
    creditCardName: '',
    creditCardExpiration: '',
    creditCardCvv: '',
    installments: 1,
    typeDocument: '',
    document: '',
  })

  const payment = ref<Payment>({
    payment_method: '',
    payment_method_id: '',
    payment_intent: '',
    customer_id: '',
    card_token: '',
    pix_qr_code: '',
    pix_qr_code_base64: '',
    pix_payment_id: 0,
    gateway_provider: '',
    installments: 0,
  })

  const loading = ref(false)
  const getCart = computed(() => cart.value)
  const { $config } = useNuxtApp()
  const serverUrl = $config.public.serverUrl

  function addToCart(item: CartItem) {
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
          const {data, error} = await useFetch(`${serverUrl}/cart/`, {
            method: 'POST',
            headers,
          })

          if (unref(error)) {
            error.value = null
            return;
          }
          const responseData = unref(data) as {
            uuid: string
          }
          cart.value.uuid = responseData.uuid
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
        const { data, error} = await useFetch(`${serverUrl}/cart/${uuid}/product`, {
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
        if (unref(error)) {
          error.value = null
          return;
        }

        const responseData = unref(data) as Cart

        setCart(unref(responseData))
        
        const responseEstimateData = await estimate()
        if (!responseEstimateData) {
          return
        }
        setCart(responseEstimateData)
      } catch (err) {
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    createCart().then((data) => {
      const responseData = unref(data) as {
        uuid: string
      }
      if(!responseData) {
        return
      }
      addProduct(responseData.uuid)
    })
  }

  async function updateQuantity(id: number, quantity: number | null) {
    try {
      const product = cart.value.cart_items.find(p => p.product_id === id)
      if (!product || !quantity) {
        return
      }
      product.quantity = quantity
      const responseData = await estimate()
      if (!responseData) {
        return
      }
      setCart(responseData)
    } catch (err) {
      console.error(err)
    }
  }

  async function estimate() {
    try {
      loading.value = true
      const headers = {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      }
      const { data, error } = await useFetch(`${serverUrl}/cart/${cart.value.uuid}/estimate`, {
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

      if (unref(error)) {
        error.value = null
        return;
      }

      const responseData = unref(data) as Cart
      return responseData
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function removeItem(id: number) {
    try {
      const cartItems = unref(cart).cart_items
      cart.value.cart_items = cartItems.filter(p => p.product_id !== id)
      if (cartItems.length === 1) {
        cart.value.uuid = ''
        return
      }
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
      const responseData = await estimate()
      if (!responseData) {
        return
      }
      setCart(responseData)
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
        data: Cart & {
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
            user_data: user.value.user_data,
          },
          address: {
            shipping_is_payment: address.shipping_is_payment,
            user_address: {
              ...address.user_address,
              user_id: user.value.user_data.user_id,
              address_id: null,
              active: true,
              address_complement: address.user_address.address_complement || ""
            },
            shipping_address: {
              ...address.shipping_address,
              user_id: user.value.user_data.user_id,
              address_id: null,
              active: true,
              address_complement: address.shipping_address?.address_complement || ""
            }
          },
        }
      })

      if (unref(error)) {
        error.value = null
        throw new Error("ERROR_ADD_ADDRESS_CART"); // FIXME: show an error message
      }

      const responseData = unref(data) as {
        data: Cart & {
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
            shipping_is_payment: address.value.shipping_is_payment,
            user_address_id: address.value.user_address_id,
            user_data: user.value.user_data,
          },
          payment
        },
      })

      if (unref(error) || !unref(data)) {
        throw new Error("ERROR_ADD_MERCADO_PAGO_CREDIT_CARD_PAYMENT"); // FIXME: show an error message
      }

      const responseData = unref(data) as {
        success: boolean
        data: Checkout
      }

      return unref(responseData)
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

      const {data, error} = await useFetch(`api/cart/${uuid}/preview`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      
      if (unref(error)) {
        error.value = null
        return;
      }

      const responseData = unref(data) as {
        success: boolean
        data: Checkout
        }
      setCart(responseData.data)
      setUserAddressId(responseData.data.user_address_id)
      setShippingAddressId(responseData.data.shipping_address_id)
      setShippingIsPayment(responseData.data.shipping_is_payment)
      setPayment(responseData.data)
      return responseData
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

      const { data, error } = await useFetch(`api/cart/${uuid}/checkout`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...cart.value,
          ...user.value,
          ...payment.value,
          shipping_is_payment: address.value.shipping_is_payment,
          user_address_id: address.value.user_address_id,
          shipping_address_id: address.value.shipping_address_id,
        }),
      })
       
      if (unref(error)) {
        error.value = null
        return;
      }

      const responseData = unref(data) as {
        status: string
        message: string
        order_id: string
      }
      return responseData
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  function clearCart() {
    cart.value = {
      uuid: '',
      affiliate: '',
      coupon: '',
      discount: '',
      freight: {
        price: '',
        delivery_time: '',
      },
      zipcode: '',
      subtotal: "0",
      total: "0",
      cart_items: [],
    }
  }

  async function getAddressByZipcode(zipcode: string, typeAddress: string) {
    try {
      loading.value = true
      const { data, error} = await useFetch(`https://viacep.com.br/ws/${zipcode}/json/`)
      if (unref(error)) {
        error.value = null
        return;
      }

      const responseData = unref(data) as {
        cep: string
        logradouro: string
        complemento: string
        bairro: string
        localidade: string
        uf: string
        ibge: string
        gia: string
        ddd: string
        siafi: string
      }
      
       address.value[typeAddress] = {
        country: 'Brasil', // TODO: i18n
        state: responseData.uf,
        city: responseData.localidade,
        neighborhood: responseData.bairro,
        street: responseData.logradouro,
        street_number: '',
        address_complement: '',
        zipcode: responseData.cep,
      }

      return address.value[typeAddress]
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
    user.value.user_data = userCart
  }

  function setUserAddress(userAddress: UserAddress) {
    address.value.user_address = userAddress
  }

  function setShippingAddress(shippingAddress: ShippingAddress) {
    address.value.shipping_address = shippingAddress
  }

  function setUserAddressId(userAddressId: number) {
    address.value.user_address_id = userAddressId
  }

  function setShippingAddressId(shippingAddressId: number | null) {
    address.value.shipping_address_id = shippingAddressId
  }

  function setShippingIsPayment(value: boolean) {
    address.value.shipping_is_payment = value
  }

  function setPayment(paymentUser: Payment) {
    payment.value = paymentUser
  }

  function setPaymentCreditCard(paymentCreditCardUser: CreditCard) {
    paymentCreditCard.value = paymentCreditCardUser
  }

  return {
    cart,
    address,
    getCart,
    loading,
    paymentCreditCard,
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
    setPaymentCreditCard,
    finishCheckout,
    clearCart,

  }
})
