import { defineEventHandler, readBody, setCookie } from 'h3'

interface LoginSuccessResponse {
  success: true
  data: {
    role: string
  }
}

interface LoginErrorResponse {
  success: false
  error: string
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse

export default defineEventHandler(async (event): Promise<LoginResponse> => {
  const body = await readBody(event)
  const serverBaseURL = process.env.SERVER_BASE_URL

  const bodyEncoded = Object.keys(body).map((key) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`
  }).join('&')

  try {
    const res = await fetch(`${serverBaseURL}/user/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyEncoded,
    })

    const data = await res.json()
    if (!data.access_token) {
      return {
        success: false,
        error: 'INVALID_CREDENTIALS',
      }
    }

    setCookie(event, 'token', data.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    })

    setCookie(event, 'userDocument', body.username, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    })

    return {
      success: true,
      data: {
        role: data.role,
      },
    }
  } catch {
    return {
      success: false,
      error: 'SERVER_ERROR',
    }
  }
})
