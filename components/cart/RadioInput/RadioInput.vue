<script setup lang="ts">
import { ref } from "vue";

type Props = {
  checkedValue: string;
};

const props = defineProps<Props>();
const emit = defineEmits(["radio-change"]);

const checkedValue = ref(props.checkedValue);

function handleChange(value: string) {
  checkedValue.value = value;
  emit("radio-change", value);
}
</script>

<template>
  <div class="container"></div>
  <div class="container">
    <p>Envio todo o Brasil</p>
    <n-space>
      <n-radio
        :checked="checkedValue === 'PAC'"
        value="PAC"
        name="PAC"
        @change="() => handleChange('PAC')"
      >
        PAC
      </n-radio>
      <n-radio
        :checked="checkedValue === 'SEDEX'"
        value="SEDEX"
        name="SEDEX"
        @change="() => handleChange('SEDEX')"
      >
        SEDEX
      </n-radio>
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
