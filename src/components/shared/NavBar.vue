<template>
  <div>
    <div v-if="user == null">
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
    <div v-else>
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
        <v-btn @click="logout">Sair</v-btn>
        <h4 class="username">Olá {{user_name}}</h4>
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
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("user");
export default {
  name: "MainNavBar",
  data() {
    return {
      user: localStorage.getItem("user_data"),
      items: [
        {title: "ENTRE", to:this.login},
        {title: "OFERTAS", to:this.goToSales}
      ]
    }
  },
  computed: {
    user_name() {
      let user_data = JSON.parse(this.user);
      let userName = user_data["name"].split(" ");
      console.log(this.user)
      return userName[0]
    }
  },
  methods: {
    ...mapActions(["logoutClient"]),
    home() {
      this.$router.push({
        name:"USER"
      }).catch (() => {});
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
    logout() {
      this.logoutClient();
      this.$router.push({
        name:"Showcase"
      }).catch(() => {});
    }
  },
};
</script>

<style scoped>
.has-margin-top-1 {
  margin-top: 1.5rem
}
.username {
  margin-left: 22px;
  margin-top: 22px 
}
</style>
