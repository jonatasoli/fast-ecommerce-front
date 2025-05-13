<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useNotification } from 'naive-ui'
  import { locales } from '@/utils/helpers'
  import { useUserStore } from '@/stores/user'
  import { useI18n, useCookie, type UserBase } from '#imports'

  definePageMeta({
    layout: 'default',
    middleware: [
      function () {
        const { user } = storeToRefs(useUserStore())

        if (!user.value) {
          return navigateTo('/')
        }
      },
    ],
  })

  useHead({
    title: 'Profile',
  })

  const storeUser = useUserStore()
  const lang = useCookie('i18n_redirected')
  const notification = useNotification()
  const isEditing = ref(false)
  const cartStore = useCartStore()

  const { t } = useI18n()

  const user = ref<UserBase>({
    name: '',
    email: '',
    document: '',
    phone: '',
  })
  const maskDocument = ref('')

  function getUserData() {
    try {
      const data = storeUser.user

      if (!data) {
        notification.error({
          title: t('profile.notification.error.title'),
          content: t('profile.notification.error.content'),
          duration: 2500,
        })
        return
      }

      user.value = {
        name: data.name ?? '',
        email: data.email ?? '',
        document: data.document ?? '',
        phone: data.phone ?? '',
      }
    } catch (error) {
      console.error('[getUserData error]', error)
      notification.error({
        title: t('profile.notification.error.title'),
        content: t('profile.notification.error.content'),
        duration: 2500,
      })
    }
  }

  function changeLanguage(lang: string) {
    document.cookie = `i18n_redirected=${lang}; path=/; max-age=31536000`
  }

  function handleSave() {
    isEditing.value = false
    changeLanguage(lang.value ?? '')

    cartStore.clearCart()
    cartStore.clearAffiliate()

    location.reload()
  }

  watch(
    () => user.value.document,
    (doc) => {
      const digits = doc.replace(/\D/g, '')

      if (digits.length <= 11) {
        maskDocument.value = '###.###.###-##'
      } else {
        maskDocument.value = '##.###.###/####-##'
      }
    },
    { immediate: true },
  )

  onMounted(() => {
    getUserData()
  })
</script>

<template>
  <div class="user-page">
    <div class="header">
      <h1 class="title">{{ t('checkout.user.title') }}</h1>
    </div>

    <div class="form">
      <n-form :model="user" label-placement="top" size="large">
        <n-form-item :label="t('checkout.user.name')">
          <n-input v-model:value="user.name" :disabled="!isEditing" readonly />
        </n-form-item>

        <n-form-item :label="t('checkout.user.document')">
          <n-input
            v-model:value="user.document"
            v-mask="`${maskDocument}`"
            :disabled="!isEditing"
            readonly
          />
        </n-form-item>

        <n-form-item :label="t('checkout.user.phone')">
          <n-input v-model:value="user.phone" :disabled="!isEditing" readonly />
        </n-form-item>

        <n-form-item :label="t('checkout.user.email')">
          <n-input v-model:value="user.email" :disabled="!isEditing" readonly />
        </n-form-item>

        <n-form-item :label="t('checkout.user.chooseLanguage')">
          <n-select
            v-model:value="lang"
            :options="locales"
            :disabled="!isEditing"
            @update:value="changeLanguage"
          />
        </n-form-item>

        <div class="buttons">
          <n-button
            type="primary"
            ghost
            :disabled="isEditing"
            @click="isEditing = true"
            >{{ t('checkout.user.buttons.edit') }}</n-button
          >
          <n-button type="primary" :disabled="!isEditing" @click="handleSave">{{
            t('checkout.user.buttons.save')
          }}</n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .user-page {
    padding: 1rem;
    max-width: 700px;
    margin: 0 auto;

    .header {
      margin-bottom: 1.5rem;
      text-align: center;

      .title {
        font-size: 2rem;
        color: $primary-color;
        font-weight: 600;
      }
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .buttons {
      display: flex;
      justify-content: end;
      gap: 1rem;
      margin-top: 1.5rem;
    }
  }
</style>
