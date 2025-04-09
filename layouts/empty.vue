<script lang="ts" setup>
  import { datePtBR, ptBR } from 'naive-ui'
  import { useLocaleHead, useNuxtApp, useRuntimeConfig } from '#imports'
  import { breakpoints, theme } from '@/naive.style'

  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()
  const head = useLocaleHead({
    addSeoAttributes: true,
  })

  nuxtApp.hook('page:finish', () => {
    window.scrollTo(0, 0)
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
        <n-notification-provider placement="top-left">
          <slot />
        </n-notification-provider>
      </n-config-provider>
    </Body>
  </Html>
</template>

<style lang="scss">
  @use '@/assets/scss/main.scss' as *;
</style>
