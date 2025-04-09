<script lang="ts" setup>
  import { datePtBR, ptBR } from 'naive-ui'
  import { useLocaleHead, useRuntimeConfig } from '#imports'
  import { AppFooter, AppHeader } from '@/components/app'
  import { breakpoints, theme } from '@/naive.style'
  import WhatsappButton from '~/components/whatsappButton/whatsappButton.vue'

  const config = useRuntimeConfig()
  const head = useLocaleHead({
    addSeoAttributes: true,
  })
  const showBanner = ref(true)
  const cookiesAccepted = computed(() => {
    return localStorage.getItem('cookiesAccepted') === 'true'
  })
  const { gtag, initialize } = useGtag()

  function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true')
    initialize()
    gtag('consent', 'update', {
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      ad_storage: 'granted',
      analytics_storage: 'granted',
    })
    showBanner.value = false
  }

  onMounted(() => {
    if (cookiesAccepted.value) {
      initialize()
      gtag('consent', 'update', {
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        ad_storage: 'granted',
        analytics_storage: 'granted',
      })
      showBanner.value = false
    }
  })
</script>

<template>
  <Html :lang="head.htmlAttrs?.lang">
    <Head>
      <Title>Gatto Rosa</Title>
      <template v-if="config.public.isProd">
        <Link v-for="link in head.link" :key="link.id" v-bind="link" />
        <Meta v-for="meta in head.meta" :key="meta.id" v-bind="meta" />
      </template>
    </Head>
    <Body>
      <n-config-provider
        :locale="ptBR"
        :date-locale="datePtBR"
        :theme-overrides="theme"
        :breakpoints="breakpoints"
      >
        <n-notification-provider>
          <AppHeader />
          <slot />
          <BannerCookies v-if="showBanner" :accept-cookies="acceptCookies" />
          <WhatsappButton
            message="Olá, gostaria de fazer um pedido!"
            button-text="Fale Conosco"
          />
          <AppFooter />
        </n-notification-provider>
      </n-config-provider>
    </Body>
  </Html>
</template>

<style lang="scss">
  @use '@/assets/scss/main.scss' as *;
</style>
