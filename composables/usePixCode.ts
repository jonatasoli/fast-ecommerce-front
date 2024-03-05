import { onMounted } from '#imports'
import { useCartStore } from '~/stores/cart'

interface IData {
  link: string
  qrCode: string
  paymentId: string
}

interface IPixCodeProps {
  onError?: (error: string | null) => void
  onPaymentProcessed?: () => Promise<void>
}

export function usePixCode({ onError }: IPixCodeProps = {}) {
  const cart = useCartStore()

  const pending = ref(true)
  const data = ref<IData>()
  const error = ref<string | null>(null)

  async function execute() {
    try {
      pending.value = true
      const pixResponse = await cart.addPixPaymentMethod()
      const checkoutResponse = await cart.finishCheckout()

      if (!checkoutResponse) {
        throw new Error('Error when creating checkout.')
      }

      data.value = {
        link: pixResponse.pix_qr_code,
        qrCode: useImageFromBase64(pixResponse.pix_qr_code_base64),
        paymentId: checkoutResponse.gateway_payment_id
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
    pending,
    data,
    error,
    execute
  }
}