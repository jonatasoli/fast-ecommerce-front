interface IConfig {
  onSuccess(): void
  onError(err: Error): void
  watch: MaybeRefOrGetter<string | undefined>
}

const CALLBACK_INTERNVAL = 6000 // 1 second

export const usePaymentStatus = ({ onError, watch: watchSource }: IConfig) => {
  const cartStore = useCartStore()
  const status = ref<string>()

  const getPaymentStatus = async (paymentId: string): Promise<void> => {
    try {
      const response = await cartStore.getPaymentStatus(paymentId)
      status.value = response.status
    } catch (err) {
      status.value = undefined
      onError(err as Error)
    }
  }

  const startChecking = (paymentId: string) => {
    const clearInterval = setTimeout(
      async () => await getPaymentStatus(paymentId),
      CALLBACK_INTERNVAL
    )
  }

  onMounted(() => {
    watch(() => unref(watchSource), (value) => {
      if (!unref(value)) {return}
      startChecking(unref(value) as string)
    })
  })

  return {
    status
  }
}

