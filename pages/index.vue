<script lang="ts" setup>
import { computed, useAsyncData, useFetch, useI18n, useRuntimeConfig } from '#imports'
import { ProductCard } from '@/components/shared'
import { FeatureCard, FeatureHero } from '~/components/home'
import ProductImage from '@/assets/images/product-item-example.jpeg'
import { useProductsStore } from '~/stores/products'
import { FeatureItem, ProductItem } from '~/utils/types'
import { useCategoryStore } from '~/stores/categories'

const { t } = useI18n()
const store = useProductsStore()

const categoryStore = useCategoryStore()
const serverUrl = useRuntimeConfig().public.serverUrl

const { data: carousel } = await useAsyncData(() => store.getProductsShowcase())
const { data: featured } = await useFetch<{ products: ProductItem[] }>(`${serverUrl}/catalog/featured`)
const { data: latest } = await useFetch<{ products: ProductItem[] }>(`${serverUrl}/catalog/latest`)

const url = `${serverUrl}/catalog/featured`

const { data } = await useAsyncData(() => store.getProductsShowcase())

const productToFeature = ({ category, image_path, name }: ProductItem): FeatureItem => ({
  label: name,
  uri: category.path,
  image: image_path || '',
})

const featuredProducts = computed(() => featured.value?.products
  ? featured.value.products.map(product => productToFeature(product))
  : [],
)

const allProducts = computed(() => {
  if (!data.value) {
    return []
  }
})

const products: ProductItem[] = [...data.value]
const diff = 9 - data.value.length

const categories = computed(() =>
  categoryStore.sortedCategories
    .filter(({ name }) => !['news', 'sales'].includes(name))
    .slice(0, 3)
    .map(category => ({
      label: te(`navigation.${category.name}`) ? t(`navigation.${category.name}`) : category.name,
      uri: category.path,
      image: category.image_path || '',
    })),
)

const carouselBackground = (image?: string) => ({
  backgroundImage: `url('${image || ProductImage}')`,
})

const latestProducts = computed(() => {
  if (!latest.value) {
    return []
  }
const showcase = computed(() => allProducts.value.slice(0, 4))
const features = computed(() => allProducts.value.slice(4, 7).map(product => productToFeature(product)))

  return latest.value.products.slice(0, 4)
})
</script>

<template>
  <main class="home">
    <div v-if="carousel && carousel.length > 0" class="home__carousel container">
      <n-carousel
        show-arrow
        autoplay
        draggable
      >
        <NuxtLink
          v-for="(product, index) in carousel"
          :key="index"
          :style="carouselBackground(product.image_path)"
          :to="`/products/${product.uri}`"
          class="carousel-slide"
        />
      </n-carousel>
    </div>
    <div v-if="latestProducts.length > 0" class="home__news">
      <h2>{{ t('home.news.title') }}</h2>
      <div class="home__news-list">
        <ProductCard
          v-for="product in latestProducts"
          :key="product.product_id"
          :product="product"
        />
      </div>
    </div>
    <div v-if="categories.length > 0" class="home__features container">
      <div
        v-for="category in categories"
        :key="category.uri"
        class="home__features-item"
      >
        <FeatureCard :item="category" />
      </div>
    </div>
    <div v-if="featuredProducts?.length > 0" class="home__heros container">
      <FeatureHero
        v-for="(product, index) in featuredProducts"
        :key="product.label"
        :item="product"
        :inverse="index % 2 === 1"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/pages/index.scss';
</style>
