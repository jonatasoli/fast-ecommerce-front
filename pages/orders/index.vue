<script lang="ts" setup>
  const { user, pending: pendingUser } = storeToRefs(useUserStore())
  const userId = user.value?.userId ?? ''
  const { data: orders, pending } = await useOrders(userId)

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
    title: 'Meus pedidos',
  })
</script>

<template>
  <main class="orders">
    <h1 class="title">Meus pedidos</h1>

    <div v-if="pending || pendingUser" class="orders__loading">
      <n-spin />
    </div>

    <div v-if="!pending && !orders?.length" class="orders__empty">
      <p>Você não possui nenhum pedido :(</p>

      <nuxt-link to="/">
        <n-button class="orders__button" quaternary type="primary" size="large">
          Comprar agora
        </n-button>
      </nuxt-link>
    </div>

    <ol v-else>
      <li v-for="order in orders" :key="order.orderId" class="order">
        <header class="order__header">
          <div>
            <h2>Pedido {{ order.orderId }}</h2>
            <p>Status: {{ getOrderStatus(order.orderStatus) }}</p>
          </div>
          <p>Data: {{ dateFormat(order.orderDate) }}</p>
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
                Valor unitário: {{ currencyFormat(product.price) }}
              </p>
              <p class="order__product__quantity">
                Quantidade: {{ product.quantity }}
              </p>
            </div>
          </div>
        </div>
      </li>
    </ol>
  </main>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/pages/orders.scss';
</style>
