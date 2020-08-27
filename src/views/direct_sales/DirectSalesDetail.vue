<template>
  <v-container class="mt-2">
    <v-row v-if="pageProduct.id">
    <v-col 
      align="center"
      justify="center"
      class="mt-5 md-6">
    <v-card color="#233237" dark>
        <v-card-title>Pagamento</v-card-title>
        <v-card-text>
            <CheckoutTemplate :cupom="cupom" :affiliate="affiliate" />
        </v-card-text>
    </v-card>

    </v-col>
      <v-row dense>
        <v-col class="mt-5 md-4">
            <Order />
        </v-col>
      </v-row>
    </v-row>
    <v-row v-else >
        <NavBar />
        <v-col>
        <v-alert type="info">
          <p>Produto não encontrado</p>
        </v-alert>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import CheckoutTemplate from "@/components/checkout/CheckoutTemplate.vue";
import Order from "@/components/checkout/Order.vue";
import NavBar from "@/components/shared/NavBar.vue";

export default {
  name: "direct-sales-product",
  components: {
    CheckoutTemplate,
    Order,
    NavBar
  },
  data() {
    return {
      allow_direct_sales: undefined,
      direct_sales: undefined,
      affiliate: undefined,
      cupom: undefined,
      uri: undefined
    };
  },
  computed: {
    ...mapState({
      pageProduct: "product",
      cart: "shopping_cart"
    }),
    ...mapGetters(["ProductURI"])
  },
  watch: {
    updateShoppingCart(){
      console.log("update");
    }
  },
  methods: {
    ...mapActions([
    "getDirectSalesProduct",
    "addShoppingCart",
    "resetShoppingCart"
    ]),
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.product = vm.getDirectSalesProduct({ uri: to.params.uri });

      vm.uri = to.params.uri;
      vm.direct_sales = to.params.uri;
      vm.affiliate = to.query.afil;
      vm.cupom = to.query.cupom;
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.affiliate = to.query.afil;
    this.cupom = to.query.cupom;
    next();
  }
};
</script>

<style lang="sass" scoped>
.has-margin-top-1
    margin-top: 80px 
</style>
