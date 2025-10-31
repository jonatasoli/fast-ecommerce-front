<script setup lang="ts">
  import { currencyFormat } from '@/utils/helpers'
  const props = defineProps<{
    latestProducts: ProductItem[]
  }>()

  function handleBuy(product) {
    alert(`Produto "${product.title}" adicionado ao carrinho!`)
  }

  function calculateDiscount(price: number, discount: number) {
    return price - discount
  }
</script>

<template>
  <div class="product-row">
    <div
      v-for="product in props.latestProducts"
      :key="product.product_id"
      class="product-card"
    >
      <div class="image-wrapper">
        <img
          :src="product.image_path"
          :alt="product.name"
          class="product-image"
        />
      </div>
      <h2 class="product-title">{{ product.name }}</h2>
      <p class="product-price">
        <span v-if="product.discount" class="old-price">
          {{ currencyFormat(product.price) }}
        </span>
        <span class="new-price">
          <strong>{{
            product.discount
              ? currencyFormat(
                  calculateDiscount(product.price, product.discount),
                )
              : currencyFormat(product.price)
          }}</strong>
        </span>
      </p>
      <button class="buy-button" @click="handleBuy(product)">Comprar</button>
    </div>
  </div>
</template>

<style scoped>
  .product-row {
    display: flex;
    gap: 1.2rem;
    overflow-x: auto;
    padding: 1rem;
    scroll-snap-type: x mandatory;
    width: 100%;
    box-sizing: border-box;
  }

  .product-card {
    flex: 0 0 260px;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 1rem;
    text-align: center;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  }

  .image-wrapper {
    width: 100%;
    height: 320px;
    overflow: hidden;
    border-radius: 10px;
    margin-bottom: 0.75rem;
  }

  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
  }

  .product-card:hover .product-image {
    transform: scale(1.05);
  }

  .product-title {
    font-size: 1.05rem;
    margin: 0.5rem 0;
    color: #333;
    font-weight: 500;
  }

  .product-price {
    margin: 0.25rem 0 1rem 0;
    font-size: 1rem;
    color: #444;
  }

  .old-price {
    text-decoration: line-through;
    color: #999;
    margin-right: 0.5rem;
  }

  .new-price {
    font-weight: bold;
    color: #222;
  }

  .buy-button {
    background-color: #d4af37;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      transform 0.2s ease;
  }

  .buy-button:hover {
    background-color: #c5a028;
    transform: scale(1.05);
  }

  .product-row::-webkit-scrollbar {
    height: 8px;
  }
  .product-row::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
</style>
