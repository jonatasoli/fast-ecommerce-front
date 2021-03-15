<template>
  <div>
    <NavBar> 
       <v-btn  x-large 
        @click.stop="sidebarMenu = !sidebarMenu">
        <v-icon left> mdi-menu</v-icon></v-btn>
    </NavBar>
    <MenuDashboard :sidebarMenu="sidebarMenu"/>
    <v-container class="buscar">
    <Date @datenew="date = $event"/>
    <v-btn x-large @click="loadData">Buscar</v-btn>
    </v-container>
    <v-container>
    <router-view></router-view>

    </v-container>
  </div>
</template>

<script>
import NavBar from "@/components/shared/NavBar.vue";
import MenuDashboard from "../components/MenuDashboard.vue";
import Date from "../components/Date";
export default {
  components: {
    NavBar,
    MenuDashboard,
    Date
  },
  data: () => ({
    date: '',
    sidebarMenu: false,
  }),
  methods: {
    loadData() {
      console.log(this.date)
      this.$router.push({
        name:"tableTrancking",
        params: {date: this.date},
      }).catch (() => {});
      location.reload()
      
 
    },
  }
};
</script>
<style scoped>
.buscar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
