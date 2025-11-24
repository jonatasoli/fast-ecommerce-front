<script setup lang="ts">
  import {
    useNuxtApp,
    onBeforeMount,
    useRoute,
    useRuntimeConfig,
    useHead,
    useI18n,
  } from '#imports'
  import { useUserStore } from '@/stores/user'
  import { useCategoryStore } from '@/stores/categories'
  import { useCartStore } from '@/stores/cart'

  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()
  const { t } = useI18n()
  const Logo = config.public.urlLogo

  useHead({
    titleTemplate: (title) => (title ? `${title} | Gattorosa` : t('seo.title')),

    meta: [
      { name: 'description', content: t('seo.description') },

      { property: 'og:site_name', content: 'Gattorosa' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: t('seo.ogTitle') },
      { property: 'og:description', content: t('seo.ogDescription') },
      {
        property: 'og:image',
        content: Logo,
      },
    ],

    link: [{ rel: 'canonical', href: config.public.serverUrl }],
  })

  const storeUser = useUserStore()
  const storeCategory = useCategoryStore()
  const cartStore = useCartStore()
  const route = useRoute()
  const affiliate: string = route.query.affiliate as string
  const coupon = (route.query.coupon as string) || ''

  onBeforeMount(async () => {
    await storeUser.getUser()
    await storeCategory.getCategorys()
    await nuxtApp.$router.isReady()

    if (affiliate) {
      await cartStore.setAffiliate(affiliate)
    }
    if (coupon) {
      await cartStore.setCoupon(coupon)
    }
  })

  nuxtApp.hook('page:finish', () => {
    window.scrollTo(0, 0)
  })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
