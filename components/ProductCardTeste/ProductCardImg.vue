<script setup lang="ts">
  import { useI18n } from '#imports'
  import { currencyFormat } from '@/utils/helpers'
  const { t } = useI18n()
  const router = useRouter()
  const props = defineProps<{
    latestProducts: ProductItem[]
    onAddToCart: (product: ProductItem) => void
  }>()

  function calculateDiscount(price: number, discount: number) {
    return price - discount
  }

  function goToProduct(uri) {
    router.push(`/products/${uri}`)
  }
</script>

<template>
  <div class="product-row">
    <div
      v-for="product in props.latestProducts.filter(
        (p) => !p.name.toLowerCase().includes('teste banner'),
      )"
      :key="product.product_id"
      class="product-card"
    >
      <div class="image-wrapper" @click="goToProduct(product.uri)">
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
          <strong>
            {{
              product.discount
                ? currencyFormat(
                    calculateDiscount(product.price, product.discount),
                  )
                : currencyFormat(product.price)
            }}
          </strong>
        </span>
      </p>

      <div
        v-if="product.quantity === 0"
        class="out-of-stock-badge"
        role="status"
        aria-live="polite"
      >
        {{ t('productItem.outOfStock') }}
      </div>

      <button v-else class="buy-button" @click="props.onAddToCart(product)">
        Comprar
      </button>
    </div>
  </div>
</template>

<style scoped>
  .product-row {
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    width: 100%;
    box-sizing: border-box;
    scrollbar-color: #d4c7a0 transparent;
    scrollbar-width: thin;
    padding: 1rem 1rem;
    scroll-padding-inline: 1rem;
  }

  .product-row::-webkit-scrollbar {
    height: 8px;
  }
  .product-row::-webkit-scrollbar-thumb {
    background: #e4a647;
    border-radius: 4px;
  }
  .product-row::-webkit-scrollbar-thumb:hover {
    background: #da9a39;
  }

  .product-card {
    flex: 0 0 260px;
    background: #ffffff;
    border: 1px solid #cdcaca;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(54, 57, 73, 0.08);
    padding: 1rem;
    text-align: center;
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease,
      border-color 0.25s ease;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(54, 57, 73, 0.15);
    border-color: #da9a39;
  }

  /* Imagem */
  .image-wrapper {
    width: 100%;
    height: 300px;
    overflow: hidden;
    border-radius: 10px;
    margin-bottom: 0.75rem;
    background: #f9e9d2;
    cursor: pointer;
  }

  .product-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .product-card:hover .product-image {
    transform: scale(1.06);
  }

  /* Título e preço */
  .product-title {
    font-size: 1.05rem;
    margin: 0.5rem 0;
    color: #363949;
    font-weight: 600;
  }

  .product-price {
    margin: 0.25rem 0 1rem 0;
    font-size: 1rem;
    color: #363949;
  }

  .old-price {
    text-decoration: line-through;
    color: #999;
    margin-right: 0.4rem;
  }

  .new-price {
    font-weight: 700;
    color: #da9a39;
  }

  /* Botão */
  .buy-button {
    background-color: #da9a39;
    color: #fff;
    border: none;
    padding: 0.6rem 1.4rem;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition:
      background-color 0.25s ease,
      transform 0.25s ease;
  }

  .buy-button:hover {
    background-color: #e4a647;
    transform: scale(1.05);
  }

  .buy-button:active {
    background-color: #ac7c34;
    transform: scale(0.98);
  }

  /* Estoque esgotado */
  .out-of-stock-badge {
    top: 10px;
    left: 10px;
    background: #363949;
    color: #f9e9d2;
    font-weight: 700;
    padding: 6px 10px;
    border-radius: 999px;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
    pointer-events: none;
    z-index: 2;
  }

  .product-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 470px;
  }

  .product-title {
    min-height: 2.6em;
    line-height: 1.3em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .product-price {
    min-height: 2.2em;
  }

  .buy-button,
  .out-of-stock-badge {
    margin-top: auto;
    align-self: center;
  }

  @media (max-width: 1024px) {
    .product-card {
      flex: 0 0 240px;
      height: 440px;
    }
    .image-wrapper {
      height: 250px;
    }
  }

  @media (max-width: 640px) {
    .product-card {
      flex: 0 0 65%;
      height: 380px;
      padding: 0.9rem;
    }

    .image-wrapper {
      height: 200px;
    }

    .product-title {
      font-size: 0.95rem;
      min-height: 2.4em;
    }

    .product-price {
      font-size: 0.9rem;
    }

    .buy-button {
      padding: 0.55rem 1.2rem;
      font-size: 0.9rem;
    }
  }
</style>
