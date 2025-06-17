<script setup lang="ts">
  import { BanknotesIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline'
  import { ref } from '#imports'

  type Props = {
    icon: string
    title: string
    buttonText: string
    placeholder: string
    receivedValue: string | null
    mask?: string
    validation?: 'error' | 'success' | 'warning' | undefined
    message?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    mask: '',
    validation: undefined,
    message: '',
  })

  const emit = defineEmits(['onButtonClick'])

  const value = ref('')
  value.value = props.receivedValue ?? ''

  function handleButtonClick() {
    emit('onButtonClick', value.value)
  }
</script>

<template>
  <div class="card">
    <header>
      <n-icon :size="35">
        <ShoppingCartIcon v-if="icon === 'cart'" />
        <BanknotesIcon v-if="icon === 'cupom'" />
      </n-icon>
      <h3>{{ props.title }}</h3>
    </header>
    <div class="card__input">
      <n-form class="card__form">
        <n-form-item
          v-if="$props.mask"
          :feedback="message"
          :validation-status="validation"
        >
          <n-input
            v-model:value="value"
            v-mask="`${props.mask}`"
            type="text"
            :placeholder="props.placeholder"
          />
        </n-form-item>
        <n-form-item v-else :feedback="message" :validation-status="validation">
          <n-input
            v-model:value="value"
            type="text"
            :placeholder="props.placeholder"
          />
        </n-form-item>
      </n-form>

      <n-button type="primary" size="large" strong @click="handleButtonClick">
        {{ props.buttonText }}
      </n-button>
    </div>

    <div class="card__result">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use './InputCard.scss' as *;
</style>
