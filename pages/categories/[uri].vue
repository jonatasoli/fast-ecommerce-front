<script setup lang="ts">
import { onMounted, useI18n, useRoute } from '#imports'
import { useProductsStore } from '@/stores/products'
import { ProductCard } from '~/components/shared'
import Loading from '~/components/shared/Loading/Loading.vue'

const route = useRoute()
const { t } = useI18n()
const store = useProductsStore()

async function fetchData(category) {
  try {
    if (category === 'news') {
      await store.getProductsShowcase()
    } else {
      await store.getProductsByCategory(category)
    }
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
  }
}

onMounted(async () => {
  await fetchData(route.params.uri)
})
</script>

<template>
  <div class="container">
    <h1 class="title">
      {{ t(`navigation.${route.params.uri}`) }}
    </h1>
    <Loading v-if="store.loading" />
    <div v-else>
      <div v-if="store.getProducts.length === 0" class="showcase-empty">
        <p>{{ t(`products.empty`) }}</p>
      </div>

      <div
        v-else
        class="showcase"
      >
        <ProductCard
          v-for="product in store.getProducts"
          :key="product.product_id"
          v-bind="{ product }"
        />
      </div>
    </div>
  </div>
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

.showcase-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.5rem;
  color: #A6ACAF
}
 .showcase {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 0 1rem;
  }
 }
</style>
