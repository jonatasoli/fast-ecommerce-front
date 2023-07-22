<script setup lang="ts">
import { computed } from '#imports'
import { FeatureItem } from '@/utils/types'

type Props = {
  item: FeatureItem
}

const props = defineProps<Props>()

const style = computed(() => ({ backgroundImage: `url('${props.item.image}')` }))
const route = computed(() => `/products/${props.item.uri}`)
</script>

<template>
  <div class="feature-item">
    <NuxtLink :to="route" :style="style" />
    <div class="feature-item__label">
      {{ item.label }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './FeatureCard.scss';
</style>
