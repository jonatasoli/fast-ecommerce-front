<template>
  <div class="container is-fluid has-margin-top-1">
    <div v-if="pageProduct.id" class="tile is-ancestor">
      <div class="tile is-vertical is-8">
        <div class="tile is-parent">
          <div class="tile is-child notification is-info box">
            <CheckoutTemplate />
          </div>
        </div>
        <div v-if="direct_sales" class="tile is-parent">
          <div class="tile is-child notification is-warning box">
            <h3 class="font-weight-light">Nome: {{ direct_sales }}</h3>
            <p>Email: {{ direct_sales }}</p>
            <p>{{ affiliate }}</p>
            <p>{{ cupom }}</p>
            <p>Produto: {{ pageProduct.id }}</p>
            <p>Getter: {{ ProductURI(uri) }}</p>
            <p>{{ uri }}</p>
            <p v-if="ProductURI(uri)">nois</p>
            <div v-if="allow_direct_sales">
              <p>IPOD</p>
            </div>
            <div v-else>
              <p>IPOD não</p>
            </div>
          </div>
        </div>
      </div>
      <div class="tile is-vertical is-2">
        <div class="tile is-parent">
          <div class="tile is-child notification is-success box">
            <Order />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child notification is-warning box">
          <p>Produto não encontrado</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* import EventBus from './../../event-bus' */
import { mapState, mapGetters, mapActions } from "vuex";

import CheckoutTemplate from "@/components/checkout/CheckoutTemplate.vue";
import Order from "@/components/checkout/Order.vue";

export default {
  /* props: { */
  /*     id: { */
  /*         type: Number, */
  /*         required: true */
  /*     } */
  /* }, */
  name: "direct-sales-product",
  components: {
    CheckoutTemplate,
    Order
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
      pageProduct: "product"
    }),
    ...mapGetters(["ProductURI"])
  },
  /* created() { */
  /*   console.log(this.uri); */
  /*   this.product = this.getDirectSalesProduct({ uri: this.uri }); */
  /*   console.log("menos product"); */
  /*   console.log(this.product); */
  /* }, */
  methods: {
    ...mapActions(["getDirectSalesProduct"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // vm.direct_sales = EventBus.buscarContato(vm.id)
      if (to.params.uri === "course01") {
        vm.allow_direct_sales = true;
      }
      console.log(to.params.uri);
      vm.product = vm.getDirectSalesProduct({ uri: to.params.uri });

      vm.uri = to.params.uri;
      vm.direct_sales = to.params.uri;
      vm.affiliate = to.query.afil;
      vm.cupom = to.query.cupom;
    });
  },
  beforeRouteUpdate(to, from, next) {
    /*this.direct_sales = EventBus.buscarContato(+to.params.id) */
    this.affiliate = to.query.afil;
    this.cupom = to.query.cupom;
    next();
  }
};
</script>

<style lang="sass" scoped>
.has-margin-top-1
    margin-top: 1.5rem
</style>
