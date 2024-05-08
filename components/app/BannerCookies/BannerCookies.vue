<script lang="ts" setup>
  const { t } = useI18n()

  defineProps<{
    acceptCookies: () => void
  }>()
</script>

<template>
  <div class="cookies">
    <p>
      {{ t('bannerCookies.message') }}
    </p>
    <n-button type="primary" size="large" strong @click="acceptCookies">
      {{ t('bannerCookies.accept') }}
    </n-button>
  </div>
</template>

<style scoped>
  div {
    background-color: #f1f1f1;
    color: #333;
    padding: 10px;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
</style>

<i18n lang="json">
{
  "pt-br": {
    "bannerCookies": {
      "accept": "Aceitar e fechar",
      "message": "Este site utiliza cookies para melhorar a sua experiência de navegação. Ao continuar a navegar no site, está a concordar com a nossa utilização de cookies."
    }
  }
}
</i18n>
