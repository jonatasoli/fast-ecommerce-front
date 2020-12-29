<template>
  <v-container>
    <div class="home-style">
      <v-row>
        <NavBar />
      </v-row>
    </div>
  </v-container>
</template>

<script>
import NavBar from "@/components/shared/NavBar.vue";
export default {
  name: "Header",
  components: {
    NavBar,
  },
};
</script>

<style lang="sass" scoped>
.home-style
    display: flex
    flex-flow: row wrap
    color:"white"
    background-color: "white"
    background: "white"
</style>
