<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import { useForm } from 'vee-validate'
import * as zod from 'zod'

import { toTypedSchema } from '@vee-validate/zod'
import { useAuthStore } from '@/stores/auth'
import { definePageMeta, ref, useI18n, useRouter } from '#imports'

definePageMeta({
  layout: 'empty',
})
const router = useRouter()
const { t } = useI18n()
const error = ref('')
const validationSchema = toTypedSchema(zod.object({
  username: zod.string().nonempty(t('login.formValidation.requiredUsername')),
  password: zod.string().nonempty(t('login.formValidation.requiredPassword')),
}))

const { defineComponentBinds, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    username: '',
    password: '',
  },
})

const naiveConfig = state => ({
  model: 'value',
  validateOnModelUpdate: false,
  props: {
    'feedback': state.errors[0],
    'validation-status': state.errors[0] ? 'error' : undefined,
  },
})

const username = defineComponentBinds('username', naiveConfig)
const password = defineComponentBinds('password', naiveConfig)

const { login } = useAuthStore()

const onSubmit = handleSubmit(async (values) => {
  const res = await login(values)
  if (!res?.success) {
    const getError = res?.error === 'INVALID_CREDENTIALS'
      ? t('login.formValidation.invalidCredentials')
      : t('login.formValidation.serverError')
    error.value = getError
    return
  }

  error.value = ''
  router.push('/')
})
</script>

<template>
  <div class="login">
    <NuxtLink
      to="/"
    >
      <img
        src="~/assets/logo-gold.png"
        alt="Logo"
        width="200"
      >
    </NuxtLink>

    <div class="login__form-container">
      <p>{{ t("login.title") }}</p>

      <n-form
        class="login__form"
      >
        <n-form-item
          :label="t('login.username')"
          path="document"
          v-bind="username"
        >
          <n-input v-bind="username" :placeholder="t('login.username')" />
        </n-form-item>
        <n-form-item
          :label="t('login.password')"
          path="password"
          v-bind="password"
        >
          <n-input
            v-bind="password"
            type="password"
            :placeholder=" t('login.password') "
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
          {{ t("login.submit") }}
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
        >
          <template #icon>
            <n-icon>
              <ChevronRightIcon />
            </n-icon>
          </template>
          {{ t("login.forgotPassword") }}
        </n-button>
        <NuxtLink
          to="/register"
        >
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
            {{ t("login.register") }}
          </n-button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/pages/login.scss';
</style>
