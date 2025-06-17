<script setup lang="ts">
  import { CheckCircleIcon } from '@heroicons/vue/24/outline'

  interface Checkout {
    order_id: string
  }

  definePageMeta({
    layout: 'checkout',
    middleware: [
      function () {
        const { cart } = storeToRefs(useCartStore())

        if (!cart.value.cart_items.length) {
          return navigateTo('/cart')
        }
      },
    ],
  })

  useHead({
    title: 'Finalização Checkout',
  })

  const { t } = useI18n()
  const cartStore = useCartStore()
  const pending = $ref<boolean>(false)
  const checkout = $ref<Checkout>()

  const isPix = computed<boolean>(() => {
    return cartStore.payment.payment_method?.toUpperCase() === 'PIX'
  })

  onMounted(async () => {
    if (isPix.value) {
      checkout.value = {
        order_id: cartStore.cart.orderId as string,
      }
    } else {
      pending.value = true
      const response = await cartStore.finishCheckout()
      checkout.value = response
      pending.value = false
    }

    if (cartStore.cart.orderId) {
      cartStore.clearCart()
      cartStore.clearAffiliate()
    }
  })
</script>

<template>
  <div class="finish">
    <div v-if="pending" class="finish__container">
      <h2 class="finish__title">{{ t('finishCheckout.pending') }}</h2>
      <p class="finish__description">
        {{ t('finishCheckout.pendingDescription') }}
      </p>
      <n-space>
        <n-spin size="large" />
      </n-space>
    </div>
    <div v-else>
      <div v-if="checkout?.order_id" class="finish__container">
        <n-icon :size="80" color="#DA9A39">
          <CheckCircleIcon />
        </n-icon>
        <h2 class="finish__title">
          {{ t(`finishCheckout.${isPix ? 'pix' : 'card'}Title`) }}
        </h2>
        <p class="finish__description">{{ t('finishCheckout.description') }}</p>
        <NuxtLink to="/">
          <n-button type="primary" strong>
            {{ t('finishCheckout.button') }}
          </n-button>
        </NuxtLink>
      </div>

      <div v-else class="finish__container">
        <h2 class="finish__title">{{ t('finishCheckout.titleError') }}</h2>
        <p class="finish__description">
          {{ t('finishCheckout.descriptionError') }}
        </p>
        <NuxtLink to="/cart">
          <n-button type="primary" strong>
            {{ t('finishCheckout.buttonError') }}
          </n-button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .finish {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    width: 100%;

    &__container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

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
