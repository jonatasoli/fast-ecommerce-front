<script setup lang="ts">
import { storeToRefs } from "pinia";
import { currencyFormat, useI18n, onMounted, ref, unref } from "#imports";
import { useCartStore } from "~/stores/cart";
import type { Checkout } from "~/utils/types";

const cartStore = useCartStore();
const { t } = useI18n();
const { address } = storeToRefs(cartStore);
const preview = ref<Checkout>({
  uuid: "",
  cart_items: [],
  affiliate: "",
  total: "",
  subtotal: "",
  coupon: "",
  discount: "",
  installments: 0,
  payment_method: "",
  payment_method_id: "",
  shipping_is_payment: false,
  gateway_provider: "",
  customer_id: "",
  zipcode: "",
  user_address_id: 0,
  shipping_address_id: null,
  freight_product_code: "03298",
  freight: {
    price: "",
    delivery_time: "",
    max_date: "",
  },
  user_data: {
    document: "",
    name: "",
    email: "",
    phone: "",
    user_id: null,
  },
});

onMounted(async () => {
  const response = await cartStore.getCartPreview();
  if (!response) {
    return;
  }
  const { success, data } = unref(response);
  if (!success) {
    return;
  }
  preview.value = data;
});
</script>

<template>
  <div>
    <h2 class="title">
      {{ t("checkout.finally.title") }}
    </h2>
    <div class="border">
      <n-grid :x-gap="20" :cols="12">
        <n-gi :span="8">
          <h3 class="title">
            {{ t("checkout.steps.login") }}
          </h3>
          <ul>
            <li>
              {{ preview.user_data.name }}
            </li>
            <li>
              {{ preview.user_data.email }}
            </li>
            <li>
              {{ preview.user_data.phone }}
            </li>
          </ul>
        </n-gi>
        <n-gi :span="4">
          <h3 class="title">
            {{ t("checkout.shipping.title") }}
          </h3>
          <ul>
            <li>
              {{ address.user_address.zipcode }}
            </li>
            <li>
              {{ address.user_address.street }} -
              {{ address.user_address.street_number }}
            </li>
            <li>
              {{ address.user_address.neighborhood }} -
              {{ address.user_address.city }} - {{ address.user_address.state }}
            </li>
          </ul>
        </n-gi>
      </n-grid>
      <div class="divider" />
      <div
        v-for="product in preview.cart_items"
        :key="product.product_id"
        class="products"
      >
        <n-grid :x-gap="20" :cols="12">
          <n-gi :span="3">
            <div class="product__image">
              <img
                :src="product.image_path"
                alt="Imagem do produto"
                width="100"
                height="100"
              />
            </div>
          </n-gi>
          <n-gi :span="5">
            <div class="product__info">
              <div class="product__name">
                {{ product.name }}
              </div>
              <div class="product__quantity">
                {{ t("checkout.finally.quantity") }}: {{ product.quantity }}
              </div>
            </div>
          </n-gi>
          <n-gi :span="2">
            <div class="product__price">
              <p class="price-title">Unit.</p>
              <h3>
                {{ currencyFormat(product.price) }}
              </h3>
            </div>
          </n-gi>
          <n-gi :span="2">
            <div class="product__price">
              <p class="price-title">Total</p>
              <h3>
                {{ currencyFormat(product.price * product.quantity) }}
              </h3>
            </div>
          </n-gi>

        </n-grid>
      </div>
      <div class="divider" />
      <n-grid :x-gap="20" :cols="12">
        <n-gi :span="9" />
        <n-gi :span="3">
          <div class="amount">
            <div class="row">
              <span class="total__title"> Subtotal: </span>
              <h3 class="total__value">
                {{ currencyFormat(preview.subtotal) }}
              </h3>
            </div>
            <div class="row">
              <span class="total__title"> Frete: </span>
              <h3 class="total__value">
                {{ currencyFormat(preview.freight.price) }}
              </h3>
            </div>
            <div class="row">
              <span class="total__title"> Desconto: </span>
              <h3 class="total__value">
                {{ currencyFormat(preview.discount) }}
              </h3>
            </div>
            <div class="row">
              <span class="total__title"> Total: </span>
              <h3 class="total__value">
                {{ currencyFormat(preview.total) }}
              </h3>
            </div>
          </div>
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./ResumeOrder.scss";
</style>
