import { defineNuxtPlugin } from 'nuxt/app'

// Define the Tawk.to plugin
const tawktoPlugin = defineNuxtPlugin(async ({ app }) => {
  // Load Tawk.to script
  const loadTawkTo = () => {
    ;(function () {
      const s1 = document.createElement('script')
      const s0 = document.getElementsByTagName('script')[0]
      s1.async = true
      s1.src = 'https://embed.tawk.to/655ca04bd600b968d31578a7/1hfot4adv'
      s1.charset = 'UTF-8'
      s1.setAttribute('crossorigin', '*')
      s0.parentNode?.insertBefore(s1, s0)
    })()
  }

  // Load Tawk.to on Nuxt app initialization
  await loadTawkTo()

  // Expose Tawk_API to the Vue instance
  if (app) {
    app.tawk_API = window.Tawk_API
  }
})

export default tawktoPlugin
