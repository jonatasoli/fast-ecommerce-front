<template>
  <v-container class="section">
    <v-container>
      <v-snackbar v-model="showSnackbar" top>
        {{ error }}
        <v-btn color="pink" text icon @click="showSnackbar = false">
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
        <div>
          <v-subheader>Forma de pagamento</v-subheader>

          <v-select
            :items="payment_method_select"
            id="payment_method"
            item-text="name"
            item-value="value"
            label="Metodo de pagamento"
            v-model="payment_method"
          ></v-select>
          <div v-if="transaction.payment_method == 'credit-card'">
            <v-subheader>Cartões aceitos</v-subheader>
            <v-icon fas fa-cc-visa></v-icon>
            <v-icon fas fa-cc-amex style="color: blue"></v-icon>
            <v-icon fas fa-cc-mastercard style="color: red"></v-icon>
            <v-icon fas fa-cc-discover style="color: orange"></v-icon>

            <v-text-field
              label="Nome do Cartão"
              placeholder="João D Silva"
              prepend-inner-icon="fa-id-badge"
              v-model="$v.transaction.credit_card_name.$model"
              :error-messages="creditCardNameErrors"
              :success="!$v.transaction.credit_card_name.$invalid"
              :error="$v.transaction.credit_card_name.$invalid"
            ></v-text-field>
            <v-text-field
              label="Número do Cartão"
              placeholder="Apenas Números"
              prepend-inner-icon="fa-credit-card"
              v-model="$v.transaction.credit_card_number.$model"
              :error-messages="creditCardNumberErrors"
              :success="!$v.transaction.credit_card_number.$invalid"
              :error="$v.transaction.credit_card_number.$invalid"
            ></v-text-field>
            <v-text-field
              label="CVV"
              placeholder="Ex:. 123"
              prepend-inner-icon="fa-key"
              v-model="$v.transaction.credit_card_cvv.$model"
              :error-messages="creditCardCVVErrors"
              :success="!$v.transaction.credit_card_cvv.$invalid"
              :error="$v.transaction.credit_card_cvv.$invalid"
            ></v-text-field>

            <v-dialog
              ref="dateDialog"
              :return-value.sync="transaction.credit_card_validate"
              v-model="showDateDialog"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  name="date"
                  label="Validade do Cartão"
                  prepend-inner-icon="fa-calendar"
                  v-model="formattedDate"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="pt-br"
                scrollable
                type="month"
                v-model="dateDialogValue"
              >
                <v-spacer></v-spacer>
                <v-btn flat @click="showDateDialog = false">Fechar</v-btn>
                <v-btn flat @click="$refs.dateDialog.save(dateDialogValue)">OK</v-btn>
              </v-date-picker>
            </v-dialog>

            <v-select
              :items="installments_select_local"
              item-text="name"
              item-value="value"
              label="Parcelas"
              v-model="installment"
            ></v-select>
          </div>
          <p>* valor a partir da quarta parcela com taxa de juros de 1.99% ao mês</p>
        </div>
        <v-btn color="#46cb18" dark large @click.prevent="onSubmit">
          Comprar
          <v-spacer></v-spacer>
          <v-icon>fa-money-bill-alt</v-icon>
        </v-btn>
      </v-form>
      <v-progress-linear
        v-show="isLoading"
        indeterminate
        color="yellow darken-2"
      ></v-progress-linear>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
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

import CheckoutUserFields from "@/resources/shopping-cart/components/CheckoutUserFields.vue";
import CheckoutShippingFields from "@/resources/shopping-cart/components/CheckoutShippingFields.vue";
import moment from "moment";
/* No leave da pagina tem que zerar o totalPrice e shippingPrice */
export default {
  props: ["cupom", "affiliate"],
  components: {
    CheckoutUserFields,
    CheckoutShippingFields,
  },
  data() {
    return {
      isLoading: false,
      showSnackbar: false,
      show1: false,
      error: undefined,
      valid: undefined,
      payment_method: "credit-card",
      installments_select_local: [{ name: "1 x", value: 1 }],
      installment: 1,
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
      // installments_select: [
      //   { value: 1, name: "1 sem juros" },
      //   { value: 2, name: "2 com juros" },
      // ],
      installments_select: this.getInstallments(),
      payment_method_select: [
        { name: "Cartão de Crédito", value: "credit-card" },
        { name: "Boleto", value: "slip-payment" },
      ],
      country_select: [{ value: "br", name: "Brasil" }],
      shopping_cart: [],
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
          console.log("ShipIsPayment ", this.transaction.shipping_is_payment === false);
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
          console.log("requiredif creditcart ", !this.payment_method == "credit-card");
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
  watch: {
    payment_method() {
      this.$emit("payment-method", this.payment_method);
    },
    installment() {
      console.log("emitindo evendo ", this.installment);
      this.$emit("installment-select", this.installment);
    },
  },
  computed: {
    ...mapState({
      direct_sales: "direct_sales",
      pageProduct: "product",
      Cart: "shopping_cart",
    }),
    ...mapState("cart", {
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
    nameErrors() {
      const errors = [];
      const name = this.$v.transaction.name;
      if (!name.$dirty) {
        return errors;
      }
      !name.required && errors.push("Nome é obrigatório!");
      return errors;
    },
    paymentMethodErrors() {
      const errors = [];
      const field = this.$v.transaction.payment_method;
      if (!field.$dirty) {
        return errors;
      }
      !field.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
    creditCardNameErrors() {
      const errors = [];
      const field = this.$v.transaction.credit_card_name;
      if (!field.$dirty) {
        return errors;
      }
      !field.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
    creditCardNumberErrors() {
      const errors = [];
      const field = this.$v.transaction.credit_card_number;
      if (!field.$dirty) {
        return errors;
      }
      !field.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
    creditCardCVVErrors() {
      const errors = [];
      const field = this.$v.transaction.credit_card_cvv;
      if (!field.$dirty) {
        return errors;
      }
      !field.required && errors.push("Este campo é obrigatório!");
      !field.numeric && errors.push("Utilize apenas números");
      !field.validateCVV && errors.push("CEP deve ter 8 digitos");
      return errors;
    },
    installmentsErrors() {
      const errors = [];
      const field = this.$v.transaction.installments;
      if (!field.$dirty) {
        return errors;
      }
      !field.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
  },
  methods: {
    ...mapGetters({
      cartTotal: "totalCart",
      getShoppingCart: "getShoppingCart",
    }),
    ...mapGetters("cart", ["getInstallments", "getShoppingCart"]),
    ...mapActions("cart", ["getAsyncInstallment", "setInstallments", "addShoppingCart"]),
    ...mapActions(["postCheckout"]),
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
        const _transaction = Object.assign({}, this.transaction);
        
        const _cart = this.getShoppingCart();
        const _total = this.Cart[0].price;
        _transaction.installments = this.installment
        const _shopping_cart = [
          {
            total_amount: _total,
            installments: this.installment,
            itens: _cart,
          },
        ];
        _transaction.shopping_cart = _shopping_cart;
        _transaction.credit_card_validate = this.formattedDateOutput;
        const _affiliate = this.affiliate;
        const _cupom = this.cupom;
        console.log("Instalmennts", this.installment);
        console.log("ShoppingCart", _shopping_cart);
        console.log("Formulario ", _transaction);
        console.log("Affliate ", _affiliate);
        console.log("Cupom ", _cupom);
        console.log("Total ", _total);
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
        if (this.$v.$invalid)
          throw "Formulário inválido, por favor verifique os campos e tente novamente!";

        this.postCheckout(checkout);
        this.$router.push("/pagamento-processado");
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
  async mounted() {
    const _product = this.Cart[0];
        console.log(_product);
        const cart_item = {
          amount: _product.price,
          qty: 1,
          product_id: _product.id,
          product_name: _product.name,
          image_path: _product.image_path,
          affiliate: this.afilliate,
          tangible: true,
        };
        this.addShoppingCart(cart_item);
    console.log("MOUNT2 ", this.installments_select_local);
    await this.setInstallments();
    this.installments_select_local = this.getInstallments();
    console.log("MOUNT2 ", this.installments_select_local);
  },
  async updated() {
    console.log("updated");
    console.log(this.installment);
    await this.$emit("installment-select", this.installment);
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.installment = 1;
      vm.installments_select = vm.getInstallments();
      console.log("COISA", vm.installments_select);
    });
  },
};
</script>
