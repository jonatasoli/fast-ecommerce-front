<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          class="justify-content-around"
          v-for="transaction of transactions"
          :key="transaction.code"
        >
          <v-row class="display-relative">
            <v-col>
              <v-card-title>Transações</v-card-title>
              <v-card-text>Código: {{ transaction.code }}</v-card-text>
              <v-card-text
                >{{ transaction.product.name }} R${{
                  transaction.product.price
                    .toFixed(2)
                    .toString()
                    .replace(/\./, ",")
                }}
                <v-card-subtitle>
                  {{ transaction.product.uri }}
                </v-card-subtitle>
                <p>{{ transaction.product.description }}</p>
              </v-card-text>
            </v-col>
            <v-col>
              <v-card-text
                >Valor: R${{
                  transaction.price.toFixed(2).toString().replace(/\./, ",")
                }}</v-card-text
              >
              <v-card-text
                >Nome do comprador: {{ transaction.buyerName }}</v-card-text
              >
              <v-card-text v-if="transaction.sellerName"
                >Nome do comprador: {{ transaction.sellerName }}</v-card-text
              >
              <v-card-text>Comissão: {{ transaction.comission }}</v-card-text>
              <v-card-text>Status: {{ transaction.status }}</v-card-text>
              <v-card-text>Ações: {{ transaction.actions }}</v-card-text>
            </v-col>
            <v-col>
              <img
                class="image-right"
                :src="transaction.product.image_path"
                alt=""
                width="200"
                height="100%"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("partner", ["transactions"]),
  },
};
</script>

<style>
.display-relative {
  position: relative;
}
.display-relative .image-right {
  position: absolute;
  right: 0;
  top: 0;
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
}
</style>
