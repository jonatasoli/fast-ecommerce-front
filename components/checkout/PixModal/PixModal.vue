<template>
  <n-modal
    v-model:show="show"
    :mask-closable="false"
    preset="dialog"
    title="Pagamento"
    content="Qr Code!"
    style="width: max(1200px, 60vw)"
    class="pix-payment-form"
    :closable="false"
    :close-on-esc="false"
  >
    <LoadingProvider :active="pending">
      <n-space align="center" vertical>
        <h1>{{ t('title.pix-payment') }}</h1>
        <small>{{ t('title.pix-payment-subtitle') }}</small>

        <n-space
          class="pix-payment-form__container"
          justify="space-between"
          :wrap="false"
        >
          <!-- qr-code-container::begin -->
          <div
            class="pix-payment-form__container__qr-code-container flex-center bordered"
          >
            <h3>{{ t('messages.qr-code-intro') }}</h3>
            <p>{{ t('messages.qr-code-instructions') }}</p>

            <n-image
              class="pix-payment-form__container__qr-code"
              width="300"
              height="300"
              :src="data?.qrCode"
            />
          </div>
          <!-- qr-code-container::end -->

          <!-- pix-key-container::begin -->
          <div
            class="pix-payment-form__container__link-container flex-center bordered"
          >
            <h3>{{ t('messages.copy-link-intro') }}</h3>
            <p>{{ t('messages.copy-link-instructions') }}</p>

            <n-input :value="data?.link" disabled />
            <CopyToClipboardButton :source="data?.link as string" />
          </div>
          <!-- pix-key-container::end -->
        </n-space>
      </n-space>

      <n-space justify="center">
        <n-button type="error" ghost @click.prevent="handleClose">
          Cancelar
        </n-button>
      </n-space>
    </LoadingProvider>
  </n-modal>
</template>

<script lang="ts" setup>
  import { useNotification } from 'naive-ui'
  import CopyToClipboardButton from '~/components/shared/CopyToClipboardButton/CopyToClipboardButton.vue'

  const { t } = useI18n()
  const props = defineProps<{ modelValue: boolean }>()
  const show = useVModel(props)
  const notification = useNotification()
  const cart = useCartStore()
  const pending = ref(true)
  const router = useRouter()

  const data = computed(() => {
    return {
      link: cart.payment.pix_qr_code as string,
      qrCode: useImageFromBase64(cart.payment.pix_qr_code_base64 as string),
      paymentId: cart.payment.payment_method_id,
    }
  })

  onMounted(async () => {
    pending.value = true
    const response = await cart.finishCheckout()

    pending.value = false
    if (response === null) {
      notification.error({
        content: 'Erro ao finalizar compra. Tente novamente.',
        duration: 4000,
        closable: true,
      })
      return
    }

    startStatusChecking(data.value.paymentId)
  })

  const { start: startStatusChecking, stop: stopChecking } = usePaymentStatus({
    onError: () => {
      notification.error({
        content: 'Error',
        closable: true,
        duration: 2000,
      })
    },
    onSuccess: async () => {
      notification.success({
        title: 'Pagamento Confirmado!',
        content: 'O seu  pagamento foi confirmado!',
        closable: true,
        duration: 2000,
      })

      await router.replace('/checkout/finish')
    },
    onTimeout: () => {
      notification.warning({
        title: 'Timeout',
        content: 'O tempo acabou, tentando novamente',
        closable: true,
        duration: 2000,
      })
    },
    watch: computed(() => data.value?.paymentId),
  })

  async function handleClose() {
    stopChecking()
    show.value = false
    await router.replace('/')
  }
</script>

<style lang="scss" scoped>
  @use './PixModal.scss' as *;
</style>

<i18n lang="json">
{
  "pt-br": {
    "title": {
      "pix-payment": "Quase Pronto!",
      "pix-payment-subtitle": "Siga as instruções abaixo para finalizar!",
      "error": "Erro ao gerar código de pagamento."
    },
    "actions": {
      "copy-link": "Copiar Link",
      "try-again": "Tentar Novamente"
    },
    "messages": {
      "copy-link-intro": "Ou copie este código para fazer o pagamento",
      "copy-link-instructions": "Escolha pagar via Pix no aplicativo do seu banco e depois, cole o código abaixo.",
      "qr-code-instructions": "Escolha pagar via Pix no aplicativo do seu banco e depois, escaneie o código abaixo.",
      "qr-code-intro": "Escaneie o QR code abaixo"
    },
    "error": {
      "pix-qr-code": "Parece que houve um erro ao gerar o código QR. Por favor, tente novamente."
    }
  }
}
</i18n>
