<script setup lang="ts">

</script>

<template>
  <div class="product-skeleton">
    <div class="product-skeleton__image">
      <n-skeleton
        width="100%"
        height="100%"
        style="position: absolute; top: 0; left: 0;"
      />
    </div>
    <div class="product-skeleton__content">
      <n-skeleton text />
      <n-skeleton text width="75%" />
      <n-skeleton
        width="50%"
        height="2rem"
        :sharp="false"
        style="margin: 1.25rem 0"
      />
    </div>
    <n-skeleton width="100%" height="60px" />
  </div>
</template>

<style scoped lang="scss">
@import './ProductSkeleton.scss';
</style>
