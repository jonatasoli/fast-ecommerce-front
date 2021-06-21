<template>
  <v-row>
    <v-col v-for="product in cart" :key="product.id">
      <v-card color="#233237" dark>
        <v-img :src="product.image_path"></v-img>
        <v-card-title class="headline">{{ product.name }}</v-card-title>

        <v-card-subtitle v-html="product.description">{{
          product.description
        }}</v-card-subtitle>

        <v-card-actions
          >Valor: {{ formatCurrency(product.price / 100) }}</v-card-actions
        >
      </v-card>
      <v-card color="#EAC67A" dark>
        <v-card-title class="headline"
          >Total: {{ formatCurrency(totalPrice) }}</v-card-title
        >
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import FormatCurrencyMixin from "@/mixins/format-currency";
import { mapState, mapGetters } from "vuex";

export default {
  name: "OrderCurrenctCart",
  mixins: [FormatCurrencyMixin],
  data() {
    return {
      labelPosition: "on-border",
      hasError: false,
      totalPrice: 0,
    };
  },
  computed: {
    ...mapState({
      cart: "shopping_cart",
    }),
    ...mapGetters({
      cartTotal: "totalCart",
    }),
  },
  async created() {
    this.totalPrice = await this.cartTotal;
  },
};
</script>

<style scoped lang="scss"></style>
