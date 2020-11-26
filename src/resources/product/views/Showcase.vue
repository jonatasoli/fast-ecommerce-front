<template>
  <v-container>
    <NavBar />
    <v-row>
      <v-col
        class="d-flex align-center justify-space-around flex-wrap"
        xs="12"
        sm="12"
        md="12"
        lg="12"
        xl="12"
        v-if="products.length > 0"
      >
        <ProductCard v-for="product in products" :key="product.id" :product="product"></ProductCard>
      </v-col>
      <v-col v-else>
        <h2>Não há produtos nessa sessão!</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers("product");

import NavBar from "@/resources/product/components/Header.vue";
import ProductCard from "@/resources/product/components/ProductCard.vue";
export default {
  name: "Showcase",
  components: {
    NavBar,
    ProductCard,
  },
  data() {
    return {
      affiliate: undefined,
      cupom: undefined,
      uri: undefined,
    };
  },
  computed: {
    ...mapState({
      products: "products",
    }),
  },
  watch: {},
  created() {
    this.getShowcase();
  },
  methods: {
    ...mapActions(["setShowcase", "setAffiliate"]),
    ...mapGetters(["getShowcase"]),
  },
  beforeRouteUpdate(to, from, next) {
    this.affiliate = to.query.afil;
    if (this.affiliate) {
      this.setAffiliate(this.affiliate);
    }
    this.cupom = to.query.cupom;
    this.products = this.getShowcase();
    next();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.affiliate = to.query.afil;
      console.log(vm.affiliate);
      if (vm.affiliate) {
        vm.setAffiliate(vm.affiliate);
      }
      vm.cupom = to.query.cupom;
      vm.products = vm.setShowcase();
    });
  },
};
</script>
