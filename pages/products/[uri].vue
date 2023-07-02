<script lang="ts" setup>
import { currencyFormat } from '@/utils/helpers'
import { computed, ref, useI18n, useRoute } from '#imports'
import ProductImage from '@/assets/images/product-item-example.jpeg'
import { ProductItem } from '@/utils/types'

const route = useRoute()
const productUri = route.params.uri
const { t } = useI18n()

const exampleProduct = [{
  product: {
    uri: 'celebrity-ox-premium-gatto-rosa-900ml',
    name: 'Celebrity Ox Premium Gatto Rosa 900ml',
    image: ProductImage,
    value: 7990,
    installments: {
      value: 2366,
      count: 3,
    },
    variants: [
      { value: '10', label: '10 VOL' },
      { value: '20', label: '20 VOL' },
      { value: '30', label: '30 VOL' },
      { value: '40', label: '40 VOL' },
    ],
    description: {
      content: `A Emulsão Reveladora deve ser utilizada na preparação de Colorações 
        Linha Gatto Rosa e  Blond Celebrity, na quantidade indicada no modo 
        de preparo do produto a ser utilizado Estabilizante de alta qualidade, na função de 
        estabilizar a volumagem, e manter a performance do clareamento.`,
      composition: 'Aloé Vera função  Hidratante, Óleo de Argan e Óleo de Macadâmia como  Emoliente',
      how_to_use: `30 grs de pó Celebrity com 100 ml de oxidante Gatto Rosa\r
        15 grs de pó Celebrity com 50 ml de oxidante Gatto Rosa\r
        10 grs de pó Celebrity com 35 ml de oxidante Gatto Rosa\r
        Misture de 2 a 3 minutos até obter uma consistência homogenia e cremosa`,
    },
  },
}]

const product: ProductItem = exampleProduct.find(p => p.product.uri === productUri)?.product || {
  uri: '',
  name: '',
  image: '',
  value: 0,
}

const price = computed(() => currencyFormat(product.value))
const installments = computed(() => currencyFormat(product?.installments?.value || 0))
const value = ref(null)
</script>

<template>
  <main class="product">
    <div class="product__info">
      <img
        class="product__info--image"
        :src="product.image"
        :alt="product.name"
      >

      <div class="product__content">
        <h1 class="product__name">
          {{ product.name }}
        </h1>
        <hr class="divider">
        <div class="product__variants">
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
        </div>
        <hr class="divider">
        <p class="product__content--price">
          {{ price }}
        </p>
        <p class="product__content--installments">
          {{ t('productPage.installments.term1') }} <span>{{ product?.installments?.count || 0 }}x</span>
          {{ t('productPage.installments.term2') }} <span>{{ installments }}</span>
          {{ t('productPage.installments.term3') }}
        </p>
        <div class="product__content--buy">
          <n-button
            type="primary"
            size="large"
            strong
            block
          >
            {{ t('productItem.buy') }}
          </n-button>
        </div>
      </div>
    </div>
    <div class="product__description">
      <h2 class="product__description--title">
        {{ product.name }}
      </h2>
      <p class="product__description--text">
        {{ product?.description?.content }}
      </p>
    </div>
    <n-collapse arrow-placement="right" class="product__description--collapse">
      <n-collapse-item
        title="Composição"
        name="1"
        class="product__description--collapse-item"
      >
        <p class="product__description--text">
          {{ product?.description?.composition }}
        </p>
      </n-collapse-item>
      <n-collapse-item
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
