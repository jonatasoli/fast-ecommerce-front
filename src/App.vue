<template>
  <v-app>
    <Home />
    <router-view></router-view>
  </v-app>
</template>

<script>
import Home from "./components/Home/views/Home";

export default {
  name: "App",

  components: {
    Home
  },

  data: () => ({
    //
  })
};
</script>
