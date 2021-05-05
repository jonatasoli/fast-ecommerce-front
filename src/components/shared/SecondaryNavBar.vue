<template>
  <div width="500">
    <v-toolbar
      v-if="$vuetify.breakpoint.lgOnly"
      id="categories-app-bar"
      color="#233237"
      height="30"
      class="center-items"
    >
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn @click="goHome" x-large color="#233237">INICIO</v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#233237" x-large v-bind="attrs" v-on="on">
              <v-icon small left>mdi-chevron-down</v-icon>
              <span>Produtos</span>
            </v-btn>
          </template>
          <v-list-item v-for="a in categorys" :key="a.id" link class="item">
            <router-link
              tag="v-list-item-title"
              :to="{ name: 'ProductCategory', params: { id: a.id } }"
            >
              <v-list-item-title>{{ a.name }}</v-list-item-title>
            </router-link>
          </v-list-item>
        </v-menu>
        <v-btn @click="goAbout" color="#233237">QUEM SOMOS</v-btn>
        <v-btn @click="goContact" x-large color="#233237">CONTATO</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers(
  "category"
);
export default {
  name: "SecondNavBar",
  data() {
    return {
      category: this.setCategorys(),
    };
  },
  computed: {
    ...mapState({
      categorys: "categorys",
    }),
  },
  methods: {
    ...mapGetters(["getCategory"]),
    ...mapActions(["setCategorys"]),
    goHome() {
      this.$router.push({
        name: "USER",
      });
    },
    goAbout() {
      this.$router.push({
        name: "About",
      });
    },
    goContact() {
      this.$router.push({
        name: "Contact",
      });
    },
    beforeRouteUpdate(to, from, next) {
      this.categorys = this.setCategorys();
      next();
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.categorys = vm.setCategorys();
      });
    },
  },
};
</script>

<style scoped>
.center-items {
  display: flex;
  justify-content: center;
  align-items: center;
}
.theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: #ffffff !important;
  background-color: #233237;
  text-transform: uppercase;
}
</style>
