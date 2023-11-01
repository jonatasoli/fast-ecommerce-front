<script lang='ts' setup>
import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { FormInst } from 'naive-ui'
import { ref, useI18n } from '#imports'

const formRefCreditCard = ref<FormInst | null>(null)
const { t } = useI18n()

const validationSchema = toTypedSchema(zod.object({
  credit_card_number: zod.string().min(16, {
    message: t('checkout.payment.form.credit_card_number_invalid'),
  }),
  credit_card_name: zod.string().min(3, {
    message: t('checkout.payment.form.credit_card_name_invalid'),
  }),
  credit_card_expiration: zod.number().optional(),
  credit_card_cvv: zod.string().min(3, {
    message: t('checkout.payment.form.credit_card_cvv_invalid'),
  }),
  credit_card_installments: zod.string().optional(),
  type_document: zod.string().min(3, {
    message: t('checkout.payment.form.type_document_invalid'),
  }),
  document_number: zod.string().min(11, {
    message: t('checkout.payment.form.document_number_invalid'),
  }),
}))

const { defineComponentBinds, values, validate } = useForm({
  validationSchema,
  initialValues: {
    credit_card_number: '',
    credit_card_name: '',
    credit_card_expiration: undefined,
    credit_card_cvv: '',
    credit_card_installments: '',
    type_document: undefined,
    document_number: '',
  },
})

const naiveConfig = state => ({
  model: 'value',
  validateOnModelUpdate: false,
  props: {
    'feedback': state.errors[0],
    'validation-status': state.errors[0] ? 'error' : undefined,
    'value': state.value,
  },
})

const creditCardNumber = defineComponentBinds('credit_card_number', naiveConfig)
const creditCardName = defineComponentBinds('credit_card_name', naiveConfig)
const creditCardValidate = defineComponentBinds('credit_card_expiration', naiveConfig)
const creditCardCvv = defineComponentBinds('credit_card_cvv', naiveConfig)
const installments = defineComponentBinds('credit_card_installments', naiveConfig)
const typeDocument = defineComponentBinds('type_document', naiveConfig)
const document = defineComponentBinds('document_number', naiveConfig)

defineExpose({
  validate,
  values,
})
</script>

<template>
  <n-form ref="formRefCreditCard">
    <n-form-item :label="t('checkout.payment.credit_card_number')" v-bind="creditCardNumber">
      <n-input
        v-mask="'#### #### #### ####'"
        v-bind="creditCardNumber"
      />
    </n-form-item>
    <n-form-item :label="t('checkout.payment.credit_card_name')" v-bind="creditCardName">
      <n-input v-bind="creditCardName" />
    </n-form-item>
    <n-grid
      :x-gap="20"
      :cols="10"
      item-responsive
    >
      <n-gi span="10 800:5">
        <n-form-item label="Tipo de documento" v-bind="typeDocument">
          <n-select
            v-bind="typeDocument"
            :options="[
              { label: 'CPF', value: 'cpf' },
              { label: 'CNPJ', value: 'cnpj' },
            ]"
          />
        </n-form-item>
      </n-gi>
      <n-gi span="10 800:5">
        <n-form-item label="Documento" v-bind="document">
          <n-input v-bind="document" />
        </n-form-item>
      </n-gi>
      <n-gi span="5 800:2">
        <n-form-item :label="t('checkout.payment.credit_card_validate')" v-bind="creditCardValidate">
          <n-date-picker
            v-bind="creditCardValidate"
            placeholder="MM/AAAA"
            type="month"
            format="MM/yyyy"
            clearable
          />
        </n-form-item>
      </n-gi>
      <n-gi span="5 800:2">
        <n-form-item :label="t('checkout.payment.credit_card_cvv')" v-bind="creditCardCvv">
          <n-input v-bind="creditCardCvv" />
        </n-form-item>
      </n-gi>
      <n-gi span="10 800:6">
        <n-form-item :label="t('checkout.payment.installments')" v-bind="installments">
          <n-select v-bind="installments" />
        </n-form-item>
      </n-gi>
    </n-grid>
  </n-form>
</template>
