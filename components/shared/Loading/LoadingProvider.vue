<template>
  <div>
    <Loading v-if="active" />
    <n-collapse-transition v-show="!active">
      <slot></slot> 
    </n-collapse-transition>   
  </div>
</template>

<script lang="ts" setup>
import Loading from './Loading.vue'

defineProps<{ active: boolean }>()
</script>

