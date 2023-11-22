<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/outline';

definePageMeta({
  layout: 'checkout',
  middleware: [
    function () {
      const { cart } = storeToRefs(useCartStore());

      if (!cart.value.cart_items.length) {
        return navigateTo('/cart');
      }
    },
  ],
});
const { t } = useI18n();
const { checkout } = storeToRefs(useCheckoutStore());

const title = unref(checkout).order_id
  ? t('finishCheckout.title')
  : t('finishCheckout.titleError');
const description = unref(checkout).order_id
  ? t('finishCheckout.description')
  : t('finishCheckout.descriptionError');
const buttonText = unref(checkout).order_id
  ? t('finishCheckout.button')
  : t('finishCheckout.buttonError');
const redirect = unref(checkout).order_id ? '/' : '/cart';
</script>

<template>
  <div class="finished">
    <div v-if="checkout.order_id">
      <n-icon :size="80" color="#DA9A39">
        <CheckCircleIcon />
      </n-icon>
    </div>
    <div>
      <h2 class="finished__title">{{ title }}</h2>
      <p class="finished__description">{{ description }}</p>
    </div>
    <NuxtLink :to="redirect">
      <n-button type="primary" strong>{{ buttonText }}</n-button>
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
