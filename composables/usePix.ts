import { onMounted } from '#imports'
import { useCartStore } from '~/stores/cart'

interface IData {
  link: string
  qrCode: string
}

interface IPixCodeProps {
  onError?: (error: string | null) => void
}

export function usePixCode({ onError }: IPixCodeProps = {}) {
  const cart = useCartStore()
  const error = ref<string | null>(null)
  const pending = ref(true)
  const data = ref<IData>()

  async function execute() {
    try {
      pending.value = true
      const response = await cart.addPaymentMethod()
      
      data.value = {
        link: response.pix_qr_code,
        qrCode: useImageFromBase64(response.pix_qr_code_base4)
      }

      pending.value = false
    } catch (err) {
      error.value = (err as Error).message
      
      if (onError) {
        onError(unref(error))
      }

      pending.value = false
    }
  }

  onMounted(execute)

  return {
    data,
    pending,
    error: computed(() => unref(error)),
    execute
  }
}