<template>
  <v-container >
    <div class="home-style">
    <v-row>
      <NavBar />
      <SecondaryNavBar />
    </v-row>
    <v-row>
        <SecondaryNavBar />
    </v-row>
    </div>
    <div class="home-style">
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
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          ></ProductCard>
        </v-col>
        <v-col v-else>
          <h2>Não há produtos nessa sessão!</h2>
        </v-col>
      </v-row>
      <router-view></router-view>
    </div>
      <Footer/>
  </v-container>
</template>

<script>
import Footer from "@/components/shared/Footer.vue";
import SecondaryNavBar from "@/components/shared/SecondaryNavBar.vue";
import NavBar from "@/components/shared/NavBar.vue";
import ProductCard from "@/resources/product/components/ProductCard.vue";
import SecondaryNavBar from "@/components/shared/SecondaryNavBar.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers("product");
export default {
  name: "Home",
  components: {
    NavBar,
    SecondaryNavBar,
    ProductCard,
    Footer,
  },
  data() {
    return {
      id: this.$route.params.id,
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
  watch: {
    $route(to) {
      this.id = to.params.id;
    }
  },
  created() {
    this.getShowcase();
  },
  methods: {
    ...mapActions(["setShowcase","setAffiliate"]),
    ...mapGetters(["getShowcase"]),
  },
  beforeRouteUpdate(to, from, next) {
    this.affiliate = to.query.afil;
    this.id = to.params.id;
    if (this.affiliate) {
      this.setAffiliate(this.affiliate);
    }
    this.cupom = to.query.cupom;
    this.getShowcase();
    next();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.affiliate = to.query.afil;
      vm.id = to.params.id;
      console.log("affiliate", vm.affiliate);
      if (vm.affiliate) {
        vm.setAffiliate(vm.affiliate);
      }
      vm.cupom = to.query.cupom;
      vm.products = vm.setShowcase();
    });
  }
};
</script>

<style lang="sass">
.home-style
    display: flex
    flex-flow: row wrap
    color:"white"
    background: "white"
    background-color: "white" 

.menu
  display: inline
  margin: 0 auto
</style>
