import { defineEventHandler, getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const serverBaseURL = process.env.SERVER_BASE_URL
  const uuid = event.context.params?.uuid
  const token = getCookie(event, 'token')

  try {
    const res = await fetch(`${serverBaseURL}/cart/${uuid}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    const data = await res.json()
    return data
  } catch (error) {
    return {
      success: false,
      error: 'SERVER_ERROR',
    }
  }
})
