<template>
  <v-container>
    <v-row>
      <v-col justify="center" align="center">
        <v-card>
          <v-card-title>saldo disponível</v-card-title>
          <v-card-text
            >R${{
              balance.totalBalance.toFixed(2).toString().replace(/\./, ",")
            }}</v-card-text
          >
        </v-card>
      </v-col>
      <v-col justify="center" align="center">
        <v-card>
          <v-card-title>saldo a liberar</v-card-title>
          <v-card-text
            >R${{
              balance.toBeAvailable.toFixed(2).toString().replace(/\./, ",")
            }}</v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("partner", ["balance"]),
  },
};
</script>
