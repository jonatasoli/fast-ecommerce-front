<template>
  <v-card max-width="344">
    <v-img :src="product.image_path" height="200px"></v-img>

    <v-card-title>{{ product.name }}</v-card-title>

    <v-card-subtitle v-html="product.description">{{
      product.description
    }}</v-card-subtitle>

    <v-card-actions>
      <v-btn @click="productDetail">Ver oferta</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProductCard",
  props: ["product"],
  methods: {
    productDetail() {
      this.$router.push({
        name: "ProductDetail",
        params: { id: this.product.id },
      });
    },
  },
};
</script>
