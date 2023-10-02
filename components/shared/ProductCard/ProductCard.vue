<script setup lang="ts">
import { computed, useI18n } from '#imports'
import { currencyFormat } from '@/utils/helpers'
import { ProductItem } from '@/utils/types'

type Props = {
  product: ProductItem
}

const props = defineProps<Props>()

const { t } = useI18n()

const productImage = computed(() => ({ backgroundImage: `url('${props.product.image_path}')` }))
const price = computed(() => currencyFormat(props.product.price))
const route = `/products/${props.product.uri}`
</script>

<template>
  <div class="product-item">
    <div class="product-item__image">
      <NuxtLink :style="productImage" :to="route" />
    </div>
    <div class="product-item__content">
      <div class="name">
        <NuxtLink :to="route">
          {{ product.name }}
        </NuxtLink>
      </div>
      <p>{{ price }}</p>
    </div>
    <button class="product-item__buy">
      {{ t('productItem.buy') }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import './ProductCard.scss';
</style>
