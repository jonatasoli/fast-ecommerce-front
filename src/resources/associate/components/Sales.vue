<template>
  <v-container>
    <v-row>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("associate", ["transactions"]),
  },
};
</script>

<style></style>
