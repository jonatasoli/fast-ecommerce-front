<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'
import { currencyFormat } from '@/utils/helpers'
import { computed, ref, useI18n, useRoute, useRouter } from '#imports'
import { ProductItem } from '@/utils/types'
import { useProductsStore } from '@/stores/products'

const route = useRoute()
const router = useRouter()
const productUri = route.params.uri
const { t } = useI18n()
const cartStore = useCartStore()

const { getProducts } = useProductsStore()

const product: ProductItem = getProducts.find(p => p.uri.replace('/', '') === productUri) || {
  product_id: 0,
  uri: '',
  name: '',
  image_path: '',
  price: 0,

}
const price = computed(() => currencyFormat(product.price))
const installments = computed(() => currencyFormat(product?.installments_list?.value || 0))
const value = ref(null)

function addProductToCart() {
  cartStore.addToCart(product)
  router.push('/cart')
}
</script>

<template>
  <main class="product">
    <div class="product__info">
      <img
        class="product__info--image"
        :src="product.image_path"
        :alt="product.name"
      >

      <div class="product__content">
        <h1 class="product__name">
          {{ product.name }}
        </h1>
        <div v-if="product.variants" class="product__variants">
          <hr class="divider">
          <p> {{ t('productPage.variants') }}</p>

          <n-space vertical>
            <n-radio-group
              v-model:value="value"
              name="radiobuttongroup1"
              class="product__variants--radio-group"
            >
              <n-radio-button
                v-for="variant in product.variants"
                :key="variant.value"
                :value="variant.value"
                :label="variant.label"
              />
            </n-radio-group>
          </n-space>
          <hr class="divider">
        </div>
        <p class="product__content--price">
          {{ price }}
        </p>
        <p class="product__content--installments">
          {{ t('productPage.installments.term1') }} <span>{{ product?.installments_list?.count || 0 }}x</span>
          {{ t('productPage.installments.term2') }} <span>{{ installments }}</span>
          {{ t('productPage.installments.term3') }}
        </p>
        <div class="product__content--buy">
          <n-button
            type="primary"
            size="large"
            strong
            block
            @click="addProductToCart"
          >
            {{ t('productItem.buy') }}
          </n-button>
        </div>
      </div>
    </div>
    <div v-if="product.description" class="product__description">
      <h2 class="product__description--title">
        {{ product.name }}
      </h2>
      <p class="product__description--text">
        {{ product?.description?.content }}
      </p>
    </div>
    <n-collapse
      v-if="product.description"
      arrow-placement="right"
      class="product__description--collapse"
    >
      <n-collapse-item
        v-if="product?.description?.composition"
        title="Composição"
        name="1"
        class="product__description--collapse-item"
      >
        <p class="product__description--text">
          {{ product?.description?.composition }}
        </p>
      </n-collapse-item>
      <n-collapse-item
        v-if="product?.description?.how_to_use"
        title="Como usar"
        name="2"
        class="product__description--collapse-item"
      >
        <p class="product__description--text-white-space">
          {{ product?.description?.how_to_use }}
        </p>
      </n-collapse-item>
    </n-collapse>
  </main>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/pages/products/product.scss";
</style>
