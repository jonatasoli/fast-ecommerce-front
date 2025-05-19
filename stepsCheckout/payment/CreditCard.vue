<script lang="ts" setup>
  import { useNotification } from 'naive-ui'
  import {
    getMonthYearFromTimestamp,
    ref,
    storeToRefs,
    unref,
    useNuxtApp,
    watch,
  } from '#imports'
  import { FormCreditCard } from '~/components/checkout'
  import { useCartStore } from '~/stores/cart'
  import type { CreditCard } from '~/utils/types'

  const { $mercadoPago } = useNuxtApp()
  const cartStore = useCartStore()
  const { cart, paymentCreditCard } = storeToRefs(cartStore)
  const formCreditCard = ref<typeof FormCreditCard | null>(null)
  const bin = ref<string>('')
  const creditCardBrand = ref<string>('')
  const optionInstallments = ref<{ label: string; value: number }[]>([])
  const lang = useCookie('i18n_redirected').value
  const notification = useNotification()
  const { loading } = storeToRefs(cartStore)

  async function createStripePayment(card) {
    loading.value = true
    try {
      const data = await cartStore.addMercadoPagoCreditCardPayment({
        payment_gateway: 'STRIPE',
        number: card.cardNumber,
        exp_month: Number(card.cardExpirationMonth),
        exp_year: Number(card.cardExpirationYear),
        cvc: card.securityCode,
        name: card.cardholderName,
        installments: 1,
      })

      cartStore.setPaymentCreditCard({
        creditCardNumber: card.cardNumber,
        creditCardName: card.cardholderName,
        creditCardExpiration: `${card.cardExpirationMonth}/${card.cardExpirationYear}`,
        creditCardCvv: card.securityCode,
        installments: card.installments,
        installmentsMessage: '',
        typeDocument: card.identificationType,
        document: card.identificationNumber,
      })

      return data
    } catch {
      notification.error({
        content: 'Erro ao criar a compra.',
        duration: 4000,
        closable: true,
      })
      loading.value = false
    } finally {
      loading.value = false
    }
  }

  async function handleSubmitCreditCard() {
    if (!formCreditCard.value) {
      return false
    }

    const { valid, values } = await formCreditCard.value.validate()

    if (!valid) {
      return false
    }

    const creditCard = values as CreditCard
    const { month, year } = getMonthYearFromTimestamp(
      creditCard.creditCardExpiration,
    )

    const card = {
      cardNumber: creditCard.creditCardNumber,
      cardholderName: creditCard.creditCardName,
      cardExpirationMonth: month,
      cardExpirationYear: year,
      securityCode: creditCard.creditCardCvv,
      identificationType: creditCard.typeDocument,
      identificationNumber: creditCard.document,
    }

    if (lang === 'pt-BR') {
      const tokenResponse = await $mercadoPago.createCardToken(card)
      const { id, last_four_digits: lastFourDigits } = tokenResponse

      const data = await cartStore.addMercadoPagoCreditCardPayment({
        card_token: id,
        installments: creditCard.installments,
        payment_gateway: 'MERCADOPAGO',
        card_issuer: lastFourDigits,
        card_brand: unref(creditCardBrand),
      })

      const installmentsMessage = unref(optionInstallments).find(
        (option) => option.value === creditCard.installments,
      )

      await cartStore.setPaymentCreditCard({
        ...creditCard,
        installmentsMessage: installmentsMessage?.label || '',
      })
      return data
    } else {
      const data = createStripePayment(card)

      return data
    }
  }

  function handleUpdateCreditCard(creditCardNumber) {
    const newCreditCardNumber = creditCardNumber.replace(/\s/g, '')
    if (newCreditCardNumber.length < 6) {
      return
    }

    const substringBin = newCreditCardNumber.substring(0, 6)
    bin.value = substringBin
  }

  async function getInstallments() {
    if (!unref(bin)) {
      return
    }

    try {
      const installments = await $mercadoPago.getInstallments({
        amount: cart.value.total,
        bin: unref(bin),
        paymentTypeId: unref(creditCardBrand),
      })

      const { payer_costs: payerCosts } = installments[0]
      const options = payerCosts.map((payerCost) => ({
        label: payerCost.recommended_message,
        value: payerCost.installments,
      }))

      optionInstallments.value = options
      creditCardBrand.value = installments[0].payment_method_id
    } catch (error) {
      console.error(error)
    }
  }

  defineExpose({
    handleSubmitCreditCard,
  })

  watch(() => unref(bin), getInstallments)
  onMounted(() => {
    const { creditCardNumber } = unref(paymentCreditCard)
    if (creditCardNumber) {
      handleUpdateCreditCard(creditCardNumber)
    }
  })
</script>
<template>
  <div class="border">
    <FormCreditCard
      ref="formCreditCard"
      :option-installments="optionInstallments"
      :data="paymentCreditCard"
      @on-input-credit-card="handleUpdateCreditCard"
    />
  </div>
</template>
