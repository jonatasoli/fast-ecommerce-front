import type { PixPaymentStatusResponse } from "~/types/payment"

async function getPaymentStatus(paymentId: string, userToken: string) {
  const serverBaseURL = process.env.SERVER_BASE_URL

  try {
    const response = await fetch(`${serverBaseURL}/payment/payment_status?gateway_payment_id=${paymentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
    })

    if (response.status !== 200) {
      throw createError({
        statusCode: response.status,
        message: response.statusText
      })
    }

    const data = await response.json()

    return {
      success: true,
      data
    }
  } catch(error: unknown) {
    console.error(error)

    throw createError({
      statusCode: 400,
      message: JSON.stringify(error),
    })
  }
}

export default defineEventHandler(async (event): Promise<PixPaymentStatusResponse> => {
  const userToken = getCookie(event, 'token') as string
  const { paymentId } = await readBody<{ paymentId: string }>(event)

  return await getPaymentStatus(paymentId, userToken)
})
