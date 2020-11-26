<template>
  <div class="home">
    <NavBar />
    <SecondaryNavBar />
  </div>
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
