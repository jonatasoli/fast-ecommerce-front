<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { TrashIcon } from '@heroicons/vue/24/outline'
  import { useDebounceFn } from '@vueuse/core'
  import { useNotification } from 'naive-ui'
  import { currencyFormat, useI18n, type CartItem } from '#imports'
  import { useCartStore } from '@/stores/cart'
  import InputCard from '~/components/cart/InputCard/InputCard.vue'
  import { RadioInput } from '~/components/cart'

  const cartStore = useCartStore()
  const notification = useNotification()
  const { getCart, coupon, loading } = storeToRefs(cartStore)
  const { t } = useI18n()
  const checkedFreightProductCode = ref('PAC')
  const validationCEP = ref<'error' | 'success' | 'warning' | undefined>(
    undefined,
  )
  const validationCoupon = ref<'error' | 'success' | 'warning' | undefined>(
    undefined,
  )
  const messageInvalidCoupon = ref('')
  const messageInvalidCEP = ref('')
  const cart = ref<Cart>()

  const { data, pending, error, refresh: refreshEstimate } = await useEstimate()

  async function handleEstimateFreight(value) {
    await cartStore.calculateFreight(value, unref(checkedFreightProductCode))
    await refreshEstimate()
    if (unref(error)) {
      handleFreightError(unref(error))
      return
    }

    messageInvalidCEP.value = ''
    validationCEP.value = undefined
  }

  function handleFreightError(error) {
    if (unref(error) === 'INVALID_CEP') {
      messageInvalidCEP.value = 'CEP Inválido'
      validationCEP.value = 'error'
      cartStore.clearFreight()
    } else {
      notification.error({
        title: 'Erro',
        content:
          'Algo deu errado ao calcular o frete. Tente novamente mais tarde.',
        duration: 2500,
      })
    }
  }

  async function handleAddCoupon(value) {
    const response = await cartStore.addCoupon(value)
    await refreshEstimate()
    if (unref(error) === 'INVALID_COUPON') {
      validationCoupon.value = 'error'
      messageInvalidCoupon.value = 'Cupom Inválido'
      await cartStore.clearDiscount()
      await cartStore.setCoupon('')
      return
    }
    validationCoupon.value = undefined
    messageInvalidCoupon.value = ''
    return response
  }

  const debounceFn = useDebounceFn(
    async () => {
      const cartItems = cart.value?.cart_items
      if (!cartItems) {
        return
      }
      await refreshEstimate(cartItems)

      if (unref(data)?.detail === 'Product Sold Out.') {
        notification.error({
          title: 'Erro',
          content: 'A quantidade solicitada não está disponível no estoque.',
          duration: 2500,
        })
      }
    },
    1000,
    { maxWait: 5000 },
  )

  function updateQuantity() {
    debounceFn()
  }

  function handleRemoveItem(productId) {
    cartStore.removeItem(productId)
    refreshEstimate()
  }

  function handleRadioChange(value) {
    checkedFreightProductCode.value = value
  }

  watch(
    () => unref(data),
    () => {
      const receivedValue = unref(data)
      if (receivedValue?.cart_items) {
        cartStore.setCart(receivedValue)
        cart.value = receivedValue
      }
    },
  )

  onUpdated(() => {
    if (cartStore.getCart.freight_product_code === null) {
      cartStore.getCart.freight_product_code = 'PAC'
    }
  })

  function calculateDiscount(item: CartItem) {
    return (
      currencyFormat(item.price - item.discount_price) ||
      currencyFormat(item.price)
    )
  }
</script>

<template>
  <main class="cart">
    <div v-if="pending || loading" class="cart__loading">
      <n-space>
        <n-spin size="large" />
      </n-space>
    </div>
    <div v-else>
      <div v-if="!cart?.cart_items?.length" class="cart__empty">
        <p>{{ t('cart.empty') }} :(</p>

        <nuxt-link to="/">
          <n-button class="cart__button" quaternary type="primary" size="large">
            {{ t('cart.continue') }}
          </n-button>
        </nuxt-link>
      </div>

      <div v-else class="cart__not-empty">
        <div class="cart__not-empty--container">
          <InputCard
            icon="cupom"
            :title="t('cart.inputs.discount.title')"
            placeholder="Cupom de desconto"
            :button-text="t('cart.inputs.discount.buttonText')"
            :received-value="coupon"
            :validation="validationCoupon"
            :message="messageInvalidCoupon"
            @on-button-click="handleAddCoupon"
          />
          <InputCard
            icon="cart"
            :title="t('cart.inputs.shipping.title')"
            :button-text="t('cart.inputs.shipping.buttonText')"
            placeholder="Informe seu CEP"
            :received-value="getCart.zipcode"
            mask="#####-###"
            :validation="validationCEP"
            :message="messageInvalidCEP"
            @on-button-click="handleEstimateFreight"
          >
            <div v-if="cart?.freight?.price" class="cart__freigth">
              <div>
                {{ t('cart.freight.part1') }}
                {{ cart.freight.delivery_time }}
                {{ t('cart.freight.part2') }}
              </div>
              <div>
                {{ currencyFormat(cart.freight.price, undefined, 'freight') }}
              </div>
            </div>
          </InputCard>
          <RadioInput
            :checked-value="checkedFreightProductCode"
            @radio-change="handleRadioChange"
          >
          </RadioInput>
        </div>
        <div class="cart__not-empty--container">
          <div class="cart__not-empty--products">
            <h1>{{ t('cart.title') }}<strong>.</strong></h1>
            <div class="table-container">
              <div class="table-header">
                <p>{{ t('cart.products.title') }}</p>
                <p>{{ t('cart.products.quantity') }}</p>
                <p>{{ t('cart.products.unitPrice') }}</p>
              </div>
              <div class="table-body">
                <div
                  v-for="item in cart?.cart_items"
                  :key="item.product_id"
                  class="table-row"
                >
                  <div class="product">
                    <img
                      :src="item.image_path"
                      alt=""
                      width="100"
                      height="100"
                    />
                    {{ item.name }}
                  </div>
                  <div class="quantity">
                    <n-input-number
                      v-model:value="item.quantity"
                      button-placement="both"
                      :min="1"
                      :max="999"
                      on
                      @update:value="updateQuantity"
                    />
                  </div>
                  <div class="container-price">
                    <p v-if="Number(item.discount_price)" class="old-price">
                      De: {{ currencyFormat(item?.price) }}
                    </p>
                    <p class="price">
                      <span v-if="Number(item.discount_price)">Por:</span>
                      {{ calculateDiscount(item) }}
                    </p>
                  </div>
                  <div>
                    <n-button
                      class="btn-remove"
                      quaternary
                      type="primary"
                      size="large"
                      @click="handleRemoveItem(item.product_id)"
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
              <p>{{ t('cart.summary.products') }}</p>
              <p>{{ currencyFormat(cart.subtotal) }}</p>
            </div>

            <div v-if="cart.discount !== '0'" class="summary-values">
              <p>{{ t('cart.summary.discount') }}</p>
              <p>- {{ currencyFormat(cart.discount) }}</p>
            </div>

            <div class="summary-values">
              <p>{{ t('cart.summary.shipping') }}</p>
              <p>
                {{
                  currencyFormat(cart?.freight?.price, undefined, 'freight') ||
                  0
                }}
              </p>
            </div>
            <hr />

            <div class="summary-values amount">
              <p>{{ t('cart.summary.total') }}</p>
              <p>{{ currencyFormat(cart.total) }}</p>
            </div>

            <p v-if="!getCart?.freight?.price" class="alert-freight">
              Calcule o frete para finalizar a compra
            </p>
            <nuxt-link v-else to="/checkout">
              <n-button
                :disabled="!getCart?.freight?.price"
                type="primary"
                strong
                class="btn-checkout"
              >
                {{ t('cart.finish') }}
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
                {{ t('cart.continue') }}
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
