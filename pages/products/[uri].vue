<script lang="ts" setup>
  import { useCartStore } from '@/stores/cart'
  import { currencyFormat } from '@/utils/helpers'
  import {
    LOCALES,
    computed,
    createError,
    ref,
    useFetch,
    useI18n,
    useRoute,
    useRouter,
    useRuntimeConfig,
  } from '#imports'
  import type { MediaItem, ProductItem } from '~/utils/types'

  const route = useRoute()
  const router = useRouter()
  const config = useRuntimeConfig()
  const { t, locale } = useI18n()
  const cartStore = useCartStore()

  const { data: product, error } = await useFetch<ProductItem>(
    `${config.public.serverUrl}/product/uri/${route.params.uri}`,
  )

  const { data: carousel } = await useFetch<MediaItem[]>(
    `${config.public.serverUrl}/product/media/${product.value?.uri}`,
  )

  const productValue = unref(product)
  useHead({
    title: productValue ? capitalizeFirstLetter(productValue.name) : 'Produto',
  })

  if (error.value || !product.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true,
    })
  }

  function calculateDiscount(price: number, discount: number) {
    return price - discount
  }

  const price = computed(() => currencyFormat(product.value?.price || 0))
  const priceWithDiscount = unref(product)?.discount
    ? calculateDiscount(product.value.price, product.value.discount)
    : unref(product)?.price
  const newPrice = computed(() => currencyFormat(priceWithDiscount || 0))
  const installments = computed(() => {
    let count = 3
    let amount = currencyFormat(0)

    if (product.value) {
      if (product.value.installments_list) {
        count = product.value.installments_list.count || count
        amount = currencyFormat(
          product.value.installments_list.value || product.value.price,
        )
      } else {
        amount = currencyFormat(Math.round(product.value.price / count))
      }
    }

    return { count, amount }
  })
  const value = ref(null)

  async function addProductToCart() {
    if (!product.value) {
      return
    }

    await cartStore.addToCart({
      image_path: product.value.image_path,
      discount_price: product.value.discount,
      name: product.value.name,
      price: product.value.price,
      product_id: product.value.product_id,
      available_quantity: product.value.quantity,
      quantity: 1,
    })
    router.push('/cart')
  }

  const isPtBr = computed(() => locale.value === LOCALES.PT_BR)
</script>

<template>
  <main v-if="product" class="product">
    <div class="product__info">
      <n-carousel v-if="carousel && carousel.length > 0" autoplay>
        <n-carousel-item
          v-for="(image, index) in carousel"
          :key="image.media_id"
        >
          <img
            class="product__info--image"
            :src="image.uri"
            :alt="`${t('productItem.productImg')} ${index + 1}`"
          />
        </n-carousel-item>
      </n-carousel>

      <img
        v-else
        class="product__info--image"
        :src="product.image_path"
        :alt="product.name"
      />

      <div class="product__content">
        <h1 class="product__name">
          {{ product.name }}
        </h1>
        <div v-if="product.variants" class="product__variants">
          <hr class="divider" />
          <p>{{ t('productPage.variants') }}</p>

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
          <hr class="divider" />
        </div>
        <div class="product__content--container-price">
          <p v-if="product.discount" class="product__content--old-price">
            De: {{ price }}
          </p>
          <p class="product__content--price">
            <span v-if="product.discount">Por:</span>{{ newPrice }}
          </p>
        </div>
        <p v-if="isPtBr" class="product__content--installments">
          <i18n-t keypath="productPage.installments">
            <template #count>
              <span>{{ installments.count }}x</span>
            </template>
            <template #amount>
              <span>{{ installments.amount }}</span>
            </template>
          </i18n-t>
        </p>
        <div class="product__content--buy">
          <div
            v-if="product.quantity === 0"
            class="product__content--out-of-stock"
          >
            {{ t('productItem.outOfStock') }}
          </div>
          <n-button
            v-else
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
      <p
        class="product__description--text"
        v-html="product?.description?.content"
      ></p>
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
        <p
          class="product__description--text"
          v-html="product?.description?.composition"
        ></p>
      </n-collapse-item>
      <n-collapse-item
        v-if="product?.description?.how_to_use"
        title="Como usar"
        name="2"
        class="product__description--collapse-item"
      >
        <p
          class="product__description--text-white-space"
          v-html="product?.description?.how_to_use"
        ></p>
      </n-collapse-item>
    </n-collapse>
  </main>
</template>

<style lang="scss" scoped>
  @use '@/assets/scss/pages/products/product.scss' as *;
</style>
