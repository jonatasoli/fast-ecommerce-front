<script lang="ts" setup>
  import { computed, useFetch, useI18n, useRuntimeConfig } from '#imports'
  import { FeatureHero } from '~/components/home'
  import type { FeatureItem, ProductItem } from '~/utils/types'
  import { useCategoryStore } from '~/stores/categories'
  import type { Carousel } from '~/types/products'

  useHead({
    title: 'Home',
  })

  const { t, te } = useI18n()

  const categoryStore = useCategoryStore()
  const cartStore = useCartStore()
  const router = useRouter()
  const serverUrl = useRuntimeConfig().public.serverUrl
  const locale = useCookie('i18n_redirected').value || 'pt-BR'
  const currency = detectCurrencyByLocale(locale)

  await categoryStore.getCategorys(true)

  const { data: carousel } = await useFetch<Carousel[]>(
    `${serverUrl}/product/media/teste-banner`,
  )

  const { data: featured } = await useFetch<{ products: ProductItem[] }>(
    `${serverUrl}/catalog/featured?currency=${currency}`,
  )

  const { data: latest } = await useFetch<{ products: ProductItem[] }>(
    `${serverUrl}/catalog/latest?currency=${currency}`,
  )

  const productToFeature = ({
    image_path: imagePath,
    name,
    uri,
  }: ProductItem): FeatureItem => ({
    label: name,
    uri,
    image: imagePath || '',
  })

  const featuredProducts = computed(() =>
    featured.value?.products
      ? featured.value.products.map((product) => productToFeature(product))
      : [],
  )

  const categories = computed(() =>
    categoryStore.categories
      .filter((category) => category.showcase === true)
      .filter(({ name }) => !['news', 'sales'].includes(name))
      .slice(0, 3)
      .map((category) => ({
        label: te(`navigation.${category.name}`)
          ? t(`navigation.${category.name}`)
          : category.name,
        uri: category.path,
        image: category.image_path ?? '',
      })),
  )

  const latestProducts = computed(() => {
    if (!latest.value) {
      return []
    }

    return latest.value.products.slice(0, 5)
  })

  async function handleAddToCart(product: ProductItem) {
    if (!product) {
      return
    }

    await cartStore.addToCart({
      image_path: product.image_path,
      name: product.name,
      price: product.price,
      product_id: product.product_id,
      quantity: 1,
      discount_price: product.discount,
      available_quantity: product.quantity,
    })

    router.push('/cart')
  }
</script>

<template>
  <main class="home">
    <div>
      <ProductsShowCase :carousel="carousel ?? []" />
    </div>
    <div v-if="latestProducts.length > 0" class="home__news">
      <h2>{{ t('home.news.title') }}</h2>
      <div class="home__news-list"></div>
      <ProductCardImg
        :latest-products="latestProducts"
        :on-add-to-cart="handleAddToCart"
      />
    </div>

    <div v-if="categories.length > 0" class="home__features container">
      <div
        v-for="category in categories"
        :key="category.uri"
        class="home__features-item"
      >
        <CategoryCard :item="category" />
      </div>
    </div>

    <div v-if="featuredProducts?.length > 0" class="home__heros container">
      <FeatureHero
        v-for="(product, index) in featuredProducts"
        :key="product.label"
        :item="product"
        :inverse="index % 2 === 1"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
  @use '@/assets/scss/pages/index.scss' as *;
</style>
