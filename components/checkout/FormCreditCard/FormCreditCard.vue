<script lang='ts' setup>
import { ref, useI18n } from '#imports'

const timestamp = ref<number | null>(null)
const { t } = useI18n()
</script>

<template>
  <n-form>
    <n-form-item :label="t('checkout.payment.credit_card_number')">
      <n-input
        v-mask="'#### #### #### ####'"
      />
    </n-form-item>
    <n-form-item :label="t('checkout.payment.credit_card_name')">
      <n-input />
    </n-form-item>
    <n-grid :x-gap="20" :cols="10">
      <n-gi span="5 md:2">
        <n-form-item :label="t('checkout.payment.credit_card_validate')">
          <n-date-picker
            v-model:value="timestamp"
            type="month"
            format="MM/yyyy"
            clearable
          />
        </n-form-item>
      </n-gi>
      <n-gi span="5 md:2">
        <n-form-item :label="t('checkout.payment.credit_card_cvv')">
          <n-input />
        </n-form-item>
      </n-gi>
      <n-gi span="10 md:6">
        <n-form-item :label="t('checkout.payment.installments')">
          <n-select />
        </n-form-item>
      </n-gi>
    </n-grid>
  </n-form>
</template>
