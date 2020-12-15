<template>
  <v-container>
    <div class="home-style">
      <v-row>
        <NavBar />
        <h1>{{id}}</h1>
      </v-row>
      <v-row>
        <SecondaryNavBar 
        v-for="category in categorys" 
        :key="category.id" 
        :category="category"/>
      </v-row>
      <router-view></router-view>
    </div>
      <Footer/>
  </v-container>
</template>

<script>
import Footer from "@/components/shared/Footer.vue";
import NavBar from "@/components/shared/NavBar.vue";
import SecondaryNavBar from "@/components/shared/SecondaryNavBar.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers("category");
export default {
  name: "Home",
  components: {
    NavBar,
    SecondaryNavBar,
    Footer,
  },
  computed: {
    ...mapState({
      categorys: "categorys",
    }),
  },
  watch: {},
  created() {
    this.getCategory();
  },
  methods: {
    ...mapGetters(["getCategory"]),
    ...mapActions(["setCategorys"]),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.categorys = vm.setCategorys();
    })
  }
};
</script>

<style lang="sass" scoped>
.home-style
    display: flex
    flex-flow: row wrap
    color:"white"
    background: "white"
    background-color: "white"  
</style>
