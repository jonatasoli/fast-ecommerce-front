<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { navigateTo } from 'nuxt/app'
import { definePageMeta, onMounted, ref, useI18n } from '#imports'
import { useUserStore } from '~/stores/user'
import { useCheckoutStore } from '~/stores/checkout'

import { FormAddress, ResumeOrder } from '~/components/checkout'
import { useCartStore } from '~/stores/cart'

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
const checkoutStore = useCheckoutStore()
const { user } = storeToRefs(useUserStore())
const { checkout } = storeToRefs(useCheckoutStore())

const formUserAddress = ref<typeof FormAddress | null>(null)
const formShippingAddress = ref<typeof FormAddress | null>(null)
const current = ref<number>(1)
const currentStatus = ref<'process' | 'finish' | 'wait'>('process')
const paymentMethod = ref<string>('credit-card')
const timestamp = ref<number | null>(null)
const shipping_is_payment = ref<boolean | null>(null)

const { t } = useI18n()

function handleSubmitAndValidate(form) {
  form.value?.onSubmit()
  const data = form.value?.validate().then(({ valid }) => {
    if (valid) {
      return true
    }
    return false
  })
  return data
}

async function nextSteps() {
  if (current.value === 2) {
    const validFormUserAddress = await handleSubmitAndValidate(formUserAddress)
    const validFormShippingAddress = await handleSubmitAndValidate(formShippingAddress)

    if (validFormUserAddress) {
      if (!shipping_is_payment.value && validFormShippingAddress) {
        current.value = current.value + 1
      } else if (shipping_is_payment.value) {
        current.value = current.value + 1
      }
    }
  } else {
    current.value = current.value + 1
  }
}

function handleSubmitUserAddress(address) {
  checkoutStore.setUserAddress(address)
}

function handleSubmitShippingAddress(address) {
  checkoutStore.setShippingAddress(address)
}

function handleUpdateShippingIsPayment(value) {
  checkoutStore.setShippingIsPayment(value)
}

onMounted(() => {
  if (checkout.value.shipping_is_payment) {
    shipping_is_payment.value = checkout.value.shipping_is_payment
  }
})
</script>

<template>
  <div class="container checkout">
    <n-steps :current="current" :status="currentStatus">
      <n-step
        :title="t('checkout.steps.login')"
      />
      <n-step :title="t('checkout.steps.shipping')" />
      <n-step :title="t('checkout.steps.payment')" />
      <n-step :title="t('checkout.steps.resume')" />
    </n-steps>

    <div v-if="current === 1" class="checkout__container">
      <div v-if="user">
        <h2 class="title">
          {{ t('checkout.user.title') }}
        </h2>
        <n-form class="border">
          <n-form-item :label="t('checkout.user.name')">
            <n-input v-model:value="user.name" />
          </n-form-item>
          <n-form-item :label="t('checkout.user.email')">
            <n-input v-model:value="user.email" />
          </n-form-item>
          <n-form-item :label="t('checkout.user.phone')">
            <n-input v-model:value="user.phone" />
          </n-form-item>
        </n-form>
      </div>
      <div v-else class="checkout__login">
        <div>
          {{ t('checkout.user.login.part1') }}
          <NuxtLink to="/login?redirect=/checkout" class="link">
            {{ t('checkout.user.login.part2') }}
          </NuxtLink> {{ t('checkout.user.login.part3') }} <NuxtLink to="/register" class="link">
            {{ t('checkout.user.login.part4') }}
          </NuxtLink> {{ t('checkout.user.login.part5') }}
        </div>
      </div>
    </div>

    <div v-if="current === 2" class="checkout__container">
      <h2 class="title">
        {{ t('checkout.shipping.title') }}
      </h2>
      <FormAddress
        ref="formUserAddress"
        addres-type="user_address"
        :values="checkout.user_address"
        @on-submit="handleSubmitUserAddress"
      />
      <h2 class="title">
        {{ t('checkout.shipping.payment_title') }}
      </h2>
      <n-form-item
        :label="t('checkout.shipping.shipping_is_payment')"
        :feedback="shipping_is_payment === null ? t('checkout.shipping.select_option') : undefined"
        :validation-status="shipping_is_payment === null ? 'error' : undefined"
      >
        <n-radio-group v-model:value="shipping_is_payment">
          <n-radio :value="true" @change="handleUpdateShippingIsPayment">
            {{ t('checkout.shipping.shipping_is_payment_yes') }}
          </n-radio>
          <n-radio :value="false" @change="handleUpdateShippingIsPayment">
            {{ t('checkout.shipping.shipping_is_payment_no') }}
          </n-radio>
        </n-radio-group>
      </n-form-item>

      <div v-if="shipping_is_payment === false">
        <FormAddress
          ref="formShippingAddress"
          addres-type="shipping_address"
          :values="checkout.shipping_address"
          @on-submit="handleSubmitShippingAddress"
        />
      </div>
    </div>

    <div v-if="current === 3" class="checkout__container checkout__payment">
      <h2 class="title">
        {{ t('checkout.payment.title') }}
      </h2>
      <div class="border">
        <n-radio-group
          v-model:value="paymentMethod"
          class="payment-method"
          size="large"
        >
          <n-radio value="credit-card">
            {{ t('checkout.payment.credit_card') }}
          </n-radio>
        </n-radio-group>
      </div>
      <div v-if="paymentMethod === 'credit-card'" class="border">
        <n-form>
          <n-form-item :label="t('checkout.payment.credit_card_number')">
            <n-input
              v-mask="'#### #### #### ####'"
            />
          </n-form-item>
          <n-form-item :label="t('checkout.payment.credit_card_name')">
            <n-input />
          </n-form-item>
          <n-grid :x-gap="20" :cols="10">
            <n-gi :span="2">
              <n-form-item :label="t('checkout.payment.credit_card_validate')">
                <n-date-picker
                  v-model:value="timestamp"
                  type="month"
                  format="MM/yyyy"
                  clearable
                />
              </n-form-item>
            </n-gi>
            <n-gi :span="2">
              <n-form-item :label="t('checkout.payment.credit_card_cvv')">
                <n-input />
              </n-form-item>
            </n-gi>
            <n-gi :span="6">
              <n-form-item :label="t('checkout.payment.installments')">
                <n-select />
              </n-form-item>
            </n-gi>
          </n-grid>
        </n-form>
      </div>
    </div>

    <div v-if="current === 4" class="checkout__container checkout__confirm">
      <h2 class="title">
        {{ t('checkout.finally.title') }}
      </h2>
      <ResumeOrder />
    </div>

    <div v-if="current && user" class="checkout__actions">
      <n-button
        v-if="current === 4"
        quaternary
        strong
        class="btn-checkout"
      >
        {{ t('checkout.actions.finish') }}
      </n-button>
      <n-button
        v-if="current > 1"
        quaternary
        strong
        class="btn-checkout"
        @click="current--"
      >
        {{ t('checkout.actions.back') }}
      </n-button>
      <n-button
        v-if="current < 4"
        type="primary"
        strong
        class="btn-checkout"
        @click="nextSteps"
      >
        {{ t('checkout.actions.next') }}
      </n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/pages/checkout.scss';
</style>
