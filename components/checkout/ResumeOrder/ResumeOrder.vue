<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { currencyFormat, useI18n } from '#imports'
import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'
import { useCheckoutStore } from '~/stores/checkout'

const { getCart } = storeToRefs(useCartStore())
const { user } = storeToRefs(useUserStore())
const { checkout } = storeToRefs(useCheckoutStore())
const { t } = useI18n()
</script>

<template>
  <div class="border">
    <div class="user">
      <div v-if="user">
        <h3 class="title">
          {{ t('checkout.steps.login') }}
        </h3>
        <ul>
          <li>
            {{ user.name }}
          </li>
          <li>
            {{ user.email }}
          </li>
          <li>
            {{ user.phone }}
          </li>
        </ul>
      </div>
      <div>
        <h3 class="title">
          {{ t('checkout.shipping.title') }}
        </h3>
        <ul>
          <li>
            {{ checkout.user_address.zipcode }}
          </li>
          <li>
            {{ checkout.user_address.street }} - {{ checkout.user_address.street_number }}
          </li>
          <li>
            {{ checkout.user_address.neighborhood }} - {{ checkout.user_address.city }} - {{ checkout.user_address.state }}
          </li>
        </ul>
      </div>
    </div>
    <div class="divider" />
    <div
      v-for="product in getCart.cart_items"
      :key="product.product_id"
      class="products"
    >
      <n-grid :x-gap="20" :cols="10">
        <n-gi :span="2">
          <div class="product__image">
            <img
              :src="product.image_path"
              alt="Imagem do produto"
              width="100"
              height="100"
            >
          </div>
        </n-gi>
        <n-gi :span="6">
          <div class="product__info">
            <div class="product__name">
              {{ product.name }}
            </div>
            <div class="product__quantity">
              {{ t('checkout.finally.quantity') }}: {{ product.quantity }}
            </div>
          </div>
        </n-gi>
        <n-gi :span="2">
          <div class="product__price">
            <h3>
              {{ currencyFormat(product.price) }}
            </h3>
          </div>
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './ResumeOrder.scss';
</style>
