export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const serverBaseURL = process.env.SERVER_BASE_URL
  try {
    const res: Response = await fetch(
      `${serverBaseURL}/user/request-reset-password?document=${body.document}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (res.status === 204) {
      return {
        success: true,
      }
    }

    return {
      success: false,
      error: 'REQUEST_RESET_PASSWORD_ERROR',
    }
  } catch {
    return {
      success: false,
      error: 'SERVER_ERROR',
    }
  }
})
