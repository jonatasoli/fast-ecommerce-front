import { defineEventHandler, setCookie } from 'h3'
interface LogoutSuccessResponse {
  success: true
}

interface LogoutErrorResponse {
  success: false
  error: string
}

export type LogoutResponse = LogoutSuccessResponse | LogoutErrorResponse

export default defineEventHandler(async (event): Promise<LogoutResponse> => {
  try {
    setCookie(event, 'token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    })
    setCookie(event, 'userDocument', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    })
    return {
      success: true,
    }
  } catch {
    return {
      success: false,
      error: 'SERVER_ERROR',
    }
  }
})
