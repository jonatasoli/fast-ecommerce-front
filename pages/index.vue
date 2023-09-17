<script lang="ts" setup>
import { computed, useAsyncData, useI18n } from '#imports'
import { ProductCard } from '@/components/shared'
import { FeatureCard, FeatureHero } from '~/components/home'
import ProductImage from '@/assets/images/product-item-example.jpeg'
import { useProductsStore } from '~/stores/products'

const { t } = useI18n()
const store = useProductsStore()

const { data } = await useAsyncData(() => store.getProductsShowcase())

const products = computed(() => data.value || [])

const exampleFeature = {
  item: {
    image: ProductImage,
    uri: 'celebrity-ox-premium-gatto-rosa-900ml',
    label: t('home.features.treatments'),
  },
}
</script>

<template>
  <main class="home">
    <div v-if="products.length > 0" class="home__news">
      <h2>{{ t('home.news.title') }}</h2>
      <div class="home__news-list">
        <ProductCard
          v-for="product in products"
          :key="product.product_id"
          :product="product"
        />
      </div>
    </div>
    <div class="home__features container">
      <div
        v-for="n in 3"
        :key="`f_${n}`"
        class="home__features-item"
      >
        <FeatureCard v-bind="exampleFeature" />
      </div>
    </div>
    <div class="home__heros container">
      <FeatureHero :item="{ label: 'Pó Poderoso', image: ProductImage, uri: 'teste' }" />
      <FeatureHero :item="{ label: 'Overdose Color', image: ProductImage, uri: 'teste' }" inverse />
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/pages/index.scss';
</style>
