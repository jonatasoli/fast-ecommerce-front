import { loadMercadoPago } from '@mercadopago/sdk-js'
import { defineNuxtPlugin } from 'nuxt/app'

interface createCardTokenProps {
  cardNumber: string
  cardholderName: string
  cardExpirationMonth: string
  cardExpirationYear: string
  securityCode: string
  identificationType: string
  identificationNumber: string
}

interface CardToken {
  id: string
  last_four_digits: string
}
interface getInstallmentsProps {
  amount: string
  bin: string
  paymentTypeId: string
}

interface Installments {
  payer_costs: {
    installments: number
    recommended_message: string
  }[]
}
interface MercadoPago {
  createCardToken: (data: createCardTokenProps) => Promise<CardToken>
  getInstallments: (data: getInstallmentsProps) => Promise<Installments>
}

declare module '#app' {
  interface NuxtApp {
    $mercadoPago: MercadoPago
  }
}

interface CustomMercadoPago {
  new (publicKey: string, options: { locale: string }): unknown
}

type CustomWindow = {
  MercadoPago: CustomMercadoPago
} & Window &
  typeof globalThis

export default defineNuxtPlugin(async (nuxtApp) => {
  await loadMercadoPago()

  const { $config } = nuxtApp
  const publicKey = $config.public.mercadoPagoPublicKey as string

  const mercadoPago = new (window as CustomWindow).MercadoPago(publicKey, {
    locale: 'pt-BR',
  })

  return {
    provide: {
      mercadoPago,
    },
  }
})
