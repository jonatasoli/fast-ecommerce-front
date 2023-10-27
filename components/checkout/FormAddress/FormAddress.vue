<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useCheckoutStore } from '~/stores/checkout'
import { onMounted, useI18n } from '#imports'

interface Props {
  data?: {
    zipcode: string
    country: string
    state: string
    neighborhood: string
    street: string
    street_number: string
  }
  addresType: string
}

const props = defineProps<Props>()

const checkoutStore = useCheckoutStore()
const { checkout } = storeToRefs(checkoutStore)
const { loading } = storeToRefs(useCheckoutStore())
const { t } = useI18n()

const validationSchema = toTypedSchema(zod.object({
  zipcode: zod.string().min(8, {
    message: t('checkout.shipping.form.zipcodeInvalid'),
  }).nonempty(t('checkout.shipping.form.zipcodeRequired')),
  country: zod.string().nonempty(t('checkout.shipping.form.countryRequired')),
  state: zod.string().nonempty(t('checkout.shipping.form.stateRequired')),
  neighborhood: zod.string().nonempty(t('checkout.shipping.form.neighborhoodRequired')),
  street: zod.string().nonempty(t('checkout.shipping.form.streetRequired')),
  street_number: zod.string().nonempty(t('checkout.shipping.form.numberRequired')),
  address_complement: zod.string().optional(),
}))

const { defineComponentBinds, setValues, validate, values } = useForm({
  validationSchema,
  initialValues: {
    zipcode: '',
    country: '',
    state: '',
    neighborhood: '',
    street: '',
    street_number: '',
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

const zipcode = defineComponentBinds('zipcode', naiveConfig)
const country = defineComponentBinds('country', naiveConfig)
const state = defineComponentBinds('state', naiveConfig)
const neighborhood = defineComponentBinds('neighborhood', naiveConfig)
const street = defineComponentBinds('street', naiveConfig)
const street_number = defineComponentBinds('street_number', naiveConfig)
const address_complement = defineComponentBinds('address_complement', naiveConfig)

function handleGetAddressByZipcode() {
  if (!zipcode.value) {
    return
  }
  checkoutStore.getAddressByZipcode(zipcode.value.value, props.addresType)
    .then(() => {
      fillFormAddress(checkout.value[props.addresType])
    })
}
function fillFormAddress(values) {
  if (!values || !values.zipcode) {
    return
  }
  setValues({
    zipcode: values.zipcode,
    country: values.country,
    state: values.state,
    neighborhood: values.neighborhood,
    street: values.street,
    street_number: values.street_number,
  })
}

onMounted(() => {
  fillFormAddress(props.data)
})

defineExpose({
  validate,
  values,
})
</script>

<template>
  <n-form ref="formRef" class="border checkout__address">
    <n-grid
      x-gap="6 800:20"
      cols="4 800:12"
      class="zipcode"
      style="align-items: center"
    >
      <n-gi span="3 800:11">
        <n-form-item
          :label="t('checkout.shipping.form.zipcode')"
          v-bind="zipcode"
          path="zipcode"
        >
          <n-input v-bind="zipcode" />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-button
          type="primary"
          strong
          class="btn-checkout"
          :loading="loading"
          icon-placement="left"
          :disabled="!zipcode.value"
          @click="handleGetAddressByZipcode"
        >
          {{ t('checkout.shipping.form.search') }}
        </n-button>
      </n-gi>
    </n-grid>
    <n-grid :x-gap="20" :cols="2">
      <n-gi>
        <n-form-item
          :label="t('checkout.shipping.form.country')"
          v-bind="country"
          path="country"
        >
          <n-input v-bind="country" readonly />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item
          :label="t('checkout.shipping.form.state')"
          v-bind="state"
          path="state"
        >
          <n-input v-bind="state" readonly />
        </n-form-item>
      </n-gi>
    </n-grid>
    <n-form-item
      :label="t('checkout.shipping.form.neighborhood')"
      v-bind="neighborhood"
      path="neighborhood"
    >
      <n-input v-bind="neighborhood" />
    </n-form-item>
    <n-grid :x-gap="20" :cols="2">
      <n-gi>
        <n-form-item
          :label="t('checkout.shipping.form.street')"
          v-bind="street"
          path="street"
        >
          <n-input v-bind="street" />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item
          :label="t('checkout.shipping.form.number')"
          v-bind="street_number"
          path="street_number"
        >
          <n-input v-bind="street_number" />
        </n-form-item>
      </n-gi>
    </n-grid>
    <n-form-item
      :label="t('checkout.shipping.form.complement')"
      v-bind="address_complement"
      path="address_complement"
    >
      <n-input v-bind="address_complement" />
    </n-form-item>
  </n-form>
</template>

<style lang="scss" scoped>
@import './FormAddress.scss';
</style>
