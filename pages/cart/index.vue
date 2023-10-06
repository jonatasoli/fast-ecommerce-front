<script setup>
import { storeToRefs } from 'pinia'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { useDebounceFn } from '@vueuse/core'
import { currencyFormat, useI18n } from '#imports'
import { useCartStore } from '@/stores/cart'
import InputCard from '~/components/cart/InputCard/InputCard.vue'

const cartStore = useCartStore()
const { getCart } = storeToRefs(cartStore)
const { t } = useI18n()

function handleEstimateFreight(value) {
  cartStore.calculateFreight(value)
}

const debounceFn = useDebounceFn((id, quantity) => {
  cartStore.updateQuantity(id, quantity)
}, 1000, { maxWait: 5000 })

function updateQuantity(id, quantity) {
  debounceFn(id, quantity)
}
</script>

<template>
  <main class="cart">
    <div v-if="cartStore.loadingCart" class="cart__loading">
      <n-space>
        <n-spin size="large" />
      </n-space>
    </div>
    <div v-else>
      <div v-if="cartStore.getCart.cart_items.length === 0" class="cart__empty">
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
          <div>
            <InputCard
              icon="cart"
              :title="t('cart.inputs.shipping.title')"
              :button-text="t('cart.inputs.shipping.buttonText')"
              placeholder="Informe seu CEP"
              :received-value="getCart.zipcode"
              @on-button-click="handleEstimateFreight"
            >
              <div v-if="getCart?.freight?.price" class="cart__freigth">
                <div>{{ t('cart.freight.part1') }} {{ getCart.freight.delivery_time }} {{ t('cart.freight.part2') }}</div>
                <div>{{ currencyFormat(getCart.freight.price, undefined, 'freight') }}</div>
              </div>
            </InputCard>
          </div>
          <InputCard
            icon="cupom"
            :title="t('cart.inputs.discount.title')"
            placeholder="Cupom de desconto"
            :button-text="t('cart.inputs.discount.buttonText')"
            received-value=""
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
                  v-for="(item) in getCart.cart_items"
                  :key="item.product_id"
                  class="table-row"
                >
                  <div class="product">
                    <img
                      :src="item.image_path"
                      alt=""
                      width="100"
                      height="100"
                    >
                    {{ item.name }}
                  </div>
                  <div class="quantity">
                    <n-input-number
                      v-model:value="item.quantity"
                      button-placement="both"
                      :min="1"
                      :max="999"
                      on
                      @update:value="updateQuantity(item.product_id, $event)"
                    />
                  </div>
                  <div class="value">
                    {{ currencyFormat(item?.price) }}
                  </div>
                  <div>
                    <n-button
                      class="btn-remove"
                      quaternary
                      type="primary"
                      size="large"
                      @click="cartStore.removeItem(item.product_id)"
                    >
                      <template #icon>
                        <TrashIcon />
                      </template>
                    </n-button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="cart__not-empty--summary">
            <div class="summary-values">
              <p>{{ t("cart.summary.products") }}</p>
              <p>{{ currencyFormat(getCart.subtotal) }}</p>
            </div>

            <div class="summary-values">
              <p>{{ t("cart.summary.discount") }}</p>
              <p>R$ 0.00</p>
            </div>

            <div class="summary-values">
              <p>{{ t("cart.summary.shipping") }}</p>
              <p> {{ currencyFormat(getCart?.freight?.price, undefined, 'freight') || 0 }}</p>
            </div>
            <hr>

            <div class="summary-values amount">
              <p>{{ t("cart.summary.total") }}</p>
              <p>{{ currencyFormat(getCart.subtotal) }}</p>
            </div>
            <nuxt-link to="/checkout">
              <n-button
                type="primary"
                strong
                class="btn-checkout"
              >
                {{ t("cart.finish") }}
              </n-button>
            </nuxt-link>
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
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/pages/cart.scss';
</style>
