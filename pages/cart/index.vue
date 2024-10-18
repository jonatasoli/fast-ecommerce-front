<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { TrashIcon } from '@heroicons/vue/24/outline'
  import { useDebounceFn } from '@vueuse/core'
  import { useNotification } from 'naive-ui'
  import { currencyFormat, useI18n, type CartItem } from '#imports'
  import { useCartStore } from '@/stores/cart'
  import InputCard from '~/components/cart/InputCard/InputCard.vue'
  import { RadioInput } from '~/components/cart'

  useHead({
    title: 'Carrinho',
  })

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
    if (!value || value.trim() === '') {
      messageInvalidCEP.value = t('checkout.shipping.form.zipcodeInvalid')
      validationCEP.value = 'error'
      getCart.value.zipcode = value
      return
    }
    await cartStore.calculateFreight(value, unref(checkedFreightProductCode))
    const cartItems = cart.value?.cart_items
    await refreshEstimate(cartItems)
    if (unref(error)) {
      handleFreightError(unref(error))
      return
    }

    messageInvalidCEP.value = ''
    validationCEP.value = undefined
  }

  function handleFreightError(error) {
    if (unref(error) === 'INVALID_CEP') {
      messageInvalidCEP.value = t('checkout.shipping.form.zipcodeInvalid')
      validationCEP.value = 'error'
      cartStore.clearFreight()
    } else {
      notification.error({
        title: t('register.notification.validationCep.error.title'),
        content: t('register.notification.validationCep.error.contentFreight'),
        duration: 2500,
      })
    }
  }

  async function handleAddCoupon(value) {
    const response = await cartStore.addCoupon(value)
    await refreshEstimate()
    if (unref(error) === 'INVALID_COUPON') {
      validationCoupon.value = 'error'
      messageInvalidCoupon.value = t('checkout.shipping.form.invalidCoupon')
      
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
      const zipcode = cart.value?.zipcode
      if (!cartItems) {
        return
      }
      await refreshEstimate(cartItems)
      if (zipcode) {
        await handleEstimateFreight(zipcode)
      }

      if (unref(data)?.detail === 'Product Sold Out.') {
        notification.error({
          title: t('register.notification.validationCep.error.title'),
          content: t('register.notification.validationCep.error.contentStock'),

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

  async function handleRemoveItem(productId: number) {
    cartStore.removeItem(productId)
    const cartItems = cart.value?.cart_items

    await refreshEstimate(cartItems)
  }

  async function handleRadioChange(value) {
    checkedFreightProductCode.value = value

    await handleEstimateFreight(getCart.value.zipcode)
  }


  function currencyFormatFreight(
    value: number,
    locale = 'pt-BR',
    type?: string,
  ): string {
    if (value === 0.01 && type === 'freight') {
      return t('config.free')

    }

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
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

  const formattedTotal = computed(() => {
    return validationCEP.value === 'error'
      ? 0
    : currencyFormat(cart.value?.total)

  })
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
          <n-button class="cart__button" type="primary" size="large" quaternary>
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
                {{

                  currencyFormatFreight(
                    Number(cart.freight.price),
                    undefined,
                    'freight',
                  )
                }}
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
                      :max="item.available_quantity"
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

                  cart?.freight?.price !== undefined &&
                  cart?.freight?.price !== null
                    ? currencyFormatFreight(
                        Number(cart.freight.price),
                        undefined,
                        'freight',
                      )
                    : currencyFormat(0)

                }}
              </p>
            </div>
            <hr />

            <div class="summary-values amount">
              <p>{{ t('cart.summary.total') }}</p>
              <p>{{ formattedTotal }}</p>
            </div>

            <p v-if="!formattedTotal" class="alert-freight">
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
  .cart {
    &__empty {
      text-align: center;
      margin-bottom: 1.5rem;
      height: 70vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p {
        font-size: 1.5rem;
      }

      :deep(.n-button) {
        text-decoration: underline;
        padding: 0.5rem 1rem;

        .n-button__content {
          font-size: 1.25rem;
          font-weight: 600;
        }
      }
    }

    &__not-empty {
      padding: 1rem 2rem;

      @media (max-width: 840px) {
        padding: 1rem;
      }

      &--container {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: 1rem;
        margin-top: 1rem;

        @media (max-width: 840px) {
          grid-template-columns: 1fr;
        }
      }

      &--products {
        border-radius: 8px;
        border: 1px solid #cdcaca;

        h1 {
          text-align: center;

          strong {
            color: $primary-color;
            font-size: 2.5rem;
          }
        }
        .table-container {
          padding: 1rem;

          .table-header {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(3, 1fr) 60px;
            gap: 3rem;
            font-size: 1.15rem;

            @media (max-width: 840px) {
              display: none;
            }
          }

          .table-body {
            margin-top: 1rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;

            .table-row {
              display: grid;
              grid-template-columns: repeat(3, 1fr) 60px;
              gap: 3rem;

              @media (max-width: 840px) {
                grid-template-columns: 3fr 1fr 1fr;
              }

              .product {
                display: flex;
                gap: 1rem;

                @media (max-width: 840px) {
                  grid-column-start: 1;
                  grid-column-end: 4;
                }
              }

              .quantity {
                width: 45%;
                text-align: center;

                @media (max-width: 840px) {
                  width: 100%;
                }
              }

              .container-price {
                display: flex;
                flex-direction: column;
              }

              .old-price {
                text-decoration: line-through;
                color: #333639;
                margin: 0;
              }

              .price {
                font-size: 1.15rem;
                font-weight: 600;
                margin: 0;
              }
            }
          }
        }
      }

      &--summary {
        border-radius: 8px;
        border: 1px solid #cdcaca;
        padding: 1rem;
        max-height: 20rem;

        hr {
          height: 1px;
          background-color: #cdcaca;
          border: none;
        }

        .summary-values {
          display: flex;
          justify-content: space-between;
        }

        .amount {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .btn-checkout {
          margin-top: 1rem;
          width: 100%;
        }

        .btn-continue-buying {
          width: 100%;
          text-decoration: underline;
        }

        .alert-freight {
          font-size: 0.9rem;
          font-weight: 600;
          color: $primary-color;
          text-align: center;
          background-color: #f9e9d2;
          padding: 0.5rem;
          margin: 0 0 1rem 0;
        }
      }
    }

    &__loading {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
    }

    &__freigth {
      display: flex;
      justify-content: space-between;
      font-weight: 600;
      color: $home-background;
      margin-top: 0.5rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
    }
  }
</style>
