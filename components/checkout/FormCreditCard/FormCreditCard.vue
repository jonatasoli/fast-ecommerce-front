<script lang='ts' setup>
import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref, useI18n, onMounted } from '#imports'

interface Props {
  data?: {
    creditCardNumber: string
    creditCardName: string
    creditCardExpiration: number
    creditCardCvv: string
    installments: number
    typeDocument: string
    document: string
  } | null
  optionInstallments: { label: string; value: number }[]
}

const props =  defineProps<Props>()
const formRefCreditCard = ref<null>(null)
const { t } = useI18n()
const emit = defineEmits(['onInputCreditCard'])

const validationSchema = toTypedSchema(zod.object({
  creditCardNumber: zod.string().min(16, {
    message: t('checkout.payment.form.credit_card_number_invalid'),
  }),
  creditCardName: zod.string().min(3, {
    message: t('checkout.payment.form.credit_card_name_invalid'),
  }),
  creditCardExpiration: zod.number().optional(),
  creditCardCvv: zod.string().min(3, {
    message: t('checkout.payment.form.credit_card_cvv_invalid'),
  }),
  installments: zod.number().optional(),
  typeDocument: zod.string().min(3, {
    message: t('checkout.payment.form.type_document_invalid'),
  }),
  document: zod.string().min(11, {
    message: t('checkout.payment.form.document_number_invalid'),
  }),
}))

const { defineComponentBinds, values, validate, setValues } = useForm({
  validationSchema,
  initialValues: {
    creditCardNumber: '',
    creditCardName: '',
    creditCardExpiration: undefined,
    creditCardCvv: '',
    installments: undefined,
    typeDocument: undefined,
    document: '',
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

const creditCardNumber = defineComponentBinds('creditCardNumber', naiveConfig)
const creditCardName = defineComponentBinds('creditCardName', naiveConfig)
const creditCardValidate = defineComponentBinds('creditCardExpiration', naiveConfig)
const creditCardCvv = defineComponentBinds('creditCardCvv', naiveConfig)
const installments = defineComponentBinds('installments', naiveConfig)
const typeDocument = defineComponentBinds('typeDocument', naiveConfig)
const document = defineComponentBinds('document', naiveConfig)

function handleCreditCardNumberChange(number) {
  emit('onInputCreditCard', number.replace(/\s/g, ''))
}

function fillFormCreditCard(values) {
  if (!values) {
    return
  }
  setValues({
    creditCardNumber: values.creditCardNumber,
    creditCardName: values.creditCardName,
    creditCardExpiration: values.creditCardExpiration,
    creditCardCvv: values.creditCardCvv,
    installments: values.installments,
    typeDocument: values.typeDocument,
    document: values.document,
  })
}

defineExpose({
  validate,
  values,
})

onMounted(async() => {
  if (!props.data) {
    return
  }
  fillFormCreditCard(props.data)
})

</script>

<template>
  <n-form ref="formRefCreditCard">
    <n-form-item :label="t('checkout.payment.credit_card_number')" v-bind="creditCardNumber">
      <n-input
        v-mask="'#### #### #### ####'"
        v-bind="creditCardNumber"
        @input="handleCreditCardNumberChange"
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
          <n-select v-bind="installments" :options="optionInstallments" />
        </n-form-item>
      </n-gi>
    </n-grid>
  </n-form>
</template>
