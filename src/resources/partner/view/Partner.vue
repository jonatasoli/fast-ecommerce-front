<template>
  <div>
    <nav-bar>
      <v-btn x-large @click.stop="sidebarMenu = !sidebarMenu">
        <v-icon left> mdi-menu</v-icon></v-btn
      >
    </nav-bar>
    <MenuAssociate :sidebarMenu="sidebarMenu"></MenuAssociate>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "../../../components/shared/NavBar.vue";
import MenuAssociate from "../components/MenuAssociate";
export default {
  components: { NavBar, MenuAssociate },
  data() {
    return {
      sidebarMenu: false,
    };
  },
};
</script>

<style></style>
