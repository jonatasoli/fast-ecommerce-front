<template>
  <v-card max-width="344" class="card">
    <v-img :src="product.image_path" class="img"></v-img>

    <v-card-title>{{ product.name }}</v-card-title>

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
        params: { uri: this.product.uri },
      });
    },
  },
};
</script>
<style scoped>
.card {
  float: left;
  overflow: hidden;
}
.img {
  object-fit: contain;
}
</style>
