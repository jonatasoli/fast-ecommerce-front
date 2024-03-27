type CustomWindow = {
  dataLayer: unknown[]
} & Window &
  typeof globalThis

export default defineNuxtPlugin(() => {
  const { gtagId, isProd } = useRuntimeConfig().public
  function gtag(...arg: unknown[]) {
    ;(window as CustomWindow).dataLayer.push(arg)
  }

  ;(window as CustomWindow).dataLayer = (window as CustomWindow).dataLayer || []

  gtag('js', new Date())
  gtag('config', gtagId)

  if (!isProd) {
    return
  }

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
        async: true,
      },
    ],
  })
})
