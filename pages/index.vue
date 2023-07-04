<script lang="ts" setup>
import { useI18n } from '#imports'
import { ProductItem } from '@/components/shared'
import FeatureCard from '~/components/home/FeatureCard/FeatureCard.vue'
import ProductImage from '@/assets/images/product-item-example.jpeg'

const { t } = useI18n()
const exampleProduct = {
  product: {
    uri: 'celebrity-ox-premium-gatto-rosa-900ml',
    name: 'Celebrity Ox Premium Gatto Rosa 900ml',
    image: ProductImage,
    value: 7990,
  },
}

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
    <div class="home__news">
      <h2>{{ t('home.news.title') }}</h2>
      <div class="home__news-list">
        <product-item
          v-for="n in 4"
          :key="n"
          v-bind="exampleProduct"
        />
      </div>
    </div>
    <div class="home__features container">
      <div
        v-for="n in 3"
        :key="`f_${n}`"
        class="home__features-item"
      >
        <feature-card v-bind="exampleFeature" />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/pages/index.scss';
</style>
