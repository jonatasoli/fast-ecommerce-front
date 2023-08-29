<script lang="ts" setup>
import { Bars3Icon, UserCircleIcon } from '@heroicons/vue/24/outline'
import { reactive, ref, useI18n } from '#imports'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

const show = ref(false)
const storeUser = useUserStore()
const storeAuth = useAuthStore()

const userState = reactive({
  user: storeUser.user,
  authenticated: storeUser.authenticated,
})

const { t } = useI18n()

async function logout() {
  await storeAuth.logout()
  storeUser.reset()
  userState.user = storeUser.user
  userState.authenticated = storeUser.authenticated
}
</script>

<template>
  <n-button
    quaternary
    circle
    type="primary"
    size="large"
    @click="show = true"
  >
    <template #icon>
      <n-icon :size="30">
        <Bars3Icon />
      </n-icon>
    </template>
  </n-button>

  <n-drawer v-model:show="show" placement="left">
    <n-drawer-content
      closable
    >
      <template v-if="!userState.authenticated" #header>
        <div class="menu__header">
          <n-icon :size="30" color="#DA9A39">
            <UserCircleIcon />
          </n-icon>

          <p class="menu__auth">
            {{ t('userMenu.welcome') }}
            <NuxtLink to="/login">
              {{ t('userMenu.login') }}
            </NuxtLink> {{ t('userMenu.or') }} <NuxtLink to="/register">
              {{ t('userMenu.register') }}
            </NuxtLink>
          </p>
        </div>
      </template>

      <template v-else #header>
        <div class="menu__header-authenticated">
          <n-icon :size="30" color="#DA9A39">
            <UserCircleIcon />
          </n-icon>

          <div>
            <p class="menu__auth">
              {{ t('userMenu.welcome') }} {{ userState.user.name }}
            </p>
            <button class="menu__auth--logout" @click="logout">
              {{ t('userMenu.logout') }}
            </button>
          </div>
        </div>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<style lang="scss" scoped>
@import './userMenuMobile.scss';
</style>
