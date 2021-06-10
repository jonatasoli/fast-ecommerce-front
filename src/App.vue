<template>
  <v-app>
    <v-main>
      <cookie-law theme="dark-lime">
        <div slot-scope="props">
          <p>Este site utiliza Cookies 🍪</p>
          <button class="skew" @click="props.accept">
            <span>Aceitar</span>
          </button>
          <button class="skew" @click="props.close">
            <span>Ignorar</span>
          </button>
        </div>
      </cookie-law>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import CookieLaw from "vue-cookie-law";
export default {
  name: "App",
  components: {
    CookieLaw,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
p,
.skew {
  font-size: 20px;
}
.skew {
  margin-right: 20px;
  font-weight: bold;
}
</style>
