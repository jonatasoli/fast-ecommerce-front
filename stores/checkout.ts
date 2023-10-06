import { defineStore } from 'pinia'
import { reactive, ref } from '#imports'

interface Address {
  country: string
  state: string
  city: string
  neighborhood: string
  street: string
  street_number: string
  address_complement: string
  zipcode: string
}

interface Checkout {
  shipping_is_payment: boolean
  user_address: Address
  shipping_address: Address
}

export const useCheckoutStore = defineStore('checkout', () => {
  const loading = ref(false)
  const checkout = reactive<Checkout>({
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

  async function getAddressByZipcode(zipcode: string, typeAddress: string) {
    try {
      loading.value = true
      const res = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`)
      const data = await res.json()
      checkout[typeAddress] = {
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

  function setUserAddress(values: any) {
    for (const key in values) {
      if (key === 'shipping_is_payment') {
        checkout.shipping_is_payment = values.shipping_is_payment
      }
      checkout.user_address[key] = values[key]
    }
  }

  function setShippingAddress(values: any) {
    for (const key in values) {
      checkout.shipping_address[key] = values[key]
    }
  }

  function setShippingIsPayment(value: boolean) {
    checkout.shipping_is_payment = value
  }

  return {
    checkout,
    loading,
    getAddressByZipcode,
    setUserAddress,
    setShippingAddress,
    setShippingIsPayment,
  }
})
