<template>
  <n-card class="pix-payment-form">
    <LoadingProvider :active="pending">
      <n-space v-if="errorData" align="center" vertical>
        <h1>{{ errorData.title }}</h1>
        <p>{{ errorData.message }}</p>

        <n-button type="primary" ghost @click.prevent="handleRetryPix">
          {{ t('actions.try-again') }}
        </n-button>
      </n-space>

      <n-space v-else align="center" vertical>
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
    </LoadingProvider>
  </n-card>
</template>

<script setup lang="ts">
  import { useNotification } from 'naive-ui'
  import { useCartStore } from '#imports'

  const { t } = useI18n()
  const notification = useNotification()
  const cartStore = useCartStore()

  const emit = defineEmits(['success'])

  interface IErrorData {
    title: string
    message: string
  }

  const error = ref<IErrorData>()
  const errorData = computed<IErrorData | undefined>(
    (): IErrorData | undefined => {
      if (pixError.value) {
        return {
          title: t('title.error'),
          message: t('error.pix-qr-code'),
        }
      }

      return error.value
    },
  )

  const {
    data,
    error: pixError,
    pending,
    execute: handleGeneratePixCode,
  } = usePixCode({
    onError: () =>
      notification.error({
        content: t('error.pix-qr-code'),
        closable: true,
        duration: 2000,
      }),
  })

  const handleRetryPix = async () => {
    await cartStore.estimate()
    await handleGeneratePixCode()
  }

  usePaymentStatus({
    onError: (err) => {
      console.error(err)

      notification.error({
        content: err.message,
        closable: true,
        duration: 2000,
      })

      error.value = {
        title:
          err.name === 'Timeout'
            ? 'Tempo Esgotado!'
            : 'Erro ao Processar Pagamento',
        message: err.message,
      }
    },
    onSuccess: () => {
      notification.success({
        title: 'Pagamento Confirmado!',
        content: 'O seu pagamento foi confirmado!',
        closable: true,
        duration: 2000,
      })

      emit('success')
    },
    watch: computed(() => data.value?.paymentId),
  })
</script>

<style lang="scss" scoped>
  @import './PixPaymentForm.scss';
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
