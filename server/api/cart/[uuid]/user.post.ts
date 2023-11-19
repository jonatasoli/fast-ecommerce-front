import { defineEventHandler, getCookie, readBody, createError} from 'h3'

export default defineEventHandler(async (event) => {
  const serverBaseURL = process.env.SERVER_BASE_URL
  const uuid = event.context.params?.uuid
  const token = getCookie(event, 'token')
  const body = await readBody(event)

  try {
    const res = await fetch(`${serverBaseURL}/cart/${uuid}/user`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()

    if (!data.uuid) {
      throw createError({
        statusCode: 400,
        message: data,
      })
    }
    return {
      success: true,
      data,
    }
  } catch (error: unknown) {
    throw createError({
      statusCode: 400,
      message: (error as Error).message,
    })
  }
})
