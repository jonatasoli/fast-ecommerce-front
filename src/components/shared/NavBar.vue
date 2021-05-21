<template>
  <div>
    <div v-if="user == null">
     <NavBarNotUser />
    </div>
    <div v-else>
      <NavBarUserLogged> <slot></slot></NavBarUserLogged>
    </div>
  </div>
</template>

<script>
import NavBarNotUser from "@/components/shared/NavBarUserNotLogged.vue"
import NavBarUserLogged from "@/components/shared/NavBarUserLogged.vue"
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("user");
export default {
  name: "MainNavBar",
  components: { NavBarNotUser, NavBarUserLogged },
  data() {
    return {
      user: localStorage.getItem("user_data"),
    };
  },
  methods: {
    ...mapActions(["logoutClient"]),
    login() {
      this.$router.push({
        name: "Login",
      });
    },
    logout() {
      this.logoutClient();
      this.$router
        .push({
          name: "Showcase",
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
</style>
