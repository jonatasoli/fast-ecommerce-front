<script setup lang="ts">
import { computed, getPageFromRoute, ref, useFetch, useI18n, useRoute, useRouter, useRuntimeConfig, watch } from '#imports'
import type { PaginatedProducts, ProductItem } from '~/utils/types'
import { ProductCard, ProductSkeleton } from '~/components/shared'

const route = useRoute()
const router = useRouter()
const query = route.query.q?.toString() ?? ''
const config = useRuntimeConfig()
const OFFSET = 16
const { t } = useI18n()

const { page } = getPageFromRoute()
const url = `${config.public.serverUrl}/catalog/all`

const { data, pending } = await useFetch<PaginatedProducts>(url, {
  watch: [page],
  query: {
    search: query,
    page,
    offset: OFFSET,
  },
})

const totalPages = ref(data.value?.total_pages ? data.value.total_pages : 1)
const products = computed<ProductItem[]>(() => data.value?.products || [])
const searchTitle = computed(() => decodeURIComponent(query))

watch(page, () => router.push({
  ...route,
  query: {
    ...route.query,
    p: page.value,
  },
}))
</script>

<template>
  <main class="search container">
    <h1>{{ t('search.title', { search: searchTitle }) }}</h1>
    <div 
      v-if="pending"
      class="search__skeleton"
    >
      <div v-for="n in OFFSET" :key="n">
        <ProductSkeleton />
      </div>
    </div>
    <div v-else-if="data?.products.length === 0" class="search__empty">
      <n-alert
        type="info"
        :title="t('search.empty')"
        bordered
      />
    </div>
    <div
      v-else
      class="search__products"
    >
      <div
        v-for="product in products"
        :key="product.product_id"
      >
        <ProductCard :product="product" />
      </div>
    </div>
    <n-space
      align="flex-end"
      vertical
      class="search__pagination"
    >
      <n-pagination
        v-model:page="page"
        :page-count="totalPages"
        size="large"
      />
    </n-space>
  </main>
</template>

<style scoped lang="scss">
@import '~/assets/scss/pages/search';
</style>
