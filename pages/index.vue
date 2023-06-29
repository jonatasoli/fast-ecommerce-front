<script lang="ts" setup>
import { useI18n } from '#imports'
import { ProductItem } from '@/components/shared'
import ProductImage from '@/assets/images/product-item-example.png'

const { t } = useI18n()
const exampleProduct = {
  product: {
    name: 'Celebrity Ox Premium Gatto Rosa 900ml',
    image: ProductImage,
    value: 7990,
  },
  route: '/',
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
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/index-page.scss';
</style>
