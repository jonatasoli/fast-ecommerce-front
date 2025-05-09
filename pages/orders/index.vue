<script lang="ts" setup>
  import { useI18n } from '#imports'
  const { user, pending: pendingUser } = storeToRefs(useUserStore())
  const userId = user.value?.userId ?? ''
  const { data: orders, pending } = await useOrders(userId)
  const { t } = useI18n()

  definePageMeta({
    middleware: [
      function () {
        const { authenticated } = storeToRefs(useUserStore())
        if (!authenticated.value) {
          return navigateTo('/')
        }
      },
    ],
  })

  useHead({
    title: t('profilePage.myOrders'),
  })
</script>

<template>
  <main class="orders">
    <h1 class="title">{{ t('profilePage.myOrders') }}</h1>

    <div v-if="pending || pendingUser" class="orders__loading">
      <n-spin />
    </div>

    <div v-if="!pending && !orders?.length" class="orders__empty">
      <p>{{ t('profilePage.noOrdersTitle') }} :(</p>

      <nuxt-link to="/">
        <n-button class="orders__button" quaternary type="primary" size="large">
          {{ t('profilePage.noOrdersTitle') }}
        </n-button>
      </nuxt-link>
    </div>

    <ol v-else>
      <li v-for="order in orders" :key="order.orderId" class="order">
        <header class="order__header">
          <div>
            <h2>{{ t('profilePage.order') }} {{ order.orderId }}</h2>
            <p>
              {{ t('profilePage.status') }}:
              {{ getOrderStatus(order.orderStatus) }}
            </p>
          </div>
          <p>{{ t('profilePage.date') }}: {{ dateFormat(order.orderDate) }}</p>
        </header>
        <div class="order__body">
          <div
            v-for="product in order.products"
            :key="product.product_id"
            class="order__product"
          >
            <div class="order__product__info">
              <p class="order__product__name">{{ product.name }}</p>
              <p class="order__product__price">
                {{ t('profilePage.unitPrice') }}:
                {{ currencyFormat(product.price) }}
              </p>
              <p class="order__product__quantity">
                {{ t('profilePage.quantity') }}: {{ product.quantity }}
              </p>
            </div>
          </div>
        </div>
      </li>
    </ol>
  </main>
</template>

<style scoped lang="scss">
  @use '@/assets/scss/pages/orders.scss' as *;
</style>
