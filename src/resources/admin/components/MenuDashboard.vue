<template>
  <div class="home-style">
    <v-navigation-drawer
      v-model="sidebar"
      app
      floating
      :permanent="sidebar"
      :mini-variant.sync="mini"
    >
      <v-list dense dark>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <h3 class="font-weight-thin">Configurações</h3>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              ><h3>{{ item.title }}</h3></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: ["sidebarMenu"],
  computed: {
    mini() {
      return this.$vuetify.breakpoint.smAndDown || this.toggleMini;
    },
    sidebar: {
      get() {
        return this.sidebarMenu;
      },
      set(sidebar) {
        this.$emit("update:sidebarMenu", sidebar);
      },
    },
  },
  data: () => ({
    items: [{ title: "Produtos", to: "/admdash/produtos", icon: "mdi-cart" }],
  }),
};
</script>

<style></style>
