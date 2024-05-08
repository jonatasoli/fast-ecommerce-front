import { defineEventHandler, getCookie, readBody, createError } from 'h3'
import type { AddPixPaymentMehodResponse } from '~/types/cart'

async function AddPixPaymentMehod(
  cartId: string,
  userToken: string,
  body: Record<string, unknown>,
) {
  const serverBaseURL = process.env.SERVER_BASE_URL

  try {
    const response = await fetch(
      `${serverBaseURL}/cart/${cartId}/payment/pix`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(body),
      },
    )

    if (response.status !== 201) {
      throw createError({
        statusCode: 400,
        message: `API returned ${response.status} error.`,
      })
    }

    const data = await response.json()

    if (!data.uuid) {
      throw createError({
        statusCode: 400,
        message: JSON.stringify(data),
      })
    }

    return {
      success: true,
      data,
    }
  } catch (error: unknown) {
    console.error(error)

    throw createError({
      statusCode: 400,
      message: JSON.stringify(error),
    })
  }
}

export default defineEventHandler(
  async (event): Promise<AddPixPaymentMehodResponse> => {
    const cartId = event.context.params?.uuid as string
    const userToken = getCookie(event, 'token') as string
    const body = await readBody(event)

    return await AddPixPaymentMehod(cartId, userToken, body)
  },
)
