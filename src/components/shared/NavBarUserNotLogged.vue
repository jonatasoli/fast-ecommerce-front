<template>
  <div>
       <v-app-bar
        id="home-app-bar"
        app
        elevation="1"
        color="#18121E"
        height="80"
        
        v-if="$vuetify.breakpoint.xsOnly"
      >
        <v-toolbar-items link @click="home">
          <v-img src="./assets/img/logo2.png" class="mr-3" max-width="150" contain />
        </v-toolbar-items>
        <v-spacer />
        <v-toolbar-items>
          <v-menu offset-y>
            <template v-slot:activator="{ attrs, on }">
              <v-btn v-bind="attrs" v-on="on"><v-icon>mdi-menu</v-icon></v-btn>
            </template>
            <v-list>
              <v-list-item v-for="item in items" :key="item" link @click="item.to">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn @click="goToShoppingCart">
            <v-icon dense dark>fa-shopping-cart</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>
       <div v-else>
        <div v-on:scroll="handleScroll">
          <v-system-bar color="#FAA500" height="40">
            <div class="contacts">
              <div class="icons">
              <v-icon large color="#18121E">mdi-instagram </v-icon>
              <v-icon large color="#18121E">mdi-facebook </v-icon>

              </div>
              <div>
                <v-btn text color="#18121E"><v-icon dense color="#18121E">fa-envelope</v-icon>Fale Conosco</v-btn>
              </div>
            </div>
          </v-system-bar>
        </div>
        <v-app-bar :app="app" elevation="12" color="#18121E" height="80" >
          <v-toolbar-items>
            <slot></slot>
            <v-btn @click="login">ENTRE</v-btn>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      app: undefined,
      items: [
        { title: "ENTRE", to: this.login },
        { title: "OFERTAS", to: this.goToSales },
      ],
    };
  },
  methods: {
    handleScroll() {
     if (document.body.scrollHeight > 900) {
       if (window.scrollY > 60) {
         return setTimeout(() =>{this.app = "app"}, 100)
       } else {
         return setTimeout(() =>{this.app = undefined}, 100  )
 
       }
     }
    },
    home() {
      this.$router
        .push({
          name: "USER",
        })
        .catch(() => {});
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
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.contacts {
  color: #18121e;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  padding: 20px
}

</style>