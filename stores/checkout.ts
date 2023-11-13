import { defineStore } from 'pinia'
import { useCartStore } from './cart'
import { ref, useNuxtApp } from '#imports'
import { Checkout } from '~/utils/types'

export const useCheckoutStore = defineStore('checkout', () => {
  const loading = ref(false)
  const { getCart } = useCartStore()
  const checkout = ref<Checkout>({
    shipping_is_payment: false,
    user_address: {
      country: 'Brasil',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      street_number: '',
      address_complement: '',
      zipcode: '',
    },
    shipping_address: {
      country: 'Brasil',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      street_number: '',
      address_complement: '',
      zipcode: '',
    },
  })
  const { $config } = useNuxtApp()
  const serverUrl = $config.public.serverUrl

  async function addUser(uuid: string, user: any) {
    try {
      loading.value = true
      const res = await fetch(`/api/cart/${uuid}/user`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          ...getCart,
          user,
        }),
      })
      const data = await res.json()
      checkout.value = data
    } catch (error) {
      console.error(error)
    }
  }

  async function addAddress(uuid: string) {
    try {
      loading.value = true
      const res = await fetch(`${serverUrl}/cart/${uuid}/address`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          shipping_is_payment: checkout.value.shipping_is_payment,
          user_address: checkout.value.user_address,
          shipping_address: checkout.value.shipping_address,
        }),
      })
      const data = await res.json()
      checkout.value = data
    } catch (error) {
      console.error(error)
    }
  }

  async function getAddressByZipcode(zipcode: string, typeAddress: string) {
    try {
      loading.value = true
      const res = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`)
      const data = await res.json()
      checkout.value[typeAddress] = {
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
    for (const key in values) {
      checkout.value.shipping_address[key] = values[key]
    }
  }

  function setShippingIsPayment(value: boolean) {
    checkout.value.shipping_is_payment = value
  }

  return {
    checkout,
    loading,
    getAddressByZipcode,
    setUserAddress,
    setShippingAddress,
    setShippingIsPayment,
    addUser,
    addAddress,
  }
})
