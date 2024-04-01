<script setup lang="ts">
  import { computed, useI18n } from '#imports'
  import { currencyFormat } from '@/utils/helpers'
  import type { ProductItem } from '@/utils/types'

  type Props = {
    product: ProductItem
  }

  const props = defineProps<Props>()

  const { t } = useI18n()
  const emit = defineEmits(['addToCart'])

  function calculateDiscount(price: number, discount: number) {
    return price - discount
  }

  const productImage = computed(() => ({
    backgroundImage: `url('${props.product.image_path}')`,
  }))
  const price = computed(() => currencyFormat(props.product.price))
  const priceWithDiscount = props.product.discount
    ? calculateDiscount(props.product.price, props.product.discount)
    : props.product.price
  const newPrice = computed(() => currencyFormat(priceWithDiscount || 0))
  const route = `/products/${props.product.uri}`

  function handleAddToCart() {
    emit('addToCart', props.product)
  }
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
      <div class="container-price">
        <p v-if="props.product.discount" class="old-price">De: {{ price }}</p>
        <p class="price">
          <span v-if="props.product.discount">Por:</span>{{ newPrice }}
        </p>
      </div>
    </div>
    <div v-if="product.quantity === 0" class="product-item__out-of-stock">
      {{ t('productItem.outOfStock') }}
    </div>
    <button v-else class="product-item__buy" @click="handleAddToCart">
      {{ t('productItem.buy') }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
  @import './ProductCard.scss';
</style>
