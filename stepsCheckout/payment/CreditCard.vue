<script lang="ts" setup>
import { getMonthYearFromTimestamp, ref, storeToRefs, unref, useNuxtApp, watch } from '#imports'
import { FormCreditCard } from '~/components/checkout'
import { useCartStore } from '~/stores/cart';
import type { CreditCard } from '~/utils/types'

const { $mercadoPago } = useNuxtApp()
const cartStore = useCartStore()
const { cart, paymentCreditCard } = storeToRefs(cartStore)
const formCreditCard = ref<typeof FormCreditCard | null>(null)
const bin = ref<string>('')
const creditCardIssuer = ref<string>('')
const optionInstallments = ref<{ label: string; value: number }[]>([])

async function handleSubmitCreditCard() {
  if (!formCreditCard.value) {
    return false
  }

  const { valid } = await formCreditCard.value.validate()

  if (!valid) {
    return false
  }

  const creditCard = formCreditCard.value?.values as CreditCard
  const { month, year } = getMonthYearFromTimestamp(creditCard.creditCardExpiration)
 
  const card = {
    cardNumber: creditCard.creditCardNumber.split(' ').join(''),
    cardholderName: creditCard.creditCardName,
    cardExpirationMonth: month,
    cardExpirationYear: year,
    securityCode: creditCard.creditCardCvv,
    identificationType: creditCard.typeDocument,
    identificationNumber: creditCard.document,
  }

  const tokenResponse = await $mercadoPago.createCardToken(card)

  const data = await cartStore.addMercadoPagoCreditCardPayment({
    card_token: tokenResponse.id ,
    installments: creditCard.installments,
    payment_gateway: 'MERCADOPAGO', // TODO: move to constant
    card_issuer: unref(creditCardIssuer),
  })

  cartStore.setPaymentCreditCard(creditCard)
  return data
}

function handleUpdateCreditCard(creditCardNumber: string): void {
  const newCreditCardNumber = creditCardNumber.replace(/\s/g, '')
  if (newCreditCardNumber.length < 6) { // TODO: move to constant
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
      paymentTypeId: unref(creditCardIssuer),
    })

    const { payer_costs: payerCosts } = installments[0]
    const options = payerCosts.map((payerCost) => ({
      label: payerCost.recommended_message,
      value: payerCost.installments,
    }))

    optionInstallments.value = options
    creditCardIssuer.value = installments[0].payment_method_id
  } catch (error) {
    console.error(error)
  }
}

defineExpose({
  handleSubmitCreditCard,
})

watch(() => unref(bin), getInstallments)
onMounted(() => {
  const { creditCardNumber } = unref(paymentCreditCard);
  if (creditCardNumber) {
    handleUpdateCreditCard(creditCardNumber);
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