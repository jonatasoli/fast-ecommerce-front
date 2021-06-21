<template>
  <v-app>
    <NavBar />
    <v-row>
      <v-col sm-12 v-if="checkout_response.boleto_barcode">
        <v-card>
          <v-card-title>Pagamento Processado</v-card-title>
          <v-card-text>
            <p>O código do boleto é {{ checkout_response.boleto_barcode }}</p>
            <a v-bind:href="''">{{ checkout_response.boleto_url }}</a>
            <p>
              Após realizar o pagamento aguarde que em até 3 dias úteis será
              dado a resposta
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm-12 v-else-if="checkout_response.token">
        <v-alert type="info">Seu pagamento foi Processado!</v-alert>
        <v-alert border="right" color="blue-grey" dark>
          Seu código de pagamento é o {{ checkout_response.token }} com o status
          {{ checkout_response.payment_status }}
        </v-alert>
      </v-col>
      <v-col sm-12 v-else-if="checkout_response.detail">
        <v-card>
          <v-card-title>Houve um erro no pagamento!</v-card-title>
          <v-card-text>
            <p>
              Por favor verifique o erro abaixo e tente novamente caso o erro
              persista entrar em contato com tecnologia@graciellegatto.com.br
            </p>
            <p>{{ checkout_response.detail }}</p>
          </v-card-text>
        </v-card>
        <v-btn color="secondary" @click="$router.back()">Voltar</v-btn>
      </v-col>
      <v-col sm-12 v-else>
        <v-card>
          <v-card-title
            >Seu pagamento está sendo processados aguarde</v-card-title
          >
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import NavBar from "@/components/shared/NavBar.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("cart");
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      payment_id: "asdf",
      payment_status: "PAGO",
    };
  },
  computed: {
    ...mapState({
      checkout_response: "checkout_response",
    }),
  },
};
</script>
