<script setup lang="ts">
  import { useRoute } from '#imports'
  const route = useRoute()
</script>

<template>
  <h1>{{ route.params.uri }}</h1>
</template>

<style scoped></style>
