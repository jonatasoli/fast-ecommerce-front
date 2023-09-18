import { defineEventHandler, readBody } from 'h3'

interface RegisterSuccessResponse {
  success: true
}

interface RegisterErrorResponse {
  success: false
  error: string
}

export type RegisterResponse = RegisterSuccessResponse | RegisterErrorResponse

export default defineEventHandler(async (event): Promise<RegisterResponse> => {
  const body = await readBody(event)
  const serverBaseURL = process.env.SERVER_BASE_URL

  try {
    const res = await fetch(`${serverBaseURL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    const success = data?.message.includes('sucesso')
    if (!success) {
      return {
        success: false,
        error: 'REGISTER_ERROR',
      }
    }

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
