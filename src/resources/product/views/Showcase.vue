<template>
  <v-app>
    <div class="home-style">
      <v-row>
        <NavBar />
      </v-row>
      <v-row>
        <MenuCategorys />
      </v-row>
      <Carousel />
      <Banner />
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
    <Footer />
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import NavBar from "@/components/shared/NavBar.vue";
import Footer from "@/components/shared/Footer.vue";
import ProductCard from "@/resources/product/components/ProductCard.vue";
import MenuCategorys from "@/components/shared/MenuCategorys";
import Carousel from "@/components/shared/Carousel.vue"
import Banner from "@/components/shared/Banner.vue"
export default {
  name: "Showcase",
  components: {
    NavBar,
    MenuCategorys,
    Carousel,
    Banner,
    ProductCard,
    Footer,
  },
  data() {
    return {
      path: undefined,
      affiliate: undefined,
      cupom: undefined,
      uri: undefined,
    };
  },
  computed: {
    ...mapState("product", {
      products: "products"
    }),
  },
  watch: {
    $route(to) {
      this.path = to.params.path;
    },
  },
  created() {
    this.getShowcase();
    
    this.affiliate = this.$route.query.afil;
    console.log("CREATED", this.affiliate);
    if (this.affiliate) {
      this.setAffiliate(this.affiliate);
    }
    console.log(this.$route.name)
  },
  updated() {
    this.affiliate = this.$route.query.afil;
    console.log("UPDATE", this.affiliate);
    if (this.affiliate) {
      this.setAffiliate(this.affiliate);
    }
  },
  methods: {
    ...mapActions("product", ["setShowcase", "setProductsCategory"]),
    ...mapActions("cart", ["setAffiliate"]),
    ...mapGetters("product", ["getShowcase"]),
  },
  beforeRouteUpdate(to, from, next) {
    this.affiliate = to.query.afil;
    this.path = to.params.path;
    if (this.affiliate) {
      this.setAffiliate(this.affiliate);
    }
    this.cupom = to.query.cupom;
    if (this.$route.path == "/destaque") {
      this.products = this.getShowcase();
    }
    this.products = this.setProductsCategory(this.path);

    
    next();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.affiliate = to.query.afil;
      vm.path = to.params.path;
      console.log(vm.affiliate);
      if (vm.affiliate) {
        vm.setAffiliate(vm.affiliate);
      }
      vm.cupom = to.query.cupom;
     if (vm.$route.name == "ProductCategory") {
        vm.setProductsCategory(vm.path);
      } else {
        vm.setShowcase();
      }

    });
  },
};
</script>

<style scoped>
</style>