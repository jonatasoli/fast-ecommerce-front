<template>
  <div>
    <v-app-bar id="home-app-bar" app elevation="1" color="#18121E" height="80">
      
      <v-toolbar-items>
        <v-btn>ENTRE</v-btn>
        <v-btn>CADASTRE-SE</v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-img
        src="./assets/img/logo.png"
        class="mr-3 hidden-xs-only"
        max-width="250"
        contain
      />

      <v-img
        src="./assets/img/logo.png"
        class="d-flex d-sm-none"
        max-width="80"
        contain
      />

      <v-spacer />
      <v-toolbar-items>
        <v-btn @click="goToSales">OFERTAS</v-btn>
        <v-btn @click="goToShoppingCart">
          CARRINHO
          <v-icon right dark>fa-shopping-cart</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "MainNavBar",
  methods: {
    goToShoppingCart() {
      console.log("Cart");
      this.$router.push({
        name: "ShoppingCart",
      });
    },
    goToSales() {
      console.log("entrou");
      this.$router.push({
        name: "Showcase",
      });
    },
  },
};
</script>

<style lang="sass" scoped> 
.has-margin-top-1
    margin-top: 1.5rem
</style>
