<script setup lang="ts">
  import { ChevronRightIcon } from '@heroicons/vue/24/outline'
  import { useForm } from 'vee-validate'
  import * as zod from 'zod'

  import { toTypedSchema } from '@vee-validate/zod'
  import { useNotification } from 'naive-ui'
  import { useAuthStore } from '@/stores/auth'
  import { definePageMeta, ref, useI18n, useRoute, useRouter } from '#imports'

  definePageMeta({
    layout: 'empty',
  })

  useHead({
    title: 'Login',
  })
  const config = useRuntimeConfig()
  const siteKey = config.public.siteKey
  const router = useRouter()
  const route = useRoute()
  const notification = useNotification()
  const redirect = ref(route.query.redirect as string | undefined)
  const { t } = useI18n()
  const error = ref('')
  const validationSchema = toTypedSchema(
    zod.object({
      username: zod.string().min(3, t('login.formValidation.requiredUsername')),
      password: zod.string().min(6, t('login.formValidation.requiredPassword')),
    }),
  )

  const { handleSubmit, defineField, setFieldError } = useForm({
    validationSchema,
    initialValues: {
      username: '',
      password: '',
    },
  })

  const naiveConfig = (state) => ({
    model: 'value',
    validateOnModelUpdate: false,
    props: {
      feedback: state.errors[0],
      'validation-status': state.errors[0] ? 'error' : undefined,
    },
  })

  const [username, usernameProps] = defineField('username', naiveConfig)
  const [password, passwordProps] = defineField('password', naiveConfig)

  const authStore = useAuthStore()

  const onSubmit = handleSubmit(async (values) => {
    const { username, password } = values
    const cleanCPF = username.replace(/\D/g, '')
    const token = await grecaptcha.execute(siteKey, { action: 'submit' })
    const res = await authStore.login({ username: cleanCPF, password })
    if (!res?.success) {
      const getError =
        res?.error === 'INVALID_CREDENTIALS'
          ? t('login.formValidation.invalidCredentials')
          : t('login.formValidation.serverError')
      error.value = getError
      return
    }

    error.value = ''
    if (redirect.value && token) {
      router.push(redirect.value)
      return
    }

    router.push('/')
  })

  async function handleForgotPassword() {
    if (!unref(username)) {
      setFieldError('username', t('login.formValidation.requiredUsername'))
      return
    }
    const cleanCPF = unref(username)?.replace(/\D/g, '') ?? ''
    const response = await authStore.requestResetPassword(cleanCPF)

    if (!response?.success) {
      notification.error({
        title: 'Erro',
        content: t('login.requestResetPassword.error'),
        duration: 2500,
      })
      return
    }

    notification.success({
      title: t('login.requestResetPassword.success.title'),
      content: t('login.requestResetPassword.success.content'),
      duration: 5000,
    })
  }
</script>

<template>
  <div class="login">
    <NuxtLink to="/">
      <img src="~/assets/logo-gold.png" alt="Logo" width="200" />
    </NuxtLink>

    <div class="login__form-container">
      <p>{{ t('login.title') }}</p>

      <n-form class="login__form">
        <n-form-item
          v-mask="'###.###.###-##'"
          :label="t('login.username')"
          path="document"
          v-bind="usernameProps"
        >
          <n-input
            v-model:value="username"
            :placeholder="t('login.username')"
          />
        </n-form-item>
        <n-form-item
          :label="t('login.password')"
          path="password"
          v-bind="passwordProps"
        >
          <n-input
            v-model:value="password"
            type="password"
            :placeholder="t('login.password')"
          />
        </n-form-item>
      </n-form>
      <div class="login__error">
        {{ error }}
      </div>

      <div class="login__form-actions">
        <n-button
          type="primary"
          size="large"
          round
          strong
          block
          class="login__form-actions-button"
          @click="onSubmit"
        >
          {{ t('login.submit') }}
        </n-button>
      </div>
      <div class="login__buttons">
        <n-button
          type="primary"
          size="large"
          icon-placement="right"
          quaternary
          strong
          round
          class="login__form-actions-button"
          @click="handleForgotPassword"
        >
          <template #icon>
            <n-icon>
              <ChevronRightIcon />
            </n-icon>
          </template>
          {{ t('login.forgotPassword') }}
        </n-button>
        <NuxtLink to="/register">
          <n-button
            type="primary"
            size="large"
            icon-placement="right"
            strong
            quaternary
            class="login__form-actions-button"
          >
            <template #icon>
              <n-icon>
                <ChevronRightIcon />
              </n-icon>
            </template>
            {{ t('login.register') }}
          </n-button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/pages/login.scss';
</style>
