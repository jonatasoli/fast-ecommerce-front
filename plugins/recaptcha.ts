// plugins/recaptcha.js
export default defineNuxtPlugin(() => {
  if (process.client) {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=6LdTEDUqAAAAAIJKc7S2PyXtqrfIDpDkrYeD54_A`
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }

  const style = document.createElement('style')
  style.innerHTML = `
      .grecaptcha-badge {
  width: 70px !important;
  overflow: hidden !important;
  transition: all 0.3s ease !important;
  left: 4px !important;
}

.grecaptcha-badge:hover {
  width: 256px !important;
}
    `
  document.head.appendChild(style)
})
