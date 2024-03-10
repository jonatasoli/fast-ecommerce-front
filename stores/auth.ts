import { defineStore } from 'pinia'
import { useUserStore } from './user'
import type { RegisterResponse } from '@/server/api/auth/register.post'
import type { LogoutResponse } from '@/server/api/auth/logout.get'
import type { LoginResponse } from '@/server/api/auth/login.post'
import { ref, useFetch } from '#imports'

interface LoginParams {
  username: string
  password: string
}

interface RegisterParams {
  name: string
  username: string
  password: string
  mail: string
  document: string
  phone: string
}

export const useAuthStore = defineStore('auth', () => {
  const loading = ref(false)

  async function login({ username, password }: LoginParams) {
    const payload = {
      username,
      password,
    }
    const { data: loginData, pending } = await useFetch<LoginResponse>(
      '/api/auth/login',
      {
        method: 'POST',
        body: payload,
      },
    )

    loading.value = pending.value
    if (loginData.value?.success) {
      await useUserStore().getUser()
    }

    return loginData.value
  }

  async function register(payload: RegisterParams) {
    const { data: registerData, pending } = await useFetch<RegisterResponse>(
      '/api/auth/register',
      {
        method: 'POST',
        body: payload,
      },
    )

    loading.value = pending.value
    return registerData.value
  }

  async function requestResetPassword(document: string) {
    const { data: forgotPasswordData, pending } =
      await useFetch<RegisterResponse>('/api/auth/request-reset-password', {
        method: 'POST',
        body: {
          document,
        },
      })

    loading.value = pending.value
    return forgotPasswordData.value
  }

  async function resetPassword(data: {
    document: string
    newPassword: string
    token: string
  }) {
    const { document, newPassword, token } = data
    const { data: resetPasswordData, pending } =
      await useFetch<RegisterResponse>('/api/auth/reset-password', {
        method: 'PATCH',
        body: {
          document,
          newPassword,
          token,
        },
      })

    loading.value = pending.value
    return resetPasswordData.value
  }

  async function logout() {
    await useFetch<LogoutResponse>('/api/auth/logout')
  }

  return {
    login,
    register,
    requestResetPassword,
    resetPassword,
    logout,
    loading,
  }
})
