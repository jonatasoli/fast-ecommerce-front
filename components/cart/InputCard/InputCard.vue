<script setup lang="ts">
import { BanknotesIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { ref } from '#imports'

type Props = {
  icon: string
  title: string
  buttonText: string
  placeholder: string
}

defineProps<Props>()
const emit = defineEmits(['onButtonClick'])

const value = ref('')

function handleButtonClick() {
  emit('onButtonClick', value.value)
}
</script>

<template>
  <div class="card">
    <header>
      <n-icon :size="35">
        <ShoppingCartIcon v-if="icon === 'cart' " />
        <BanknotesIcon v-if="icon === 'cupom'" />
      </n-icon>
      <h3>{{ title }}</h3>
    </header>
    <div class="card__input">
      <n-input
        v-model:value="value"
        type="text"
        :placeholder="placeholder"
      />
      <n-button
        type="primary"
        size="large"
        strong
        @click="handleButtonClick"
      >
        {{ buttonText }}
      </n-button>
    </div>

    <div class="card__result">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './InputCard.scss'
</style>
