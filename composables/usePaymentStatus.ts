interface IConfig {
  onSuccess(): void
  onError(err: Error): void
  watch: MaybeRefOrGetter<string | undefined>
}

const PAYMENT_STATUS = {
  ERROR: 'REJECTED',
  SUCCESS: 'APPROVED',
  PENDING: 'PENDING',
  WAITING: null,
}

const STATUS_CHECK_INTERVAL = 1000 // 1 second
const STATUS_CHECK_TIMEOUT = 1000 * 60 * 5 // 5 minutes

const mapStatus = (status: keyof typeof PAYMENT_STATUS) => {
  if (status) {
    return status.toUpperCase()
  }

  return PAYMENT_STATUS.WAITING
}

export const usePaymentStatus = ({
  onError,
  onSuccess,
  watch: watchSource,
}: IConfig) => {
  const cartStore = useCartStore()
  const status = ref<PAYMENT_STATUS[keyof typeof PAYMENT_STATUS]>()

  const getPaymentStatus = async (paymentId: string): Promise<void> => {
    try {
      const response = await cartStore.getPixPaymentStatus(paymentId)
      status.value = mapStatus(response.status)
    } catch (err) {
      status.value = PAYMENT_STATUS.ERROR
    }
  }

  let intervalCheck, timeoutCheck
  const startChecking = (paymentId: string) => {
    intervalCheck = setInterval(
      async () => await getPaymentStatus(paymentId),
      STATUS_CHECK_INTERVAL,
    )

    timeoutCheck = setTimeout(checkStatus, STATUS_CHECK_TIMEOUT)
  }

  const processError = () => {
    onError({
      message: 'Parece que houve um erro no pagamento. Tente novamente.',
      name: 'ProcessingError',
    })
  }

  const timeoutError = () => {
    onError({
      message: 'O QR code expirou. Para continuar, gere outro.',
      name: 'Timeout',
    })
  }

  const checkStatus = () => {
    clearInterval(intervalCheck)
    clearTimeout(timeoutCheck)

    // Tempo acabou e status é pendente ou null (inicial)
    if (
      [PAYMENT_STATUS.PENDING, PAYMENT_STATUS.WAITING].includes(status.value)
    ) {
      return timeoutError()
    }

    if (status.value === PAYMENT_STATUS.SUCCESS) {
      return onSuccess()
    }

    return processError()
  }

  onMounted(() => {
    watch(
      () => unref(watchSource),
      (value) => {
        if (!unref(value)) {
          console.warn('no payment id')
        }
        startChecking(unref(value) as string)
      },
    )

    watch(
      () => unref(status),
      () => {
        if (
          [PAYMENT_STATUS.PENDING, PAYMENT_STATUS.WAITING].includes(
            status.value,
          )
        ) {
          return
        }

        checkStatus()
      },
    )
  })

  return {
    status,
  }
}
