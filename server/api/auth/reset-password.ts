export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const serverBaseURL = process.env.SERVER_BASE_URL
  try {
    const res: Response = await fetch(
      `${serverBaseURL}/user/reset-password?token=${body.token}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          document: body.document,
          password: body.newPassword,
        }),
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
      error: 'RESET_PASSWORD_ERROR',
    }
  } catch (error) {
    return {
      success: false,
      error: 'SERVER_ERROR',
    }
  }
})
