<template>
  <v-card width="310" class="card">
    <div class="box">
      <v-img :src="product.image_path" class="img"></v-img>
    </div>
    <div class="box-content">
      <v-card-title class="product-name">{{ product.name }}</v-card-title>
      <div class="box-price">
      <span class="price">{{ formatCurrency(product.price / 100) }}</span>
      <v-card-actions>
        <v-btn color="orange lighten-2" text @click="productDetail">Compre agora</v-btn>
      </v-card-actions>

      </div>
    </div>
  </v-card>
</template>

<script>
import FormatCurrencyMixin from "@/mixins/format-currency";
export default {
  name: "ProductCard",
  mixins: [FormatCurrencyMixin],
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
.product-name {
  font-size: 17px;
}
.box {
  width: 310px;
  height: 300px;
  overflow: hidden;
}
.img {
  object-fit: contain;
}
.price {
  margin-left: 20px;
  color: orange;
  font-weight: bold;
}
.box-price {
  position: absolute;
  bottom: 0
}

.box-content {
  height: 215px;
}
</style>
