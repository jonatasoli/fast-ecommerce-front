<script lang="ts" setup>
import { useLocaleHead, useNuxtApp, useRuntimeConfig } from '#imports'
import { AppHeader } from '@/components/app'

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
        <Link
          v-for="link in head.link"
          :key="link.id"
          v-bind="link"
        />
        <Meta
          v-for="meta in head.meta"
          :key="meta.id"
          v-bind="meta"
        />
      </template>
    </Head>
  </Html>
  <Body>
    <app-header />
    <slot />
  </Body>
</template>
