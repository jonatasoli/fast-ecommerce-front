<template>
  <div>
    <v-app-bar id="home-app-bar" app elevation="1" color="#18121E" height="80" v-if="$vuetify.breakpoint.xsOnly">
      <v-toolbar-items link @click="home">
        <v-img
        src="./assets/img/logo2.png"
        class="mr-3"
        max-width="150"
        contain/>
      </v-toolbar-items>
      <v-spacer/>
      <v-toolbar-items>
      <v-menu offset-y>
          <template v-slot:activator="{ attrs, on }"> 
            <v-btn v-bind="attrs" v-on="on"><v-icon>mdi-menu</v-icon></v-btn>
          </template>
          <v-list>
            <v-list-item v-for="item in items" :key="item" link @click="item.to">
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn @click="goToShoppingCart">
          <v-icon dense dark>fa-shopping-cart</v-icon>
        </v-btn>
      </v-toolbar-items>
      </v-app-bar>
      
      <v-app-bar id="home-app-bar" app elevation="1" color="#18121E" height="80" v-else>
      <v-toolbar-items>
        <slot></slot>
        <v-btn @click="login">ENTRE</v-btn>
        <v-btn>CADASTRE-SE</v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-img
        src="./assets/img/logo2.png"
        class="mr-3 hidden-xs-only"
        max-width="250"
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
  data() {
    return {
      items: [
        {title: "ENTRE", to:this.login},
        {title: "OFERTAS", to:this.goToSales}
      ]
    }
  },
  methods: {
    home() {
      this.$router.push({
        name:"Home"
      })
    },
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
    login() {
      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.has-margin-top-1
    margin-top: 1.5rem
</style>
