<template>
  <div class="home-style">
    <NavBar />
        <v-content>
    <SecondaryNavBar />
        </v-content>
  </div>
</template>

<script>
import NavBar from "@/components/shared/NavBar.vue";
import SecondaryNavBar from "@/components/shared/SecondaryNavBar.vue";
export default {
  name: "Home",
  components: {
    NavBar,
    SecondaryNavBar
  }
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
