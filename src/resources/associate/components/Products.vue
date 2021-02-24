<template>
  <v-container>
    <v-row>
      <v-col
        class="d-flex align-center justify-space-around flex-wrap"
        xs="12"
        sm="12"
        md="12"
        lg="12"
        xl="12"
        v-if="products.length > 0"
      >
      </v-col>
      <v-col v-else>Não há produtos nessa sessão</v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("associate", ["products"]),
  },
  methods: {
    ...mapActions("associate", ["PopulateProducts"]),
  },
  created() {
    this.PopulateProducts();
  },
};
</script>

<style></style>
