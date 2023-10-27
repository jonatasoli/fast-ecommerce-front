<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { navigateTo } from 'nuxt/app'
import { CreditCard, definePageMeta, onMounted, ref, useDevice, useI18n, useNuxtApp } from '#imports'
import { useUserStore } from '~/stores/user'
import { useCheckoutStore } from '~/stores/checkout'
import { useCartStore } from '~/stores/cart'
import { FormAddress, FormCreditCard, ResumeOrder } from '~/components/checkout'
import { getMonthYearFromTimestamp } from '~/utils/helpers'

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
const { isMobile } = useDevice()
const checkoutStore = useCheckoutStore()
const { user } = storeToRefs(useUserStore())
const { checkout } = storeToRefs(useCheckoutStore())
const { $mercadoPago } = useNuxtApp()
const formUserAddress = ref<typeof FormAddress | null>(null)
const formShippingAddress = ref<typeof FormAddress | null>(null)
const formCreditCard = ref<typeof FormCreditCard | null>(null)
const current = ref<number>(1)
const currentStatus = ref<'process' | 'finish' | 'wait'>('process')
const paymentMethod = ref<string>('credit-card')
const shipping_is_payment = ref<boolean | null>(null)

const { t } = useI18n()

async function nextSteps() {
  if (current.value === 1) {
    current.value++
    return
  }

  if (current.value === 2) {
    const { valid: validUserAddress } = await formUserAddress.value?.validate()
    if (validUserAddress && !shipping_is_payment.value) {
      const { valid: validShippingAddress } = await formShippingAddress.value?.validate()

      if (validShippingAddress) {
        return current.value++
      }
    }

    if (validUserAddress) {
      return current.value++
    }
  }

  if (current.value === 3 && paymentMethod.value === 'credit-card') {
    const { valid } = await formCreditCard.value?.validate()
    if (valid) {
      handleSubmitCreditCard(formCreditCard.value?.values)
      current.value++
    }
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

async function handleSubmitCreditCard(creditCard: CreditCard) {
  const { month, year } = getMonthYearFromTimestamp(creditCard.credit_card_expiration)

  const card = {
    cardNumber: creditCard.credit_card_number.split(' ').join(''),
    securityCode: creditCard.credit_card_cvv,
    expirationMonth: month,
    expirationYear: year,
    cardholder: {
      name: creditCard.credit_card_name,
      identification: {
        type: creditCard.type_document,
        number: creditCard.document_number,
      },
    },
  }

  const tokenResponse = await $mercadoPago.createCardToken(card)

  return tokenResponse.id
}

onMounted(() => {
  if (checkout.value.shipping_is_payment) {
    shipping_is_payment.value = checkout.value.shipping_is_payment
  }
})
</script>

<template>
  <div class="container checkout">
    <n-steps
      v-if="!isMobile"
      :current="current"
      :status="currentStatus"
    >
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
        :data="checkout.user_address"
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
          :data="checkout.shipping_address"
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
        <FormCreditCard
          ref="formCreditCard"
        />
      </div>
    </div>

    <div v-if="current === 4" class="checkout__container checkout__confirm">
      <h2 class="title">
        {{ t('checkout.finally.title') }}
      </h2>
      <ResumeOrder />
    </div>

    <div v-if="current " class="checkout__actions">
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
        v-if="current < 4 && user"
        type="primary"
        strong
        class="btn-checkout"
        submit
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
