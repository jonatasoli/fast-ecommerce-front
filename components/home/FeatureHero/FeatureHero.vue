<script setup lang="ts">
import { computed } from '#imports'
import type { FeatureItem } from '@/utils/types'

type Props = {
  item: FeatureItem
  inverse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  inverse: false,
})

const style = computed(() => ({ backgroundImage: `url('${props.item.image}')` }))
const route = computed(() => `/products/${props.item.uri}`)
</script>

<template>
  <div class="feature-hero" :class="{ '--inverse': inverse }">
    <div class="feature-hero__image">
      <NuxtLink
        class=""
        :style="style"
        :to="route"
      />
    </div>
    <NuxtLink class="feature-hero__name" :to="route">
      <span>{{ item.label }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
@import './FeatureHero.scss';
</style>
