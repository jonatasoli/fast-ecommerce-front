<template>
  <v-app>
    <NavBar />
    <div v-if="!user" class="box-container">
      <v-container>
        <h1>Faça login ou Cadastre-se</h1>
      </v-container>
    </div>
    <div v-else>
      <div v-if="myOrders.length <= 0" class="box-container">
        <v-container>
          <h1>Nenhum pedido encontrado</h1>
        </v-container>
      </div>
      <div v-for="(order, index) in myOrders" :key="order.order_id" v-else>
        <v-container class="box-cards">
          <v-card class="mx-auto" width="auto">
            <v-card-title class="text-h5 font-weight-bold orange--text">
              Pedido {{ order.order_id }}
              <v-spacer></v-spacer>
              <div v-if="order.tracking_number != null">
                <span
                  >Seu pedido foi enviado! Código de Rastreio:
                  {{ order.tracking_number }}</span
                >
              </div>
              <div v-else-if="order.status == 'paid'">
                <span>Pagamento Aprovado</span>
              </div>
              <div v-else-if="order.status == 'refused'">
                <span>Pagamento Recusado</span>
              </div>
              <div v-else>
                <span>Aguardando Pagamento</span>
              </div>
            </v-card-title>
            <div
              v-for="(product, index) in order.products"
              :key="index"
              class="d-flex justify-space-evelyn ml-5 mt-5"
            >
              <v-img max-width="100" max-height="100" :src="product.image_path"></v-img>
              <v-card-subtitle>{{ product.product_name }}</v-card-subtitle>
            </div>
            <v-card-actions>
              <v-btn icon @click="selectedIndex = index">
                <v-icon large>
                  {{
                    index === selectedIndex ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon
                >
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="index === selectedIndex">
                <div class="d-flex">
                  <div class="payment">
                    <h3 class="title-box">total pago</h3>
                    <span class="content_box">
                      Subtotal: {{ formatCurrency(getTotalPrice(order.products)) }}<br />
                      Frete:
                      {{
                        formatCurrency(
                          order.amount / 100 - getTotalPrice(order.products)
                        )
                      }}<br />
                      <div class="total_payment">
                        <hr />
                        Total: {{ formatCurrency(order.amount / 100) }}
                      </div>
                    </span>
                  </div>
                  <div class="box-address">
                    <h3 class="title-box">endereço</h3>
                    <span class="user_name">{{ order.user_name }}</span
                    ><br />
                    <span class="content_box">
                      {{ order.street }}, {{ order.street_number }},
                      {{ order.neighborhood }}, {{ order.city }}, {{ order.state }}.
                      {{ order.zipcode }}
                    </span>
                  </div>
                </div>
              </div>
            </v-expand-transition>
          </v-card>
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script>
import NavBar from "@/components/shared/NavBar.vue";
import FormatCurrencyMixin from "@/mixins/format-currency";
import GetTotalPrice from "@/mixins/get-total-price.js";
import { mapState, mapActions } from "vuex";
export default {
  mixins: [FormatCurrencyMixin, GetTotalPrice],
  components: { NavBar },
  data() {
    return {
      show: false,
      selectedIndex: null,
      user: localStorage.getItem("user_data"),
    };
  },
  computed: {
    ...mapState("user", ["myOrders"]),
  },
  mounted() {
    const document = JSON.parse(this.user)["document"];
    this.setMyOrders(document);
  },
  methods: {
    ...mapActions("user", ["setMyOrders"]),
  },
};
</script>

<style scoped>
.box-container {
  height: 80vh;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
}
.box-cards {
  margin-top: 50px;
}

.box-expand {
  display: flex;
  justify-content: center;
  align-items: start;
}

.box-address,
.payment {
  margin: 20px;
}

.title-box {
  font-size: 22px;
  color: rgb(168, 167, 167);
}

.box-address .user_name {
  font-weight: 800;
  font-size: 20px;
}

.content_box {
  font-size: 20px;
  display: block;
  width: 300px;
  word-wrap: break-word;
}

.total_payment {
  font-size: 22px;
  font-weight: 900;
}
</style>
