<template>
  <v-container>
    <v-row v-if="products.length > 0" class="partner">
      <v-col
        xs="12"
        sm="7"
        md="7"
        lg="7"
        xl="7"
        class="column"
        v-for="product of products"
        :key="product.description"
      >
        <v-card width="100%">
          <img :src="product.image_path" :alt="product.name" />
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-subtitle>{{ product.uri }}</v-card-subtitle>
          <v-card-text>{{ product.description }}</v-card-text>
          <v-card-text
            >R${{
              product.price.toFixed(2).toString().replace(/\./, ",")
            }}</v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>Não há produtos nessa sessão</v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("partner", ["products"]),
  },
};
</script>

<style scoped>
img {
  width: 100%;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
}
.partner {
  display: flex;
  flex-flow: row wrap;
}
.partner .column {
  max-width: 50%;
}
</style>
