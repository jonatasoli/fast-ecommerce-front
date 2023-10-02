<script setup lang="ts">
import { computed, ref, useFetch, useI18n, useRoute, useRouter, useRuntimeConfig, watch } from '#imports'
import { ProductItem } from '~/utils/types'
import { ProductCard, ProductSkeleton } from '~/components/shared'

const route = useRoute()
const router = useRouter()
const query = route.query.q?.toString() || ''
const config = useRuntimeConfig()
const OFFSET = 16
const { t } = useI18n()

const getPageFromRoute = () => {
  const page = route.query.p?.toString() || ''
  const intPage = parseInt(page)

  if (!page || isNaN(intPage) || intPage < 0) {
    return 1
  }

  return intPage
}

const page = ref(getPageFromRoute())
const url = `${config.public.serverUrl}/catalog/all`

const { data, pending } = await useFetch<{ products: ProductItem[]; total_pages: number }>(url, {
  watch: [page],
  query: {
    search: query,
    page,
    offset: OFFSET,
  },
})

const totalPages = ref(data.value?.total_pages ? data.value.total_pages + 1 : 1)
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
    <div v-else-if="data?.products.length === 0" class="search__empty">
      <n-alert
        type="info"
        title="Nenhum produto encontrado."
        bordered
      />
    </div>
    <n-grid
      v-else
      cols="1 480:2 768:3 1024:4"
      x-gap="16"
      y-gap="16"
    >
      <n-grid-item
        v-for="product in products"
        :key="product.product_id"
      >
        <ProductCard :product="product" />
      </n-grid-item>
    </n-grid>
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
