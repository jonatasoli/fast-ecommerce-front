interface IConfig {
  onSuccess(): void
  onError(err: Error): void
  watch: MaybeRefOrGetter<string | undefined>
}

const STATUS_CHECK_INTERVAL = 5000 // 1 second 
const STATUS_CHECK_TIMEOUT = 50000 // 5 minutes


export const usePaymentStatus = ({ onError, onSuccess, watch: watchSource }: IConfig) => {
  const cartStore = useCartStore()
  const status = ref<string>()

  const getPaymentStatus = async (paymentId: string): Promise<void> => {
    try {
      const response = await cartStore.getPixPaymentStatus(paymentId)
      status.value = response.status
    } catch (err) {
      status.value = "error"
    }
  }

  let intervalCheck
  const startChecking = (paymentId: string) => {
    intervalCheck = setInterval(
      async () => await getPaymentStatus(paymentId),
      STATUS_CHECK_INTERVAL
    )

    setTimeout(checkStatus, STATUS_CHECK_TIMEOUT)
  }

  const timeoutError = () => {
    onError({
      message: 'Parece que houve um erro no pagamento. Tente novamente.',
      name: 'ProcessingError',
    })
  }

  const processError  = () => {
    onError({
      message: 'O QR code expirou. Para continuar, gere outro.',
      name: 'Timeout',
    })
  }

  const checkStatus = () => {
    clearInterval(intervalCheck)

    if (status.value === 'PENDING') {
      return timeoutError()
    }

    if (status.value === 'success') {
      return onSuccess()
    }

    return processError()
  }

  onMounted(() => {
    watch(() => unref(watchSource), (value) => {
      if (!unref(value)) {
        console.warn('no payment id')
        
      }
      startChecking(unref(value) as string)
    })

    watch(() => unref(status), value => {
      if (value === 'PENDING' || !value) {return}

      clearInterval(intervalCheck)

      if (value === 'success') {
        return onSuccess()
      }

      return processError()
    })
  })

  return {
    status
  }
}

