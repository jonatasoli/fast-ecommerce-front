<template>
  <div>
    <nav-bar>
      <v-btn x-large @click.stop="sidebarMenu = !sidebarMenu">
        <v-icon left> mdi-menu</v-icon></v-btn
      >
    </nav-bar>
    <MenuAssociate :sidebarMenu="sidebarMenu"></MenuAssociate>
    <v-container>
      <v-row no-gutters>
        <v-col md="4">
          <v-card>
            <h2 class="ml-3">Painel</h2>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
