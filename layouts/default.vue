<script lang="ts" setup>
import { datePtBR, ptBR } from 'naive-ui'
import { useLocaleHead, useRuntimeConfig } from '#imports'
import { AppFooter, AppHeader } from '@/components/app'
import { breakpoints, theme } from '@/naive.style'

const config = useRuntimeConfig()
const head = useLocaleHead({
  addSeoAttributes: true,
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
          <AppFooter />
        </n-notification-provider>
      </n-config-provider>
    </Body>
  </Html>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
