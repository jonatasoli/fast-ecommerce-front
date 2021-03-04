<template>
  <v-app>
    <div class="home-style">
      <v-row>
        <NavBar />
      </v-row>
      <v-row>
        <SecondaryNavBar />
      </v-row>
    </div>
    <div class="button">
      <v-btn class="email" x-large href="mailto:comercial@gattorosa.com.br">
        <v-icon left>mdi-email</v-icon> Fale Conosco
      </v-btn>
      <v-btn
        class="whatsapp"
        target="_blank"
        x-large
        href="https://wa.me/551164324584"
      >
        <v-icon left>mdi-whatsapp</v-icon> Whatsapp
      </v-btn>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from "@/components/shared/NavBar.vue";
import Footer from "@/components/shared/Footer.vue";
import SecondaryNavBar from "@/components/shared/SecondaryNavBar.vue";
export default {
  components: {
    NavBar,
    SecondaryNavBar,
    Footer,
  },
};
</script>

<style scoped>
.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}
.whatsapp {
  margin-top: 40px;
  width: 200px;
}
</style>
