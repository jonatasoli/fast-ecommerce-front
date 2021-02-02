<template>
  <div width='500'>
    <v-toolbar
      id="categories-app-bar"
      color="#233237"
      height="30"
      class="center-items"
    >
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to='/' x-large color="#233237">INICIO</v-btn>
        <v-btn :to="{name: 'About'}" x-large color="#233237">QUEM SOMOS</v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
            color="#233237" x-large
            v-bind="attrs"
            v-on="on"> 
              <v-icon
              small
              left>fas fa-list</v-icon>
              <span >Produtos</span>
            </v-btn>
          </template>
             <v-list-item v-for="a in categorys" :key="a.id" link>
               <router-link
                tag="v-list-item-title"
                :to="{name:'product-category', params:{id: a.id}}">
              <v-list-item-title>{{a.name}}</v-list-item-title>
             </router-link>
            </v-list-item>
          </v-menu>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers("category");
export default {
  name: "SecondNavBar",
  data(){
    return {
      category: this.setCategorys()
    }
  },
  computed: {
    ...mapState({
      categorys: "categorys",
    }),
  },
  methods: {
    ...mapGetters(["getCategory"]),
    ...mapActions(["setCategorys"]),
  },
  beforeRouteUpdate(to, from, next){
    this.categorys = this.setCategorys()
    next()
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.categorys = vm.setCategorys();
    })
    }
  }
</script>

<style lang="sass" scoped>
.center-items
  display: flex
  justify-content: center
  align-items: center

v-text-field
  backgroud: "white"
</style>
