<template>
  <div>
    <v-row class="navbar">
    <NavBar> 
       <v-btn  x-large 
        @click.stop="sidebarMenu = !sidebarMenu">
        <v-icon left> mdi-menu</v-icon></v-btn>
    </NavBar>
    <MenuDashboard :sidebarMenu="sidebarMenu"/>

    </v-row>
  </div>
</template>

<script>
import NavBar from "@/components/shared/NavBar.vue";
import MenuDashboard from "../components/MenuDashboard.vue"
export default {
  data:() => ({
    sidebarMenu: false
  }),
  components: {
    NavBar,
    MenuDashboard
  },
};
</script>

<style scoped>
#menu {
  width: 500px im !important;
}
.navbar {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
