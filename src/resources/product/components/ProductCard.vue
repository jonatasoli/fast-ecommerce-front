<template>
  <v-card width="300" class="card">
    <div class="box">
    <v-img :src="product.image_path" class="img"></v-img>
    </div>

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
  margin-top: 30px;
  margin-left: 40px;
  }
.box {
  width: 300px;
  height: 300px;
  overflow: hidden;
}
.img {
  object-fit: cover;
}
</style>
