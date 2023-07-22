<script setup lang="ts">
import { BanknotesIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline'
type Props = {
  icon: string
  title: string
  buttonText: string
}

defineProps<Props>()
</script>

<template>
  <div class="card">
    <header>
      <n-icon :size="35">
        <shopping-cart-icon v-if="icon === 'cart' " />
        <banknotes-icon v-if="icon === 'cupom'" />
      </n-icon>
      <h3>{{ title }}</h3>
    </header>
    <div class="card__input">
      <n-input
        type="text"
        placeholder="Insira seu CEP"
      />
      <n-button type="primary" size="large">
        {{ buttonText }}
      </n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './InputCard.scss'
</style>
