import { defineEventHandler, getCookie, readBody, createError } from 'h3'
import type { AddPixPaymentMehodResponse } from '~/types/cart'

export default defineEventHandler(
  async (event): Promise<AddPixPaymentMehodResponse> => {
    const serverBaseURL = process.env.SERVER_BASE_URL
    const uuid = event.context.params?.uuid
    const token = getCookie(event, 'token')
    const body = await readBody(event)

    try {
      const response = await fetch(
        `${serverBaseURL}/cart/${uuid}/payment/pix`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        },
      )

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
      throw createError({
        statusCode: 400,
        message: JSON.stringify(error),
      })
    }
  },
)
