// plugins/recaptcha.js
export default defineNuxtPlugin((nuxtApp) => {
  const { $config } = nuxtApp
  const recaptchaSrc = $config.public.recaptchaSecretKey as string
  if (process.client) {
    const script = document.createElement('script')
    script.src = recaptchaSrc
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
