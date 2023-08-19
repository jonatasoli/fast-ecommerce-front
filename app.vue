<script setup lang="ts">
import { useNuxtApp } from '#imports'
import { useUserStore } from '@/stores/user'

const nuxtApp = useNuxtApp()

const storeUser = useUserStore()
await storeUser.getUser()

nuxtApp.hook('page:finish', () => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
