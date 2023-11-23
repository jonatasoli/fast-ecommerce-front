<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { onMounted, useI18n } from '#imports'
import { useCartStore } from '~/stores/cart'

interface Props {
  data?: {
    zipcode: string
    country: string
    state: string
    neighborhood: string
    street: string
    street_number: string
  } | null
  addresType: string
  readonlyZipcode?: boolean
}

const props = defineProps<Props>()

const cartStore = useCartStore()
const { address } = storeToRefs(cartStore)
const { t } = useI18n()

const validationSchema = toTypedSchema(zod.object({
  zipcode: zod.string().min(8, {
    message: t('checkout.shipping.form.zipcodeInvalid'),
  }),
  country: zod.string().min(3, t('checkout.shipping.form.countryRequired')),
  state: zod.string().min(2, t('checkout.shipping.form.stateRequired')),
  city: zod.string().min(3, t('checkout.shipping.form.stateRequired')),
  neighborhood: zod.string().min(3, t('checkout.shipping.form.neighborhoodRequired')),
  street: zod.string().min(3, t('checkout.shipping.form.streetRequired')),
  street_number: zod.string().min(1, t('checkout.shipping.form.numberRequired')),
  address_complement: zod.string().optional(),
}))

const { defineComponentBinds, setValues, validate, values } = useForm({
  validationSchema,
  initialValues: {
    zipcode: '',
    country: '',
    state: '',
    city: '',
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
const city = defineComponentBinds('city', naiveConfig)
const neighborhood = defineComponentBinds('neighborhood', naiveConfig)
const street = defineComponentBinds('street', naiveConfig)
const streetNumber = defineComponentBinds('street_number', naiveConfig)
const addressComplement = defineComponentBinds('address_complement', naiveConfig)

function handleGetAddressByZipcode() {
  if (!zipcode.value) {
    return
  }
  cartStore.getAddressByZipcode(zipcode.value.value, props.addresType)
    .then(() => {
      fillFormAddress(address.value[props.addresType])
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
    city: values.city,
    neighborhood: values.neighborhood,
    street: values.street,
    street_number: values.street_number,
  })
}

onMounted(async() => {
  if (!props.data) {
    return
  }
  await cartStore.getAddressByZipcode(props.data.zipcode, 'user_address')
  fillFormAddress(props.data)
})

defineExpose({
  validate,
  values,
})
</script>

<template>
  <n-form ref="formRef" class="border checkout__address m-w:fit-content">
    <n-grid
      x-gap="6 800:20"
      cols="4 800:12"
      class="zipcode"
      style="align-items: center"
    >
      <n-gi span="4 800:12">
        <n-form-item
          :label="t('checkout.shipping.form.zipcode')"
          v-bind="zipcode"
          path="zipcode"
        >
          <n-input
            v-bind="zipcode"
            :readonly="props.readonlyZipcode"
            @blur="handleGetAddressByZipcode"
          />
        </n-form-item>
      </n-gi>
    </n-grid>
    <n-grid :x-gap="20" :cols="2">
      <n-gi>
        <n-form-item
          :label="t('checkout.shipping.form.country')"
          v-bind="country"
          path="country"
        >
          <n-input v-bind="country" />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item
          :label="t('checkout.shipping.form.state')"
          v-bind="state"
          path="state"
        >
          <n-input v-bind="state" />
        </n-form-item>
      </n-gi>
    </n-grid>
    <n-grid :x-gap="20" :cols="2">
      <n-gi>
        <n-form-item
          :label="t('checkout.shipping.form.city')"
          v-bind="city"
          path="city"
        >
          <n-input v-bind="city" />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item
          :label="t('checkout.shipping.form.neighborhood')"
          v-bind="neighborhood"
          path="neighborhood"
        >
          <n-input v-bind="neighborhood" />
        </n-form-item>
      </n-gi>
    </n-grid>
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
          v-bind="streetNumber"
          path="street_number"
        >
          <n-input v-bind="streetNumber" />
        </n-form-item>
      </n-gi>
    </n-grid>
    <n-form-item
      :label="t('checkout.shipping.form.complement')"
      v-bind="addressComplement"
      path="address_complement"
    >
      <n-input v-bind="addressComplement" />
    </n-form-item>
  </n-form>
</template>

<style lang="scss" scoped>
@import './FormAddress.scss';
</style>
