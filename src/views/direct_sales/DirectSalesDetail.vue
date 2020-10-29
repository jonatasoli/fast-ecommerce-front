<template>
  <v-container class="mt-2">
    <v-row v-if="pageProduct.id" class="mb-12 sm-12 xs-12">
      <v-col cols="12" mt="5" md="6" order="1" align="center" justify="center">
        <v-card color="#233237" dark>
          <v-card-title>Pagamento</v-card-title>
          <v-card-text>
            <CheckoutTemplate :cupom="cupom" :affiliate="affiliate" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="12" mt="5" md="4" order-sm="0" order-xs="0">
        <Order />
      </v-col>
    </v-row>
    <v-row v-else>
      <NavBar />
      <v-col>
        <v-alert type="info">
          <p>Produto está sendo carregado aguarde ...</p>
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
    updateShoppingCart() {
      console.log("update");
    }
  },
  methods: {
    ...mapActions([
      "getDirectSalesProduct",
      "addShoppingCart",
      "resetShoppingCart"
    ])
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
