<template>
  <div>
    <NavBar> 
       <v-btn  x-large 
        @click.stop="sidebarMenu = !sidebarMenu">
        <v-icon left> mdi-menu</v-icon></v-btn>
    </NavBar>
    <MenuDashboard :sidebarMenu="sidebarMenu"/>
    <v-container class="buscar">
    <Date @dates="dates = $event"/>
    
    <v-btn x-large @click="loadData">Buscar</v-btn>
    </v-container>
    <v-container>
      <router-view :key="$route.path"/>
    </v-container>
  </div>
</template>

<script>

import NavBar from "@/components/shared/NavBar.vue";
import MenuDashboard from "../components/MenuDashboard.vue";
import Date from "../components/Date.vue";
export default {
  components: { NavBar, MenuDashboard, Date },
  data: () => ({
    dates: '',
    sidebarMenu: false,
  }),
  methods: {
    loadData() {
      console.log(this.dates)
      this.$router.push({
        name:"tableOrders",
        params: {dates: JSON.stringify(this.dates)},
      }).catch (() => {});
      location.reload()
    },
  },
};
</script>
<style scoped>
.buscar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>