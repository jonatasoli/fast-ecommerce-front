<script setup lang="ts">
  import { toTypedSchema } from '@vee-validate/zod'
  import { useNotification } from 'naive-ui'
  import { useForm } from 'vee-validate'
  import * as zod from 'zod'

  definePageMeta({
    layout: 'empty',
  })

  useHead({
    title: 'Esqueci minha senha',
  })

  const { t } = useI18n()
  const authStore = useAuthStore()
  const route = useRoute()
  const router = useRouter()
  const notification = useNotification()
  const validationSchema = toTypedSchema(
    zod
      .object({
        document: zod
          .string()
          .min(11, t('resetPassword.formValidation.documentRequired')),
        newPassword: zod
          .string()
          .min(3, t('resetPassword.formValidation.requiredNewPassword')),
        confirmPassword: zod
          .string()
          .min(6, t('resetPassword.formValidation.requiredConfirmPassword')),
      })
      .refine((data) => data.newPassword === data.confirmPassword, {
        message: t('resetPassword.formValidation.passwordMismatch'),
        path: ['confirmPassword'],
      }),
  )

  const { handleSubmit, defineField } = useForm({
    validationSchema,
    initialValues: {
      document: '',
      newPassword: '',
      confirmPassword: '',
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

  const [document, documentProps] = defineField('document', naiveConfig)

  const [newPassword, newPasswordProps] = defineField(
    'newPassword',
    naiveConfig,
  )
  const [confirmPassword, confirmPasswordProps] = defineField(
    'confirmPassword',
    naiveConfig,
  )

  const onSubmit = handleSubmit(async (values) => {
    const { document, newPassword } = values
    const token = route.query.token as string
    const cleanCPF = unref(document)?.replace(/\D/g, '') ?? ''
    const response = await authStore.resetPassword({
      document: cleanCPF,
      newPassword,
      token,
    })

    if (!response?.success) {
      notification.error({
        title: t('resetPassword.message.error.title'),
        content: t('resetPassword.message.error.content'),
        duration: 2500,
      })
      return
    }

    notification.success({
      title: t('resetPassword.message.success.title'),
      content: t('resetPassword.message.success.content'),
      duration: 2500,
    })
    router.push('/login')
  })
</script>
<template>
  <div class="resetPassword">
    <NuxtLink to="/">
      <img src="~/assets/logo-gold.png" alt="Logo" width="200" />
    </NuxtLink>

    <div class="resetPassword__form-container">
      <p>{{ t('resetPassword.title') }}</p>

      <n-form class="resetPassword__form">
        <n-form-item
          v-mask="'###.###.###-##'"
          :label="t('resetPassword.document')"
          path="document"
          v-bind="documentProps"
        >
          <n-input
            v-model:value="document"
            :placeholder="t('resetPassword.document')"
          />
        </n-form-item>
        <n-form-item
          :label="t('resetPassword.newPassword')"
          path="newPassword"
          v-bind="newPasswordProps"
        >
          <n-input
            v-model:value="newPassword"
            type="password"
            :placeholder="t('resetPassword.newPassword')"
          />
        </n-form-item>
        <n-form-item
          :label="t('resetPassword.confirmPassword')"
          path="password"
          v-bind="confirmPasswordProps"
        >
          <n-input
            v-model:value="confirmPassword"
            type="password"
            :placeholder="t('resetPassword.confirmPassword')"
          />
        </n-form-item>
      </n-form>

      <div class="resetPassword__form-actions">
        <n-button
          type="primary"
          size="large"
          round
          strong
          block
          class="resetPassword__form-actions-button"
          @click="onSubmit"
        >
          {{ t('resetPassword.submit') }}
        </n-button>
      </div>
      <div class="resetPassword__buttons">
        <n-button
          type="primary"
          size="large"
          icon-placement="right"
          quaternary
          strong
          round
          class="resetPassword__form-actions-button"
        >
          <template #icon>
            <n-icon>
              <ChevronRightIcon />
            </n-icon>
          </template>
          {{ t('resetPassword.return') }}
        </n-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/scss/pages/resetPassword.scss' as *;
</style>
