<script lang="ts" setup>
import { UserCircleIcon } from '@heroicons/vue/24/outline'
import { NButton, NText } from 'naive-ui'
import { computed, h, useI18n, useRouter } from '#imports'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

const storeUser = useUserStore()
const storeAuth = useAuthStore()

const userState = computed(() => ({
  user: storeUser.user,
  authenticated: storeUser.authenticated,
}))

const router = useRouter()
const { t } = useI18n()

function customReder() {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 0.75rem;',
    },
    [
      h(NButton, {
        type: 'primary',
        size: 'small',
        strong: true,
        onClick: () => {
          router.push('/login')
        },
      }, t('userMenu.myAccount'),
      ),
    ],

  )
}

function customRenderAuthenticated() {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 0.75rem;',
    },
    [
      h(NText, { depth: 3 }, { default: () => `${t('userMenu.welcome')} ${userState.value.user?.name}` }),
    ],
  )
}

const options = [
  {
    key: 'login',
    type: 'render',
    render: customReder,
  },
]

const optionsAuthenticated = [
  {
    key: 'user',
    type: 'render',
    render: customRenderAuthenticated,
  },
  {
    key: 'divider',
    type: 'divider',
  },
  {
    key: 'logout',
    label: 'Sair',
    props: {
      onClick: async () => {
        await storeAuth.logout()
        storeUser.reset()
      },
    },
  },
]
</script>

<template>
  <n-dropdown
    v-if="!userState.authenticated"
    class="header__menu"
    trigger="click"
    :show-arrow="true"
    :options="options"
  >
    <NButton
      quaternary
      circle
      type="primary"
      size="large"
    >
      <template #icon>
        <n-icon :size="30">
          <UserCircleIcon />
        </n-icon>
      </template>
    </NButton>
  </n-dropdown>

  <n-dropdown
    v-else
    class="header__menu"
    trigger="click"
    :show-arrow="true"
    :options="optionsAuthenticated"
  >
    <NButton
      quaternary
      circle
      type="primary"
      size="large"
    >
      <template #icon>
        <div>
          <n-icon :size="30">
            <UserCircleIcon />
          </n-icon>
        </div>
      </template>
    </NButton>
  </n-dropdown>
</template>

<style scoped lang="scss">
@import './userMenu.scss';
</style>
