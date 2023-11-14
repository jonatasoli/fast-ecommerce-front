import { loadMercadoPago } from '@mercadopago/sdk-js'
import { defineNuxtPlugin } from 'nuxt/app'

interface MercadoPago {
  createCardToken: (data: unknown) => Promise<unknown>
  getInstallments: (data: unknown) => Promise<unknown>
}

declare module '#app' {
  interface NuxtApp {
    $mercadoPago: MercadoPago
  }
}

type CustomWindow = {
  MercadoPago: unknown
} & Window & typeof globalThis

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
