import { defineEventHandler, getCookie } from 'h3'

interface UserSuccessResponse {
  success: true
  data: {
    name: string
    document: string
    email: string
    phone: string
    fullName: string
  }
}

interface UserErrorResponse {
  success: false
  error: string
}

export type UserResponse = UserSuccessResponse | UserErrorResponse

export default defineEventHandler(async (event): Promise<UserResponse> => {
  try {
    const document = getCookie(event, 'userDocument')
    const token = getCookie(event, 'token')
    const serverBaseURL = process.env.SERVER_BASE_URL

    if (!document && !token) {
      return {
        success: false,
        error: 'USER_NOT_AUTHENTICATED',
      }
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
      return {
        success: false,
        error: 'USER_NOT_FOUND',
      }
    }
    return {
      success: true,
      data,
    }
  } catch {
    return {
      success: false,
      error: 'SERVER_ERROR',
    }
  }
})
