<script setup lang="ts">
  import { useForm } from 'vee-validate'
  import { z } from 'zod'

  import { toTypedSchema } from '@vee-validate/zod'
  import { useNotification } from 'naive-ui'
  import { definePageMeta, ref, useI18n, useRouter } from '#imports'
  import { useAuthStore } from '@/stores/auth'
  import BannerTerms from '~/components/app/BannerTerms/BannerTerms.vue'

  definePageMeta({
    layout: 'empty',
  })

  useHead({
    title: 'Registro',
  })

  const { register } = useAuthStore()
  const config = useRuntimeConfig()
  const recaptchaKey = config.public.recaptchaKey
  const router = useRouter()
  const { t } = useI18n()

  const validationSchema = toTypedSchema(
    z
      .object({
        name: z.string().nonempty(t('register.formValidation.requiredName')),
        username: z
          .string()
          .nonempty(t('register.formValidation.requiredUsername'))
          .regex(/^[a-z0-9]+$/, t('register.formValidation.invalidUsername'))
          .transform((val) => val.toLowerCase()),
        mail: z
          .string()
          .email(t('register.formValidation.invalidEmail'))
          .nonempty(t('register.formValidation.requiredEmail')),
        document: z
          .string()
          .nonempty(t('register.formValidation.requiredDocument')),
        password: z
          .string()
          .min(6, t('register.formValidation.passwordMinLength'))
          .nonempty(t('register.formValidation.requiredPassword')),
        confirmPassword: z
          .string()
          .nonempty(t('register.formValidation.requiredConfirmPassword')),
        phone: z.string(),
        terms: z.boolean().refine((val) => val === true, {
          message: t('register.formValidation.acceptTerms'),
        }),
      })
      .refine(
        (value) => {
          return value.password === value.confirmPassword
        },
        {
          message: t('register.formValidation.passwordMismatch'),
          path: ['confirmPassword'],
        },
      ),
  )

  const { defineComponentBinds, handleSubmit, setFieldValue } = useForm({
    validationSchema,
    initialValues: {
      name: '',
      username: '',
      mail: '',
      password: '',
      confirmPassword: '',
      document: '',
      phone: '',
      terms: false,
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

  const showModal = ref(false)
  const name = defineComponentBinds('name', naiveConfig)
  const username = defineComponentBinds('username', naiveConfig)
  const mail = defineComponentBinds('mail', naiveConfig)
  const document = defineComponentBinds('document', naiveConfig)
  const password = defineComponentBinds('password', naiveConfig)
  const confirmPassword = defineComponentBinds('confirmPassword', naiveConfig)
  const terms = defineComponentBinds('terms', naiveConfig)
  const phone = ref('')
  const countryCallingCode = ref('')
  const phoneIsValid = ref(true)
  const notification = useNotification()

  const onSubmit = handleSubmit(async (values) => {
    const res = await register(values)
    const token = await grecaptcha.execute(recaptchaKey, { action: 'submit' })
    if (!res?.success && !token) {
      notification.error({
        title: t('register.notification.error.title'),
        content: t('register.notification.error.content'),
        duration: 2500,
      })
      return
    }

    notification.success({
      title: t('register.notification.success.title'),
      content: t('register.notification.success.content'),
      duration: 2500,
    })
    router.push('/login')
  })
  function validPhoneNumber(phoneNumber) {
    if (phoneNumber.valid) {
      phoneIsValid.value = true
      countryCallingCode.value = phoneNumber.countryCallingCode
    } else {
      phoneIsValid.value = false
    }
  }

  function onBlurPhone() {
    const replacedPhone = phone.value.replace(/\D/g, '')
    const phoneNumber = `+${countryCallingCode.value}${replacedPhone}`
    setFieldValue('phone', phoneNumber)
  }

  function handleCheckedChange() {
    showModal.value = true
  }

  function handleCloseModal() {
    showModal.value = false
    setFieldValue('terms', true)
  }
</script>

<template>
  <div class="register">
    <NuxtLink to="/">
      <img src="~/assets/logo-gold.png" alt="Logo" width="200" />
    </NuxtLink>
    <div class="register__form-container">
      <p>{{ t('register.title') }}</p>

      <n-form class="register__form">
        <n-form-item :label="t('register.name')" path="name" v-bind="name">
          <n-input v-bind="name" :placeholder="t('register.name')" />
        </n-form-item>
        <n-form-item
          :label="t('register.username')"
          path="username"
          v-bind="username"
        >
          <n-input v-bind="username" :placeholder="t('register.username')" />
        </n-form-item>
        <n-form-item :label="t('register.email')" path="mail" v-bind="mail">
          <n-input v-bind="mail" :placeholder="t('register.email')" />
        </n-form-item>
        <n-form-item
          :label="t('register.document')"
          path="document"
          v-bind="document"
        >
          <n-input v-bind="document" :placeholder="t('register.document')" />
        </n-form-item>
        <n-form-item
          :label="t('register.password')"
          path="password"
          v-bind="password"
        >
          <n-input
            v-bind="password"
            type="password"
            :placeholder="t('register.password')"
          />
        </n-form-item>
        <n-form-item
          :label="t('register.confirmPassword')"
          path="confirmPassword"
          v-bind="confirmPassword"
        >
          <n-input
            v-bind="confirmPassword"
            type="password"
            :placeholder="t('register.confirmPassword')"
          />
        </n-form-item>
        <n-form-item
          label="Telefone"
          path="phone"
          :feedback="
            phoneIsValid
              ? undefined
              : `${t('register.formValidation.invalidPhone')}`
          "
          :validation-status="phoneIsValid ? undefined : 'error'"
          :validate-on-model-update="false"
        >
          <vue-tel-input
            v-model="phone"
            :input-options="{
              placeholder: `${t('register.phone')}`,
            }"
            @validate="validPhoneNumber"
            @blur="onBlurPhone"
          />
        </n-form-item>

        <n-form-item v-bind="terms" path="terms">
          <n-checkbox v-model="terms" @update:checked="handleCheckedChange">
            {{ t('terms') }}</n-checkbox
          >
        </n-form-item>
      </n-form>

      <div class="register__form-actions">
        <n-button
          type="primary"
          size="large"
          round
          strong
          block
          class="register__form-actions-button"
          @click="onSubmit"
        >
          {{ t('register.submit') }}
        </n-button>
      </div>
    </div>
    <BannerTerms :is-open="showModal" @close="handleCloseModal" />
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/scss/pages/register.scss' as *;
</style>
