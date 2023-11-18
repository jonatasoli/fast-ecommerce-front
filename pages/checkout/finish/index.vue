<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/outline';

definePageMeta({ 
  layout: 'checkout'
})
const { t } = useI18n()
</script>

<template>
  <div class="finished">
    <div>
      <n-icon :size="80" color="#DA9A39">
        <CheckCircleIcon />
      </n-icon>
    </div>
    <div>
      <h2 class="finished__title">{{ t('finishCheckout.title') }}</h2>
      <p class="finished__description">{{ t('finishCheckout.description') }}</p>
    </div>
    <NuxtLink to="/">
      <n-button type="primary" strong>{{ t('finishCheckout.button') }}</n-button>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
  .finished {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    width: 100%;
    
    &__title {
      font-size: 1.5rem;
      font-weight: 500;
      margin: 0;
      text-align: center;

    }

    &__description {
      font-size: 1rem;
      font-weight: 400;
      margin: 0 0 2rem 0;
      text-align: center;
    }
  }
</style>

