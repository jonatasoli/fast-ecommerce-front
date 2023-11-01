import { defineStore } from 'pinia'
import { ref, useNuxtApp } from '#imports'

interface User {
  name: string
  document: string
  email: string
  phone: string
  fullName: string
  role: string | null
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const authenticated = ref(false)
  const loadingUser = ref(false)
  const error = ref<string | null>(null)
  const { $config } = useNuxtApp()
  const serverUrl = $config.public.serverUrl

  async function getUser() {
    loadingUser.value = true

    try {
      const res = await fetch(`${serverUrl}/user/token`, {
        method: 'GET',
      })

      const userData = res.data

      if (res.success) {
        user.value = userData
        authenticated.value = true
      } else {
        user.value = null
        authenticated.value = false
      }
    } catch {
      loadingUser.value = false
      error.value = 'SERVER_ERROR'
    } finally {
      loadingUser.value = false
    }
  }

  function reset() {
    user.value = null
    authenticated.value = false
  }

  return {
    authenticated,
    loadingUser,
    user,
    getUser,
    reset,
  }
})
