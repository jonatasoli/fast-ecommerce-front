import DOMPurify from 'dompurify'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('sanitize', DOMPurify.sanitize)
})
