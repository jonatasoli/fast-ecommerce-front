<script lang="ts" setup>
  import { datePtBR, ptBR } from 'naive-ui'
  import { useLocaleHead, useRuntimeConfig } from '#imports'
  import { breakpoints, theme } from '@/naive.style'

  const config = useRuntimeConfig()
  const head = useLocaleHead({
    addSeoAttributes: true,
  })
  const Logo = config.public.urlLogo
  const AltLogo = config.public.urlAltLogo
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
          <header class="header">
            <div class="header__top">
              <NuxtLink to="/" class="logo">
                <img :src="Logo" :alt="AltLogo" />
              </NuxtLink>
            </div>
          </header>
          <slot />
        </n-notification-provider>
      </n-config-provider>
    </Body>
  </Html>
</template>

<style lang="scss">
  @use '@/assets/scss/main.scss' as *;

  .header {
    background-color: #000000;
    width: 100%;
    top: 0;

    &__top {
      display: flex;
      align-items: center;
      max-width: 1366px;
      padding: 0.5rem 1rem;
      margin: 0 auto;
      gap: 1rem;

      @media (min-width: 768px) {
        gap: 2rem;
      }

      .logo {
        flex: 0 0 auto;
        display: inline-flex;
        align-items: center;
        height: 3rem;

        img {
          height: 100%;
          width: auto;
        }

        @media (min-width: 768px) {
          height: 4rem;
        }
      }
    }
  }
</style>
