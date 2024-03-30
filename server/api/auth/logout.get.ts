import { defineEventHandler, setCookie } from 'h3'
import type { LogoutResponse } from '~/utils/types'

export default defineEventHandler((event): LogoutResponse => {
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
