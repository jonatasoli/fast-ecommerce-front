export function useCart(uuid: string) {
  const pending = ref(false)
  const data = ref()
  const error = ref<string | null>(null)

  async function execute() {
    try {
      pending.value = true

      const { data: responseData } = await useFetch<Cart | undefined>(
        `/api/cart/${uuid}/cart`,
      )
      const responseDataValue = unref(responseData)
      if (responseDataValue) {
        data.value = {
          uuid: responseDataValue.uuid.toString(),
        }
      }
      pending.value = false
    } catch (err) {
      error.value = (err as Error).message
      pending.value = false
    }
  }

  onMounted(() => execute())

  return {
    pending,
    data,
    error,
    execute,
  }
}
