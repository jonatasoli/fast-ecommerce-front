<template>
  <v-container>
    <NavBar />
    <v-container v-if="shopping_cart.length > 0">
      <v-row
        class="d-flex flex-row justify-center align-center xs-12 sm-10 md-8"
      >
        <v-col class="md-12">
          <v-card color="blue-grey darken-4">
            <v-card-title>Carrinho de Compras</v-card-title>
            <v-card-subtitle></v-card-subtitle>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Item:</th>
                      <th scope="col">Preço Unitário:</th>
                      <th scope="col">Quantidade:</th>
                      <th scope="col">Total:</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in shopping_cart" :key="item.product_id">
                      <th scope="row">#</th>
                      <td>{{ item.product_name }}</td>
                      <td>{{ formatCurrency(item.amount / 100) }}</td>
                      <td>
                        <span>{{ item.qty }}</span>
                      </td>
                      <td>{{ formatCurrency(getPrice(item)) }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <td >Frete</td>
                      <td></td>
                      <td></td>
                      <td v-if="shippingPrice === -1">-</td>
                      <td v-else-if="shippingPrice === 0">Frete Grátis</td>
                      <td v-else>{{ formatCurrency(shippingPrice / 100) }}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <th scope="row">Total a pagar</th>
                      <td></td>
                      <td></td>
                      <td>{{ formatCurrency(totalPrice) }}</td>
                    </tr>
                    <tr>
                      <th scope="row"></th>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-alert dense type="info"
        >Seu carrinho está vazio no momento volte para fazer suas
        compras!</v-alert
      >
    </v-container>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import NavBar from "@/resources/product/components/Header.vue";
import FormatCurrencyMixin from "@/mixins/format-currency";

const { mapActions, mapState, mapGetters } = createNamespacedHelpers("product");

export default {
  name: "ShoppingCart",
  mixins: [FormatCurrencyMixin],
  components: {
    NavBar,
  },
  data() {
    return {
      shopping_cart: this.getShoppingCart(),
    };
  },
  computed: {
    ...mapState({
      totalPrice: "totalPrice",
      shippingPrice: "shippingPrice",
    }),
  },
  methods: {
    ...mapGetters(["getShoppingCart"]),
    ...mapActions([
      "resetShoppingCart",
      "increaseProduct",
      "decrementProduct",
      "addShoppingCart",
    ]),
    getPrice(item) {
      console.log(item);
      return (item.amount * item.qty) / 100;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.shopping_cart = vm.getShoppingCart();
    });
  },
};
</script>
