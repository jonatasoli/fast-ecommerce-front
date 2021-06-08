<template>
  <div v-if="$vuetify.breakpoint.mobile"></div>
  <v-app-bar color="#18121E" elevation="12" v-else>
    <v-toolbar-items v-for="item in categorys" :key="item.id">
      <router-link
        elevation="0"
        style="text-decoration: none; color: inherit"
        :to="{ name: 'ProductCategory', params: { path: item.path } }"
      >
        <v-btn color="#18121E" elevation="0" >{{ item.name }} </v-btn>
      </router-link>
    </v-toolbar-items>
  </v-app-bar>
  
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("category");
export default {
  computed: {
    ...mapState({
      categorys: "categorys",
    }),
  },
  methods: {
    ...mapActions(["setCategorys"]),
  },
  mounted() {
    this.setCategorys();
  },
};
</script>

<style>
</style>
