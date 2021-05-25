<template>
  <v-app>
    <NavBar />
    <v-container v-if="shopping_cart.length > 0" class="container">
      <v-row class="d-flex flex-row justify-center align-center xs-12 sm-10 md-8">
        <v-col class="md-12">
          <v-card>
            <v-card-title>Calcular Frete</v-card-title>
            <v-card-text>
              <v-alert info v-if="shippingPrice === -2"
                >Cep incorreto, verifique se usou apenas números e no máximo 8
                números!</v-alert
              >
              <div class="calc_shipping">
                <v-text-field
                  label="Insira o Frete"
                  :rules="rules"
                  hide-details="auto"
                  v-model="shipping"
                  type="text"
                ></v-text-field>
                <v-btn color="light green" @click="calcShipping()">
                  Calcular Frete
                  <v-icon>fa-truck</v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
          <v-card color="blue-grey darken-4">
            <v-card-title>Carrinho de Compras</v-card-title>
            <v-card-subtitle></v-card-subtitle>
            <v-card-text>
              <div v-for="item in shopping_cart" :key="item.product_id">
                <div class="cart">
                  <v-img max-height="80" max-width="80" :src="item.image_path"></v-img>
                  <h2 class="product_name">{{ item.product_name }}</h2>
                  <div class="items">
                    <div class="quantity">
                      <v-btn class="mx-2" fab dark small @click="decrementProduct(item)">
                        <v-icon dark>fa-minus-circle</v-icon>
                      </v-btn>
                      <span>{{ item.qty }}</span>
                      <v-btn class="mx-2" fab dark small @click="increaseProduct(item)">
                        <v-icon dark>fa-plus-circle</v-icon>
                      </v-btn>
                    </div>
                    <h3 class="price_item">{{ formatCurrency(getPrice(item)) }}</h3>
                  </div>
                <v-btn text @click="removeShoppingCart(item)"><v-icon>mdi-delete</v-icon>excluir</v-btn>
                </div>
                <hr />
              </div>
              <div class="shipping">
                <h3>Frete:</h3>
                <span v-if="shippingPrice === -1">-</span>
                <span v-else-if="shippingPrice === 0">Frete Grátis</span>
                <span v-else-if="shippingPrice === -2">Cep Incorreto!</span>
                <span v-else>{{ formatCurrency(shippingPrice / 100) }}</span>
              </div>
              <div class="total_price">
                <h3>Total:</h3>
                <span>{{ formatCurrency(getTotalPrice) }}</span>
              </div>
              <div class="empty_cart">
                <v-btn @click="empyCart">
                  Limpar Carrinho
                  <v-icon>fa-shopping-cart</v-icon>
                </v-btn>
              </div>
            </v-card-text>
            <v-card-actions class="d-flex justify-space-between align-center">
              <v-btn @click="goToCheckout" :disabled="isDisabled" color="light-green">
                Ir para pagamento
                <v-icon dark>fa-dollar-sign</v-icon>
              </v-btn>
              <v-spacer />
              <v-btn color="blue darken-1" @click="goToShowcase"
                >Continuar comprando</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-alert dense type="info">Seu carrinho está vazio no momento!</v-alert>
    </v-container>
  </v-app>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import NavBar from "@/components/shared/NavBar.vue";
import FormatCurrencyMixin from "@/mixins/format-currency";

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("cart");

export default {
  name: "ShoppingCart",
  mixins: [FormatCurrencyMixin],
  components: {
    NavBar,
  },
  data() {
    return {
      rules: [
        (value) => !!value || "Frete é necessário para processeguir!",
        (value) =>
          (value && value.length <= 8) || "Frete precisa ter 8 digitos e apenas números",
      ],
      shopping_cart: this.getShoppingCart(),
      shipping: "",
    };
  },
  computed: {
    ...mapState({ shippingPrice: "shippingPrice" }),
    getTotalPrice() {
      let price = 0;
      console.log(price);
      console.log("CART SHOPPING", this.shopping_cart);
      console.log("PRICE SH", this.shippingPrice);
      this.shopping_cart.forEach(function (value) {
        price += value.amount * value.qty;
        console.log("Total ", price);
      });
      if (this.shippingPrice > 0) {
        return price / 100 + this.shippingPrice / 100;
      }
      return price / 100;
    },
    isDisabled() {
      if (this.shippingPrice === -1) {
        return true;
      } else if (this.shippingPrice === -2) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapGetters(["getShoppingCart"]),
    ...mapActions([
      "resetShoppingCart",
      "increaseProduct",
      "decrementProduct",
      "addShoppingCart",
      "removeShoppingCart",
      "setTotalPrice",
      "setShippingPrice",
      "setZipCode",
      "setInstallments",
      "postCalculateShipping",
    ]),
    async calcShipping() {
      console.log(this.shipping);
      const sh = await this.postCalculateShipping({
        shipping: this.shipping,
        cart: this.shopping_cart,
      });
      console.log("SHIPP", sh);
    },
    isSmallZero(currentValue) {
      return currentValue <= 0;
    },
    goToCheckout() {
      let _total = this.shopping_cart;
      let _qty = this.shopping_cart.map((product) => product.qty);
      console.log("TOTRAL", _total);
      console.log(_qty);
      if (_qty.some(this.isSmallZero)) {
        return alert("Adicione uma quantidade maior que 0");
      } else {
        this.setShippingPrice(this.shippingPrice);
        this.setTotalPrice(this.getTotalPrice);
        this.setZipCode(this.shipping);
        this.setInstallments(this.shopping_cart);
        this.$router.push({ name: "Checkout" });
      }
    },
    goToShowcase() {
      this.$router.push({ name: "Showcase" });
    },
    getPrice(item) {
      console.log(item);
      return (item.amount * item.qty) / 100;
    },
    empyCart() {
      this.resetShoppingCart();
      this.shopping_cart = [];
      this.totalPrice = 0;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.shopping_cart = vm.getShoppingCart();
    });
  },
};
</script>
<style scoped>
.calc_shipping {
  display: flex;
  align-items: flex-end;
}

.items {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}
.product_name {
  color: white;
  margin-left: 18px;
  margin-bottom: 10px;
  width: 500px;
}
.quantity {
  justify-content: center;
  flex-wrap: wrap;
}

.quantity span {
  font-size: 16px;
}

.price_item {
  font-size: 25px;
}

.shipping {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-bottom: 15px;
}

.total_price {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
}

.total_price span,
.shipping span {
  color: white;
  font-size: 20px;
  
}

.cart {
  display: flex;
  justify-content: space-between;
  align-items: center
}

hr {
  border: 0;
  height: 2px;
  background-image: linear-gradient(to right, transparent, #ccc, transparent);
  margin: 30px;
}

.empty_cart {
  margin-left: -10px;
  margin-top: 30px;
}

@media screen and (max-width: 580px) {
  >>> .v-card__actions {
    flex-direction: column;
  }

  >>> .v-card__actions button {
    margin: 10px;
  }
}
</style>
