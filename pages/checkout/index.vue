<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { navigateTo } from 'nuxt/app'
  import { useNotification } from 'naive-ui'
  import { useUserStore } from '~/stores/user'
  import { useCartStore } from '~/stores/cart'
  import { Pix, CreditCard } from '~/stepsCheckout/payment'
  import ResumeOrder from '~/stepsCheckout/resume/ResumeOrder.vue'
  import type { FormAddress } from '~/components/checkout'

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
  const router = useRouter()
  const { isMobile } = useDevice()
  const notification = useNotification()
  const { user } = storeToRefs(useUserStore())
  const cartStore = useCartStore()
  const { address, cart } = storeToRefs(cartStore)
  const formUserAddress = ref<typeof FormAddress | null>(null)
  const formShippingAddress = ref<typeof FormAddress | null>(null)
  const creditCard = ref<typeof CreditCard | null>(null)
  const current = ref<number>(1)
  const currentStatus = ref<'process' | 'finish' | 'wait'>('process')
  const paymentMethod = ref<'credit-card' | 'pix'>('credit-card')
  const shippingIsPayment = ref<boolean | null>(null)

  const { t, locale  } = useI18n()

  function nextSteps() {
    const steps = {
      1: handleSubmitUser,
      2: handleSubmitUserAddress,
      3: handleSubmitAddPayment,
      4: async () => {},
    }
    return steps[current.value]()
  }

  async function handleSubmitUser() {
    if (!user.value) {
      return
    }

    await cartStore.addUserCart()
    current.value++
  }

  async function handleSubmitUserAddress() {
    try {
      if (!shippingIsPayment.value || !formUserAddress.value) {
        console.warn('shipping_is_payment or formUserAddress is null')
        return
      }

      const { valid: validUserAddress } = await formUserAddress.value.validate()

      if (!validUserAddress && shippingIsPayment.value === null) {
        return
      }

      if (!shippingIsPayment.value && formShippingAddress.value) {
        const { valid: validShippingAddress } =
          await formShippingAddress.value.validate()
        if (!validShippingAddress) {
          return
        }
      }

      const shippingAddress = shippingIsPayment.value
        ? formUserAddress.value?.values
        : formShippingAddress.value?.values

      await cartStore.addAddressCart({
        shipping_is_payment: shippingIsPayment.value,
        user_address: formUserAddress.value?.values,
        shipping_address: shippingAddress,
      })

      current.value++
    } catch (error) {
      console.error(error)
    }
  }

  async function handleSubmitAddPayment() {
    try {
      if (paymentMethod.value === 'credit-card') {
        if (!creditCard.value) {
          console.warn('creditCard ref value is null')
          return
        }

        const { data } = await creditCard.value.handleSubmitCreditCard()
        if (data.uuid) {
          current.value++
        }
      }
    } catch {
      notification.error({
        title: 'Erro',
        content: 'Ocorreu um erro ao adicionar o pagamento, tente novamente mais tarde.',
        duration: 2500,
      })
    }
  }

  function handleUpdateShippingIsPayment(value) {
    cartStore.setShippingIsPayment(value)
  }

  function handleFinishCheckout() {
    router.push('/checkout/finish')
  }

  function handleGoHome() {
   router.push('/')
 }

  onMounted(async () => {
    if (unref(user)) {
      await handleSubmitUser()
    }

    if (address.value.shipping_is_payment) {
      shippingIsPayment.value = address.value.shipping_is_payment
    }
  })

  watch(user, async () => {
    if (unref(user)) {
      await handleSubmitUser()
    }
  })
</script>

<template>
  <div class="container checkout">
    <n-steps v-if="!isMobile" :current="current" :status="currentStatus">
      <n-step :title="t('checkout.steps.login')" />
      <n-step :title="t('checkout.steps.shipping')" />
      <n-step :title="t('checkout.steps.payment')" />
      <n-step :title="t('checkout.steps.resume')" />
    </n-steps>

    <div v-if="current === 1" class="checkout__container">
      <div v-if="!user" class="checkout__login">
        <div>
          {{ t('checkout.user.login.part1') }}
          <NuxtLink to="/login?redirect=/checkout" class="link">
            {{ t('checkout.user.login.part2') }}
          </NuxtLink>
          {{ t('checkout.user.login.part3') }}
          <NuxtLink to="/register" class="link">
            {{ t('checkout.user.login.part4') }}
          </NuxtLink>
          {{ t('checkout.user.login.part5') }}
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
        :data="{
          ...address?.user_address,
          zipcode: cart?.zipcode,
        }"
        :readonly-zipcode="true"
      />

      <h2 class="title">
        {{ t('checkout.shipping.payment_title') }}
      </h2>
      <n-form-item
        :label="t('checkout.shipping.shipping_is_payment')"
        :feedback="
          shippingIsPayment === null
            ? t('checkout.shipping.select_option')
            : undefined
        "
        :validation-status="shippingIsPayment === null ? 'error' : undefined"
      >
        <n-radio-group v-model:value="shippingIsPayment">
          <n-radio :value="true" @change="handleUpdateShippingIsPayment">
            {{ t('checkout.shipping.shipping_is_payment_yes') }}
          </n-radio>
          <n-radio :value="false" @change="handleUpdateShippingIsPayment">
            {{ t('checkout.shipping.shipping_is_payment_no') }}
          </n-radio>
        </n-radio-group>
      </n-form-item>

      <div v-if="shippingIsPayment === false">
        <FormAddress
          ref="formShippingAddress"
          addres-type="shipping_address"
          :data="address?.shipping_address"
        />
      </div>
    </div>

    <div v-if="current === 3" class="checkout__container checkout__payment">
      <h2 class="title">
        {{ t('checkout.payment.title') }}
      </h2>

      <div class="border m-w:fit-content">
        <n-radio-group
          v-model:value="paymentMethod"
          class="payment-method"
          size="large"
        >
          <n-radio value="credit-card">
            {{ t('checkout.payment.credit_card') }}
          </n-radio>
          <n-radio v-if="locale === 'pt-br'" value="pix">
            Pix
          </n-radio>
        </n-radio-group>
      </div>

      <CreditCard v-if="paymentMethod === 'credit-card'" ref="creditCard" />
      <Pix v-else-if="paymentMethod === 'pix'" @success="current = 4" />
    </div>

    <div v-if="current === 4" class="checkout__container checkout__confirm">
      <ResumeOrder />
    </div>

    <div v-if="current" class="checkout__actions">
       <n-button
        v-if="current > 2"
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
      <template v-if="current === 4">
        <n-button
          v-if="paymentMethod == 'pix'"
          type="primary"
          strong
          class="btn-checkout"
          @click="handleGoHome"
        >
          {{ t('checkout.actions.home') }}
        </n-button>
        <n-button
          v-else
          type="primary"
          strong
          class="btn-checkout"
          @click="handleFinishCheckout"
        >
          {{ t('checkout.actions.finish') }}
        </n-button>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/pages/checkout.scss';
</style>
