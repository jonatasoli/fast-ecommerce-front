<template>
  <v-container>
    <div class="home-style">
      <v-row>
        <NavBar />
      </v-row>
      <v-row>
        <SecondaryNavBar />
      </v-row>
    </div>
  </v-container>
</template>

<script>
import NavBar from "@/components/shared/NavBar.vue";
import SecondaryNavBar from "@/components/shared/SecondaryNavBar.vue";
export default {
  name: "Home",
  components: {
    NavBar,
    SecondaryNavBar,
  },
};
</script>

<style lang="sass" scoped>
.home-style
    display: flex
    flex-flow: row wrap
    color:"white"
    background: "white"
    background-color: "white"
</style>
