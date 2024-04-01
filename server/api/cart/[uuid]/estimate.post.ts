import { defineEventHandler, readBody, H3Error } from 'h3'
import type { EstimateResponse } from '~/utils/types'

export default defineEventHandler(async (event): Promise<EstimateResponse> => {
  const serverBaseURL = process.env.SERVER_BASE_URL
  const uuid = event.context.params?.uuid
  const body = await readBody(event)

  try {
    const res = await fetch(`${serverBaseURL}/cart/${uuid}/estimate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()

    if (data?.code === 'PZN-999') {
      throw createError({
        statusCode: res.status,
        message: 'INVALID_CEP',
      })
    }

    if (data?.detail && data?.detail === 'Invalid Coupon.') {
      throw createError({
        statusCode: res.status,
        message: 'INVALID_COUPON',
      })
    }

    return data
  } catch (error: unknown) {
    throw createError({
      statusCode: (error as H3Error).statusCode,
      message: (error as H3Error).message,
    })
  }
})
