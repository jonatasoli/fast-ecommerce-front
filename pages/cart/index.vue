<script setup>
import { computed, currencyFormat, useI18n } from '#imports'
import { useCartStore } from '@/stores/cart'
import InputCard from '~/components/cart/InputCard/InputCard.vue'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.cart)
const amountProducts = cartStore.amountProducts
const { t } = useI18n()
</script>

<template>
  <main class="cart">
    <div v-if="cartItems.length === 0" class="cart__empty">
      <p>{{ t("cart.empty") }} :(</p>
      <nuxt-link to="/">
        <n-button
          class="cart__button"
          quaternary
          type="primary"
          size="large"
        >
          {{ t("cart.continue") }}
        </n-button>
      </nuxt-link>
    </div>

    <div v-else class="cart__not-empty">
      <div class="cart__not-empty--container">
        <input-card
          icon="cart"
          :title="t('cart.inputs.shipping.title')"
          :button-text="t('cart.inputs.shipping.buttonText')"
        />
        <input-card
          icon="cupom"
          :title="t('cart.inputs.discount.title')"
          :button-text="t('cart.inputs.discount.buttonText')"
        />
      </div>
      <div class="cart__not-empty--container">
        <div class="cart__not-empty--products">
          <h1>{{ t("cart.title") }}<strong>.</strong></h1>
          <div class="table-container">
            <div class="table-header">
              <p>{{ t("cart.products.title") }}</p>
              <p>{{ t("cart.products.quantity") }}</p>
              <p>{{ t("cart.products.unitPrice") }}</p>
            </div>
            <div class="table-body">
              <div
                v-for="(item, i) in cartItems"
                :key="i"
                class="table-row"
              >
                <div class="product">
                  <img
                    :src="item.product.image"
                    alt=""
                    width="100"
                    height="100"
                  >
                  {{ item.product.name }}
                </div>
                <div class="quantity">
                  <n-input-number v-model:value="item.quantity" button-placement="both" />
                </div>
                <div class="value">
                  {{ currencyFormat(item.product.value) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cart__not-empty--summary">
          <div class="summary-values">
            <p>{{ t("cart.summary.products") }}</p>
            <p>{{ currencyFormat(amountProducts) }}</p>
          </div>
          <!-- TODO -->
          <div class="summary-values">
            <p>{{ t("cart.summary.discount") }}</p>
            <p>R$ 0.00</p>
          </div>
          <!-- TODO -->
          <div class="summary-values">
            <p>{{ t("cart.summary.shipping") }}</p>
            <p>R$ 0.00</p>
          </div>
          <hr>
          <!-- TODO -->
          <div class="summary-values amount">
            <p>{{ t("cart.summary.total") }}</p>
            <p>{{ currencyFormat(amountProducts) }}</p>
          </div>
          <n-button
            type="primary"
            strong
            class="btn-checkout"
          >
            {{ t("cart.finish") }}
          </n-button>
          <nuxt-link to="/">
            <n-button
              class="btn-continue-buying"
              quaternary
              strong
              type="primary"
              size="large"
            >
              {{ t("cart.continue") }}
            </n-button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/pages/cart.scss';
</style>
