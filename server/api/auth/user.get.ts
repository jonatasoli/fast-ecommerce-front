import { defineEventHandler, getCookie, createError } from 'h3'

interface UserSuccessResponse {
  user_id: string
  role: string | null
  name: string
  document: string
  email: string
  phone: string
  fullName: string
}

export type UserResponse = UserSuccessResponse

export default defineEventHandler(async (event): Promise<UserResponse> => {
  try {
    const document = getCookie(event, 'userDocument')
    const token = getCookie(event, 'token')
    const serverBaseURL = process.env.SERVER_BASE_URL

    if (!document && !token) {
      throw createError({
        statusCode: 400,
        message: 'USER_NOT_AUTHENTICATED',
      })
    }

    const res = await fetch(`${serverBaseURL}/user/${document}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()

    if (!data || !data.name) {
      throw createError({
        statusCode: 400,
        message: 'USER_NOT_FOUND',
      })
    }

    return data
  } catch {
    throw createError({
      statusCode: 500,
      message: 'SERVER_ERROR',
    })
  }
})
