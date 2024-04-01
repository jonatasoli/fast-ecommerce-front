import { defineEventHandler, getCookie, readBody, createError, H3Error } from 'h3'

export default defineEventHandler(async (event) => {
  const serverBaseURL = process.env.SERVER_BASE_URL
  const uuid = event.context.params?.uuid
  const token = getCookie(event, 'token')
  const body = await readBody(event)

  try {
    const res = await fetch(`${serverBaseURL}/cart/${uuid}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    return data
  } catch (error: unknown) {
    console.error(error)
    throw createError({
      statusCode: 400,
      message: (error as Error).message,
      data:  (error as H3Error).data,
     })
  }
})
