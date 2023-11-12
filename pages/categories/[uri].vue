<script setup lang="ts">
import { computed, useFetch, useI18n, useRoute, useRouter, useRuntimeConfig, watch } from '#imports'
import { ProductCard, ProductSkeleton } from '~/components/shared'
import { getPageFromRoute } from '~/utils/helpers'
import type { PaginatedProducts } from '~/utils/types'

const { serverUrl } = useRuntimeConfig().public
const route = useRoute()
const router = useRouter()
const OFFSET = 12
const { t } = useI18n()
const { page } = getPageFromRoute()
const url = computed(() => route.params.uri === 'latest'
  ? `${serverUrl}/catalog/latest`
  : `${serverUrl}/catalog/category/products/${route.params.uri}`,
)

const { data, pending } = await useFetch<PaginatedProducts>(url.value, {
  watch: [page, url],
  query: {
    offset: OFFSET,
    page,
  },
})

const products = computed(() => data.value?.products || [])
const totalPages = computed(() => data.value?.total_pages ? data.value.total_pages : 1)
const totalRecords = computed(() => {
  const records = data.value?.total_records || 0

  if (!records) {
    return ''
  }

  return records === 1
    ? t('categoryPage.singleProduct')
    : t('categoryPage.totalProducts', { num: records.toString().padStart(2, '0') })
})

watch(page, () => router.push({
  ...route,
  query: {
    ...route.query,
    p: page.value,
  },
}))
</script>

<template>
  <main class="category container">
    <h1 class="title">
      {{ route.params.uri }}
    </h1>
    <p class="subtitle">
      {{ totalRecords }}
    </p>
    <n-grid
      v-if="pending"
      cols="1 480:2 768:3 1024:4"
      x-gap="16"
      y-gap="16"
    >
      <n-grid-item v-for="n in OFFSET" :key="n">
        <ProductSkeleton />
      </n-grid-item>
    </n-grid>
    <div v-else-if="products.length === 0" class="category__empty">
      <p>{{ t(`categoryPage.empty`) }}</p>
    </div>
    <n-grid
      v-else
      cols="1 480:2 768:3 1024:4"
      x-gap="16"
      y-gap="16"
    >
      <n-grid-item v-for="product in products" :key="product.product_id">
        <ProductCard v-bind="{ product }" />
      </n-grid-item>
    </n-grid>
    <n-space
      align="flex-end"
      vertical
      class="category__pagination"
    >
      <n-pagination
        v-model:page="page"
        :page-count="totalPages"
        size="large"
      />
    </n-space>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/pages/category.scss';
</style>
