<script setup>
  import { useI18n } from '#imports'
  defineProps({
    error: {
      type: Object,
      default: () => ({}),
    },
  })

  const { t } = useI18n()
  const config = useRuntimeConfig()
  const Logo = config.public.urlLogo
  const AltLogo = config.public.urlAltLogo
</script>
<template>
  <div class="error-page">
    <div class="logo">
      <img :src="Logo" :alt="AltLogo" />
    </div>
    <p class="error-message">
      {{ t('pageNotFound.notFound') }}
    </p>
    <nuxt-link to="/">
      <p class="error-link">
        {{ t('pageNotFound.home') }}
      </p>
    </nuxt-link>
  </div>
</template>

<style lang="scss" scoped>
  $error-bg-color: #f7f7f7;
  $error-text-color: #333;
  $error-code-color: #e63946;
  $error-link-color: #0077cc;
  $error-link-hover: #005fa3;

  .logo {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    height: 5rem;

    img {
      height: 100%;
      width: auto;
    }

    @media (min-width: 768px) {
      height: 8rem;
    }
  }

  .error-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    background-color: $error-bg-color;
    color: $primary-color;
    font-family: Arial, sans-serif;

    .error-code {
      font-size: 6rem;
      font-weight: bold;
      color: $primary-color;
      margin: 0;
    }

    .error-message {
      font-size: 1.5rem;
      margin: 1rem 0;
    }

    .error-link {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      margin-top: 1rem;
      font-size: 1rem;
      color: #fff;
      background-color: $primary-color;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: $primary-color-hover;
      }
    }
  }
</style>
