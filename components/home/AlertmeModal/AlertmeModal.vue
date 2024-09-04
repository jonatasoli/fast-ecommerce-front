<template>
  <n-modal
    v-model:show="show"
    type="warning"
    preset="dialog"
    @after-leave="handleNegativeClick"
  >
    <template #header>
      <div>{{ t('alertmeModal.title') }}</div>
    </template>

    <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules">
      <template #default>
        <n-form-item
          v-mask="'(##) # ####-####'"
          :label="t('alertmeModal.phoneLabel')"
          path="phone"
        >
          <n-input
            v-model:value="formValue.phone"
            :placeholder="t('alertmeModal.phonePlaceholder')"
          />
        </n-form-item>
        <n-form-item :label="t('alertmeModal.emailLabel')" path="email">
          <n-input
            v-model:value="formValue.email"
            :placeholder="t('alertmeModal.emailPlaceholder')"
          />
        </n-form-item>
      </template>
    </n-form>

    <template #action>
      <n-form-item>
        <n-button @click="handleNegativeClick">Cancelar</n-button>
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="handlePositiveClick">{{
          t('alertmeModal.sendButton')
        }}</n-button>
      </n-form-item>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
  import type { FormInst } from 'naive-ui'
  import { useMessage } from 'naive-ui'
  import { useProductsStore } from '~/stores/products'
  import { useI18n } from '#imports'

  const emit = defineEmits(['update:modalValue'])
  const store = useProductsStore()
  const { t } = useI18n()
  const props = defineProps<{ modalValue: boolean; productId: number }>()

  const show = useVModel(props, 'modalValue')

  watch(
    () => props.modalValue,
    () => {
      show.value = props.modalValue
    },
  )

  watch(
    () => props.productId,
    (newProductId) => {
      formValue.value.product_id = newProductId
    },
  )

  onMounted(() => {
    formValue.value.product_id = props.productId
  })

  const message = useMessage()

  const formRef = ref<FormInst | null>(null)
  const formValue = ref({
    phone: '',
    email: '',
    product_id: 0,
  })

  const rules = {
    phone: {
      required: true,
      message: t('alertmeModal.rules.phoneRequired'),
      trigger: ['input', 'blur', 'submit'],
    },
    email: [
      {
        required: true,
        message: t('alertmeModal.rules.emailRequired'),
        trigger: ['input', 'blur', 'submit'],
      },
      {
        type: 'email',
        message: t('alertmeModal.rules.emailInvalid'),
        trigger: ['input', 'blur', 'submit'],
      },
    ],
  }

  const handlePositiveClick = () => {
    formRef.value?.validate(async (errors) => {
      if (!errors) {
        const res = await store.alertMe(formValue.value)
        if (res.status === 'error') {
          message.error(`${res.message}`)
        }
        if (res.status === 'success') {
          message.success(`${res.message}`)
        }
        emit('update:modalValue', false)
      } else {
        message.error('Falha no envio')
      }
    })
  }

  const handleNegativeClick = () => {
    emit('update:modalValue', false)
    formValue.value = {
      phone: '',
      email: '',
      product_id: 0,
    }
  }
</script>
