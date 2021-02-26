<template>
  <v-container>
    <NavBar />
    <v-row>
      <v-col
        class="d-flex align-center justify-space-around flex-wrap"
        xs="12"
        sm="8"
        md="8"
        lg="8"
        xl="8"
      >
        <v-row class="galery d-flex align-center justify-center">
          <v-col
            class="d-flex align-center justify-center"
            xs="12"
            sm="7"
            md="7"
            lg="7"
            xl="7"
          >
            <v-img
              :src="product.image_path"
              height="100%"
              max-width="300px"
            ></v-img>
          </v-col>
          <v-col
            class="d-flex align-center justify-center"
            xs="12"
            sm="5"
            md="5"
            lg="5"
            xl="5"
          >
            <v-form @submit.prevent="addCart">
              <h1>{{ product.name }}</h1>
              <p>{{ formatCurrency(product.price / 100) }}</p>
              <div v-if="product.quantity === 0">
                <v-alert inf>Produto Esgotado</v-alert>
              </div>
              <div v-else>
                <v-select
                  :items="productAvailable"
                  label="Quantidade"
                  solo
                  v-model="product_qty_select"
                ></v-select>
                <v-btn color="#46cb18" dark large @click.prevent="addCart">
                  Adicionar ao Carrinho
                  <v-spacer></v-spacer>
                  <v-icon>fa-shopping-cart</v-icon>
                </v-btn>
              </div>
            </v-form>
            <v-divider inset></v-divider>
          </v-col>
        </v-row>
        <v-row class="details" sm="12" md="12">
          <v-col sm="12" md="12">
            <h2>Descrição</h2>
            <p v-html="product.description">{{ product.description }}</p>
          </v-col>
        </v-row>
        <v-row class="related"></v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import FormatCurrencyMixin from "@/mixins/format-currency";

import NavBar from "@/resources/product/components/Header.vue";
export default {
  name: "Showcase",
  mixins: [FormatCurrencyMixin],
  components: {
    NavBar,
  },
  data() {
    return {
      uri: this.$route.params.uri,
      affiliate: undefined,
      cupom: undefined,
      id: undefined,
      cart_item: undefined,
      product_qty_select: undefined,
    };
  },
  computed: {
    ...mapState("product", {
      product: "product",
    }),
    productAvailable() {
      let _available = [];
      console.log("QTY DETAIL", this.product.quantity);
      if (this.product.quantity > 10) {
        console.log("FOR");
        let n = 1;
        for (n; n <= 10; n++) {
          console.log("Iterações", n);
          _available.push(n);
        }
      } else {
        let n = 1;
        for (n; n <= this.product.quantity; n++) {
          _available.push(n);
        }
      }
      return _available;
    },
  },
  created() {
    this.getProductPage(this.id);
  },
  methods: {
    ...mapActions("product", ["getProduct"]),
    ...mapActions("cart", ["addShoppingCart"]),
    ...mapState("product", {
      state_afilliate: "affiliate",
    }),
    addCart() {
      console.log("QTY ", this.product_qty_select);
      if (!this.product_qty_select){
        this.product_qty_select = 1;
          }

      this.cart_item = {
        amount: this.product.price,
        qty: this.product_qty_select,
        product_id: this.product.id,
        product_name: this.product.name,
        affiliate: this.state_afilliate,
        tangible: true,
      };
      this.addShoppingCart(this.cart_item);
      this.cart_item = undefined;
      this.$router.push({ name: "ShoppingCart" });
    },
    getProductPage() {
      console.log("URI ----", this.uri);
      return this.getProduct({ uri: this.uri });
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.affiliate = to.query.afil;
    this.uri = to.params.uri;
    this.cupom = to.query.cupom;
    this.product = this.getProductPage(this.uri);
    next();
  },
};
</script>

<style lang="sass" scoped>
img
  height:100vh
</style>
