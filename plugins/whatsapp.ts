import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(({ $config }) => {
  const whatsappNumber = $config.public.whatsappNumber as string

  const openWhatsApp = (message = '') => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return {
    provide: {
      whatsapp: openWhatsApp,
    },
  }
})
