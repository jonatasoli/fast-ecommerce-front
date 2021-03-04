<template>
  <div>
    <nav-bar>
      <v-btn x-large @click.stop="sidebarMenu = !sidebarMenu">
        <v-icon left> mdi-menu</v-icon></v-btn
      >
    </nav-bar>
    <MenuPartner :sidebarMenu="sidebarMenu"></MenuPartner>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "../../../components/shared/NavBar.vue";
import MenuPartner from "../components/MenuPartner";
export default {
  components: { NavBar, MenuPartner },
  data() {
    return {
      sidebarMenu: false,
    };
  },
};
</script>

<style></style>
