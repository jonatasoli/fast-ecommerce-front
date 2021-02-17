<template>
  <div>
    <v-row class="navbar">
    <NavBar> 
    </NavBar>
    <MenuDashboard />

    </v-row>
  </div>
</template>

<script>
import NavBar from "@/components/shared/NavBar.vue";
import MenuDashboard from "../components/MenuDashboard.vue"
export default {
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
