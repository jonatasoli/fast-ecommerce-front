<script setup lang="ts">
import { computed, useFetch, useI18n, useRoute, useRuntimeConfig } from '#imports'
import { ProductCard, ProductSkeleton } from '~/components/shared'
import { getPageFromRoute } from '~/utils/helpers'
import { PaginatedProducts } from '~/utils/types'

const { serverUrl } = useRuntimeConfig().public
const route = useRoute()
const OFFSET = 16
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
const totalPages = computed(() => data.value?.total_pages ? data.value.total_pages + 1 : 1)
</script>

<template>
  <main class="category container">
    <h1 class="title">
      {{ t(`navigation.${route.params.uri}`) }}
    </h1>
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
      <p>{{ t(`products.empty`) }}</p>
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

<style scoped lang="scss">
.title {
  margin: 3rem 0;
  text-align: center;
  font-weight: 300;
  color: $primary-color;
  font-size: 3rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 2rem 0;
  }
}

.category {
  padding-bottom: 3rem;

  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    font-size: 1.5rem;
    color: #A6ACAF
  }

  &__pagination {
    margin-top: 3rem;
  }
}
</style>
