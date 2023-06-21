// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/device', [
    '@nuxtjs/google-fonts',
    {
      families: {
        Poppins: true,
        Lato: true,
        Montserrat: true,
        download: true,
        inject: true,
      },
    },
  ]],
})
