<script lang="ts" setup>
import { computed, useAsyncData, useFetch, useI18n, useRuntimeConfig } from '#imports'
import { ProductCard } from '@/components/shared'
import { FeatureCard, FeatureHero } from '~/components/home'
import ProductImage from '@/assets/images/product-item-example.jpeg'
import { useProductsStore } from '~/stores/products'
import { FeatureItem, ProductItem } from '~/utils/types'

const { t } = useI18n()
const store = useProductsStore()
const serverUrl = useRuntimeConfig().public.serverUrl
const url = `${serverUrl}/catalog/featured`

const { data } = await useAsyncData(() => store.getProductsShowcase())
const { data: featured } = await useFetch<{ products: ProductItem[] }>(url)
// const { data: categories } = await useFetch(`${serverUrl}/catalog/categories`, {
//   query: {
//     showcase: true,
//   },
// })

// console.log(categories.value)

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

  const products: ProductItem[] = [...data.value]
  const diff = 9 - data.value.length

  if (diff > 0) {
    let index = 0
    while (products.length < 9) {
      products.push(data.value[index])
      index = index === data.value.length - 1 ? 0 : index + 1
    }
  }

  return products
})

const showcase = computed(() => allProducts.value.slice(0, 4))
const features = computed(() => allProducts.value.slice(4, 7).map(product => productToFeature(product)))

const carouselBackground = (image?: string) => ({
  backgroundImage: `url('${image || ProductImage}')`,
})
</script>

<template>
  <main class="home">
    <div v-if="allProducts.length > 0" class="home__carousel container">
      <n-carousel show-arrow autoplay>
        <NuxtLink
          v-for="(product, index) in allProducts"
          :key="index"
          :style="carouselBackground(product.image_path)"
          :to="`/products/${product.uri}`"
          class="carousel-slide"
        />
      </n-carousel>
    </div>
    <div v-if="showcase.length > 0" class="home__news">
      <h2>{{ t('home.news.title') }}</h2>
      <div class="home__news-list">
        <ProductCard
          v-for="product in showcase"
          :key="product.product_id"
          :product="product"
        />
      </div>
    </div>
    <div v-if="features.length > 0" class="home__features container">
      <div
        v-for="product in features"
        :key="product.uri"
        class="home__features-item"
      >
        <FeatureCard :item="product" />
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
