<template>
  <v-container class="mt-2">
    <NavBar />
    <v-row class="mb-12 sm-12 xs-12">
      <v-col cols="12" mt="5" md="6" order="1" align="center" justify="center">
        <v-card color="#233237" dark>
          <v-card-title>Pagamento</v-card-title>
          <v-container class="section">
            <v-snackbar v-model="showSnackbar" top>
              {{ error }}
              <v-btn color="pink" @click="showSnackbar = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-snackbar>

            <v-form
              ref="form"
              v-model="valid"
              align="center"
              justify="center"
              @submit.prevent="onSubmit"
            >
              <CheckoutUserFields :transaction="transaction" />
              <CheckoutShippingFields :transaction="transaction" />
              <CheckoutBillingFields
                :transaction="transaction"
                @payment-method="paymentMethodValue"
                @installment-select="installmentSelect"
              />
              <v-btn color="#46cb18" :disabled="isDisabled" dark large @click.prevent="onSubmit">
                Comprar
                <v-spacer></v-spacer>
                <v-icon>fa-money-bill-alt</v-icon>
              </v-btn>
            </v-form>
            <v-progress-linear v-show="isLoading" indeterminate color="yellow darken-2"></v-progress-linear>
          </v-container>
          <v-card-text></v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="12" mt="5" md="4" order-sm="0" order-xs="0">
        <Order />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapActions, mapState, mapGetters } = createNamespacedHelpers("cart");
const validateDocument = (value) => value.length == 11 || value.length == 14;
const validateZipCode = (value) => value.length == 8;
const validateCVV = (value) => value.length >= 3 || value.length <= 4;

import {
  required,
  minLength,
  numeric,
  email,
  requiredIf,
} from "vuelidate/lib/validators";

import NavBar from "@/resources/shopping-cart/components/Header.vue";
import Order from "@/resources/shopping-cart/components/Order.vue";
import CheckoutUserFields from "@/resources/shopping-cart/components/CheckoutUserFields.vue";
import CheckoutShippingFields from "@/resources/shopping-cart/components/CheckoutShippingFields.vue";
import CheckoutBillingFields from "@/resources/shopping-cart/components/CheckoutBillingFields.vue";
import moment from "moment";
/* No leave da pagina tem que zerar o totalPrice e shippingPrice */
export default {
  name: "Checkout",
  components: {
    NavBar,
    Order,
    CheckoutUserFields,
    CheckoutShippingFields,
    CheckoutBillingFields,
  },
  data() {
    return {
      isLoading: false,
      showSnackbar: false,
      show1: false,
      error: undefined,
      valid: undefined,
      dateDialogValue: this.formattedDate,
      transaction: {
        document: "",
        mail: "",
        password: "",
        phone: "",
        name: "",
        address: "",
        address_number: "",
        address_complement: "",
        neighborhood: "",
        city: "",
        state: "São Paulo",
        country: "br",
        zip_code: "",
        shipping_is_payment: true,
        ship_name: "",
        ship_address: "",
        ship_address_number: "",
        ship_address_complement: "",
        ship_neighborhood: "",
        ship_city: "",
        ship_state: "São Paulo",
        ship_country: "br",
        ship_zip_code: "",
        payment_method: "credit-card",
        shopping_cart: ["1"],
        credit_card_name: "",
        credit_card_number: "",
        credit_card_cvv: "",
        credit_card_validate: new Date(),
        installments: "",
      },
      hasError: false,
      showDateDialog: false,
      installments_select: this.getInstallments(),
      country_select: [{ value: "br", name: "Brasil" }],
      shopping_cart: [],
      cupom: undefined,
    };
  },
  validations: {
    transaction: {
      document: {
        required,
        numeric,
        validateDocument,
      },
      mail: {
        email,
        required,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      name: {
        required,
      },
      phone: {
        numeric,
        minLength: minLength(11),
        required,
      },
      address: {
        required,
      },
      address_number: {
        numeric,
        required,
      },
      address_complement: {
        minLength: minLength(0),
      },
      neighborhood: {
        required,
      },
      city: {
        required,
      },
      state: {
        required,
      },
      country: {
        required,
      },
      zip_code: {
        numeric,
        validateZipCode,
        required,
      },
      shipping_is_payment: {
        required,
      },
      ship_name: {
        required: requiredIf(function () {
          console.log(
            "ShipIsPayment ",
            this.transaction.shipping_is_payment === false
          );
          return this.transaction.shipping_is_payment === false;
        }),
      },
      ship_address: {
        required: requiredIf(function () {
          return this.transaction.shipping_is_payment === false;
        }),
      },
      ship_address_number: {
        required: requiredIf(function () {
          return this.transaction.shipping_is_payment === false;
        }),
      },
      ship_address_complement: {
        required: requiredIf(function () {
          return this.transaction.shipping_is_payment === false;
        }),
      },
      ship_neighborhood: {
        required: requiredIf(function () {
          return this.transaction.shipping_is_payment === false;
        }),
      },
      ship_city: {
        required: requiredIf(function () {
          return this.transaction.shipping_is_payment === false;
        }),
      },
      ship_state: {
        required: requiredIf(function () {
          return this.transaction.shipping_is_payment === false;
        }),
      },
      ship_country: {
        required: requiredIf(function () {
          return this.transaction.shipping_is_payment === false;
        }),
      },
      ship_zip_code: {
        numeric: requiredIf(function () {
          return this.transaction.shipping_is_payment === false;
        }),
        validateZipCode: requiredIf(function () {
          return this.transaction.shipping_is_payment === false;
        }),
        required: requiredIf(function () {
          return this.transaction.shipping_is_payment === false;
        }),
      },
      payment_method: {
        required,
      },
      credit_card_name: {
        required: requiredIf(function () {
          console.log(
            "requiredif creditcart ",
            !this.payment_method == "credit-card"
          );
          return !this.payment_method == "credit-card";
        }),
      },
      credit_card_number: {
        numeric,
        required: requiredIf(function () {
          return !this.payment_method == "credit-card";
        }),
      },
      credit_card_cvv: {
        numeric,
        validateCVV,
        required: requiredIf(function () {
          return !this.payment_method == "credit-card";
        }),
      },
      credit_card_validate: {
        required: requiredIf(function () {
          return !this.payment_method == "credit-card";
        }),
      },
      installments: {
        required: requiredIf(function () {
          return !this.payment_method == "credit-card";
        }),
      },
    },
  },
  computed: {
    isDisabled() {
      let cart = this.getShoppingCart();
      console.log("BOTAO", cart);
      if (cart.length === 0) {
        return true;
      } else {
        return false;
      }
    },
    ...mapState({
      totalPrice: "totalPrice",
      shippingPrice: "shippingPrice",
      affiliate: "affiliate",
      installment: "installment",
    }),
    formattedDate() {
      return moment(this.transaction.credit_card_validate).format("MM/YYYY");
    },
    formattedDateOutput() {
      return moment(this.transaction.credit_card_validate).format("MMYY");
    },
  },
  methods: {
    ...mapGetters(["getShoppingCart", "getInstallments"]),
    ...mapActions(["resetShoppingCart", "postCheckout"]),
    paymentMethodValue(params) {
      console.log("retorno", params);
      this.transaction.payment_method = params;
    },
    installmentSelect(params) {
      console.log("retorno emit ", params);
      this.transaction.installments = params;
    },
    onSubmit() {
      this.isLoading = true;
      try {
        const _total = this.totalPrice;
        const _cart = this.getShoppingCart();
        console.log(_cart);

        const _transaction = Object.assign({}, this.transaction);
        console.log("CHECK INST", _transaction.installments);
        const _shopping_cart = [
          {
            total_amount: _total,
            installments: _transaction.installments,
            itens: _cart,
          },
        ];
        _transaction.shopping_cart = _shopping_cart;
        _transaction.credit_card_validate = this.formattedDateOutput;
        const _affiliate = this.affiliate;
        const _cupom = this.cupom;
        console.log("ShoppingCart", _shopping_cart);
        console.log("Formulario ", _transaction);
        console.log("Affliate ", _affiliate);
        console.log("Cupom ", _cupom);
        console.log("passou o pagamento");
        const checkout = {
          transaction: _transaction,
          affiliate: _affiliate,
          cupom: _cupom,
        };
        console.log(checkout);
        console.log("Invalidação ", this.$v.$invalid);
        console.log(this.$v);
        console.log("Shipping ", !_transaction.shipping_is_payment);
        if (this.$v.$invalid || _total === 0)
          throw "Formulário inválido, por favor verifique os campos e tente novamente!";

        this.postCheckout(checkout);
        this.$router.push({ name: "ShoppingPaymentProcess" });
      } catch (error) {
        console.log(error);
        if (error.message) {
          this.error = error.message;
        } else {
          this.error = error;
        }
        this.showSnackbar = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.shopping_cart = vm.getShoppingCart();
      vm.installments_select = vm.getInstallments();
      console.log("COISA", vm.installments_select);
    });
  },
};
</script>
