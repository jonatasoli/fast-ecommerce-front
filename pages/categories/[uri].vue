<script setup lang="ts">
  import {
    computed,
    useFetch,
    useI18n,
    useRoute,
    useRouter,
    useRuntimeConfig,
    watch,
  } from '#imports'
  import { ProductCard, ProductSkeleton } from '~/components/shared'
  import { getPageFromRoute } from '~/utils/helpers'
  import type { PaginatedProducts } from '~/utils/types'

  const { serverUrl } = useRuntimeConfig().public
  const route = useRoute()
  const router = useRouter()
  const OFFSET = 12
  const { t } = useI18n()
  const { page } = getPageFromRoute()
  const url = computed(() =>
    route.params.uri === 'latest'
      ? `${serverUrl}/catalog/latest`
      : `${serverUrl}/catalog/category/products/${route.params.uri}`,
  )

  const categoryTitle = computed(() => {
    const { uri } = route.params
    return typeof uri === 'string' ? uri.replace(/-/g, ' ') : ''
  })

  useHead({
    title: capitalizeFirstLetter(categoryTitle.value),
  })

  const { data, pending } = await useFetch<PaginatedProducts>(url.value, {
    watch: [page, url],
    query: {
      offset: OFFSET,
      page,
    },
  })

  const cartStore = useCartStore()
  const products = computed(() => data.value?.products || [])
  const totalPages = computed(() =>
    data.value?.total_pages ? data.value.total_pages : 1,
  )
  const totalRecords = computed(() => {
    const records = data.value?.total_records || 0

    if (!records) {
      return ''
    }

    return records === 1
      ? t('categoryPage.singleProduct')
      : t('categoryPage.totalProducts', {
          num: records.toString().padStart(2, '0'),
        })
  })

  async function handleAddToCart(product: ProductItem) {
    if (!product) {
      return
    }

    await cartStore.addToCart({
      image_path: product.image_path,
      name: product.name,
      price: product.price,
      product_id: product.product_id,
      quantity: 1,
      discount_price: product.discount,
      available_quantity: product.quantity,
    })

    router.push('/cart')
  }

  watch(page, () =>
    router.push({
      ...route,
      query: {
        ...route.query,
        p: page.value,
      },
    }),
  )
</script>

<template>
  <main class="category container">
    <h1 class="title">
      {{ categoryTitle }}
    </h1>
    <p class="subtitle">
      {{ totalRecords }}
    </p>
    <div v-if="pending" class="category__skeleton">
      <div v-for="n in OFFSET" :key="n">
        <ProductSkeleton />
      </div>
    </div>
    <div v-else-if="products.length === 0" class="category__empty">
      <p>{{ t(`categoryPage.empty`) }}</p>
    </div>
    <div v-else class="category__products">
      <div v-for="product in products" :key="product.product_id">
        <ProductCard v-bind="{ product }" @add-to-cart="handleAddToCart" />
      </div>
    </div>
    <n-space align="flex-end" vertical class="category__pagination">
      <n-pagination v-model:page="page" :page-count="totalPages" size="large" />
    </n-space>
  </main>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/pages/category.scss';
</style>
