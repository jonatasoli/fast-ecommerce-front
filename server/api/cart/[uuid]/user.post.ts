import { defineEventHandler, getCookie, readBody} from 'h3'

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

    if (!data.user_data) {
      return {
        success: false,
        error: 'USER_NOT_FOUND',
      }
    }
    return {
      success: true,
      data,
    }
  } catch (error) {
    return {
      success: false,
      error: 'SERVER_ERROR',
    }
  }
})
