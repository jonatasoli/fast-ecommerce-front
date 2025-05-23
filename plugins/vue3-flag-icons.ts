import { defineNuxtPlugin } from '#app'
import FlagIcon from 'vue3-flag-icons'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FlagIcon', FlagIcon)
})
