interface IConfig {
  onSuccess(): void
  onError(): void
  onTimeout(): void
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

type Status = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS]

export const usePaymentStatus = ({
  onError,
  onSuccess,
  onTimeout,
}: IConfig) => {
  const cartStore = useCartStore()
  const status = ref<Status>()
  let checkingInterval: NodeJS.Timeout, checkingTimeout: NodeJS.Timeout
  const timeLeft = computed<number>(() => {
    const timeout = checkingTimeout as unknown as {
      _idleStart: number
      _idleTimeout: number
    }

    if (!checkingTimeout) {
      return 0
    }

    return Math.ceil(
      (timeout?._idleStart + timeout?._idleTimeout - Date.now()) / 1000,
    )
  })

  const mapStatus = (status?: string | null): Status => {
    return status
      ? (status.toUpperCase() as unknown as Status)
      : PAYMENT_STATUS.WAITING
  }

  async function getPaymentStatus(paymentId: string): Promise<Status> {
    try {
      const response = await cartStore.getPixPaymentStatus(paymentId)
      return mapStatus(response.status)
    } catch (err) {
      return mapStatus(PAYMENT_STATUS.ERROR)
    }
  }

  const stopChecking = () => {
    clearInterval(checkingInterval)
    clearTimeout(checkingTimeout)
  }

  const startChecking = (paymentId: string) => {
    checkingInterval = setInterval(async () => {
      status.value = await getPaymentStatus(paymentId)

      switch (status.value) {
        case PAYMENT_STATUS.SUCCESS:
          onSuccess()
          stopChecking()
          break
        case PAYMENT_STATUS.ERROR:
          stopChecking()
          onError()
          break
      }
    }, STATUS_CHECK_INTERVAL)

    checkingTimeout = setTimeout(() => {
      stopChecking()
      onTimeout()
    }, STATUS_CHECK_TIMEOUT)
  }

  return {
    status,
    start: startChecking,
    stop: stopChecking,
    timeLeft,
  }
}
