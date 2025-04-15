<script setup lang="ts">
  import { computed } from '#imports'
  import type { FeatureItem } from '@/utils/types'

  type Props = {
    item: FeatureItem
  }

  const props = defineProps<Props>()

  const style = computed(() => ({
    backgroundImage: `url('${props.item.image}')`,
  }))
  const route = computed(() => `/categories/${props.item.uri}`)
</script>

<template>
  <div class="feature-item">
    <div class="feature-item__link">
      <NuxtLink :to="route" :style="style" />
    </div>
    <div class="feature-item__label">
      {{ item.label }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use './FeatureCard.scss' as *;
</style>
