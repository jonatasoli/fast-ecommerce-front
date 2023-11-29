<script setup lang="ts">
import { ref } from 'vue';

type Props = {
  checkedValue: string;
};

const props = defineProps<Props>();
const emit = defineEmits(['radio-change']);

const checkedValue = ref(props.checkedValue);

function handleChange(value: string) {
  emit('radio-change', value);
}
</script>

<template>
  <div class="container"></div>
  <div class="container">
    <p>Envio todo o Brasil</p>
    <n-space>
      <n-radio-group v-model:value="checkedValue" @update:value="handleChange">
        <n-space>
          <n-radio value="PAC">PAC</n-radio>
          <n-radio value="SEDEX">SEDEX</n-radio>
        </n-space>
      </n-radio-group>
    </n-space>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: end;
}
</style>
