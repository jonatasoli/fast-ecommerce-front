<template>
  <v-container class="section">
    <v-snackbar v-model="showSnackbar" top>
      {{ error }}
      <v-btn color="pink" text icon @click="showSnackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-form
      ref="form"
      v-model="transaction"
      align="center"
      justify="center"
      @submit.prevent="onSubmit"
    >
      <v-text-field
        label="Documento"
        placeholder="Apenas números"
        prepend-inner-icon="fa-id-card"
        v-model.trim="$v.transaction.document.$model"
        :error-messages="documentErrors"
        :success="$v.transaction.document.$invalid"
      ></v-text-field>
      <v-text-field
        label="e-mail"
        placeholder="email@email.com"
        prepend-inner-icon="fa-envelope"
        v-model="$v.transaction.mail.$model"
        :error-messages="emailErrors"
        :success="$v.transaction.mail.$invalid"
      ></v-text-field>
      <v-text-field
        label="Telefone"
        placeholder="Apenas números"
        prepend-inner-icon="fa-phone"
        v-model="$v.transaction.phone.$model"
        :error-messages="phoneErrors"
        :success="$v.transaction.phone.$invalid"
        type="number"
      ></v-text-field>
      <v-text-field
        label="Senha"
        prepend-inner-icon="fa-lock"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        @click:append="show1 = !show1"
        v-model="$v.transaction.password.$model"
        :error-messages="passwordErrors"
        :success="$v.transaction.password.$invalid"
      ></v-text-field>

      <v-subheader>Endereço de cobrança</v-subheader>
      <v-text-field
        label="Nome"
        placeholder="Seu nome completo"
        v-model="$v.transaction.name.$model"
        :error-messages="nameErrors"
        :success="$v.transaction.name.$invalid"
      ></v-text-field>
      <v-text-field
        label="Endereço"
        placeholder="Ex:. Rua Barão de Mauá"
        v-model="$v.transaction.address.$model"
        :error-messages="addressErrors"
        :success="$v.transaction.address.$invalid"
      ></v-text-field>
      <v-text-field
        label="Número"
        placeholder="Ex:. 33"
        v-model="$v.transaction.address_number.$model"
        :error-messages="addressNumberErrors"
        :success="$v.transaction.address_number.$invalid"
      ></v-text-field>
      <v-text-field
        label="Complemento"
        placeholder="Ex:. Ao lado da igreja"
        v-model="$v.transaction.address_complement.$model"
        :error-messages="addressComplementErrors"
        :success="$v.transaction.address_complement.$invalid"
      ></v-text-field>
      <v-text-field
        label="Bairro"
        placeholder="Ex:. Jardim Cruzeiro"
        v-model="$v.transaction.neighborhood.$model"
        :error-messages="neighborhoodErrors"
        :success="$v.transaction.neighborhood.$invalid"
      ></v-text-field>
      <v-text-field
        label="Cidade"
        placeholder="Ex:. São Paulo"
        v-model="$v.transaction.city.$model"
        :error-messages="cityErrors"
        :success="$v.transaction.city.$invalid"
      ></v-text-field>
      <v-select
        :items="state_select"
        item-text="name"
        item-value="value"
        label="Estado"
        v-model="$v.transaction.state.$model"
        :error-messages="stateErrors"
        :success="$v.transaction.state.$invalid"
      ></v-select>
      <v-select
        :items="country_select"
        item-text="name"
        item-value="value"
        label="País"
        v-model="$v.transaction.country.$model"
        :error-messages="countryErrors"
        :success="$v.transaction.country.$invalid"
      ></v-select>
      <v-text-field
        label="Cep"
        v-model="$v.transaction.zip_code.$model"
        :error-messages="zipCodeErrors"
        :success="$v.transaction.zip_code.$invalid"
      ></v-text-field>

      <v-switch
        v-model="$v.transaction.shipping_is_payment.$model"
        :error-messages="shippingErrors"
        :success="$v.transaction.shipping_is_payment.$invalid"
        class="ma-2"
        label="Endereço de cobrança é o mesmo de envio?"
      >
      </v-switch>

      <div v-if="!transaction.shipping_is_payment">
        <v-subheader>Endereço de envio</v-subheader>
        <v-text-field
          label="Nome"
          placeholder="Seu nome completo"
          v-model="$v.transaction.ship_name.$model"
          :error-messages="shipNameErrors"
          :success="$v.transaction.ship_name.$invalid"
        ></v-text-field>
        <v-text-field
          label="Endereço"
          placeholder="Ex:. Rua Barão de Mauá"
          v-model="$v.transaction.ship_address.$model"
          :error-messages="shipAddressErrors"
          :success="$v.transaction.ship_address.$invalid"
        ></v-text-field>
        <v-text-field
          label="Número"
          placeholder="Ex:. 33"
          v-model="$v.transaction.ship_address_number.$model"
          :error-messages="shipAddressNumberErrors"
          :success="$v.transaction.ship_address_number.$invalid"
        ></v-text-field>
        <v-text-field
          label="Complemento"
          placeholder="Ex:. Ao lado da igreja"
          v-model="$v.transaction.ship_address_complement.$model"
          :error-messages="shipAddressComplementErrors"
          :success="$v.transaction.ship_address_complement.$invalid"
        ></v-text-field>
        <v-text-field
          label="Bairro"
          placeholder="Ex:. Jardim Cruzeiro"
          v-model="$v.transaction.ship_neighborhood.$model"
          :error-messages="shipNeighborhoodErrors"
          :success="$v.transaction.ship_neighborhood.$invalid"
        ></v-text-field>
        <v-text-field
          label="Cidade"
          placeholder="Ex:. São Paulo"
          v-model="$v.transaction.ship_city.$model"
          :error-messages="shipCityErrors"
          :success="$v.transaction.ship_city.$invalid"
        ></v-text-field>
        <v-select
          :items="state_select"
          item-text="name"
          item-value="value"
          label="Estado"
          v-model="$v.transaction.ship_state.$model"
          :error-messages="shipStateErrors"
          :success="$v.transaction.ship_state.$invalid"
        ></v-select>
        <v-select
          :items="country_select"
          item-text="name"
          item-value="value"
          label="País"
          v-model="$v.transaction.ship_country.$model"
          :error-messages="shipCountryErrors"
          :success="$v.transaction.ship_country.$invalid"
        ></v-select>
        <v-text-field
          label="Cep"
          v-model="$v.transaction.ship_zip_code.$model"
          :error-messages="shipZipCodeErrors"
          :success="$v.transaction.ship_zip_code.$invalid"
        ></v-text-field>
      </div>

      <v-subheader>Forma de pagamento</v-subheader>
      <p>{{ transaction.payment_method }}</p>
      <v-radio-group
        v-model="$v.transaction.payment_method.$model"
        :error-messages="paymentMethodErrors"
        :success="$v.transaction.payment_method.$invalid"
      >
        <v-radio label="Cartão de Crédito" value="credit-card"> </v-radio>
        <v-radio label="Boleto" value="slip-bank"> </v-radio>
      </v-radio-group>

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
          :success="$v.transaction.credit_card_name.$invalid"
        ></v-text-field>
        <v-text-field
          label="Número do Cartão"
          placeholder="Apenas Números"
          prepend-inner-icon="fa-credit-card"
          v-model="$v.transaction.credit_card_number.$model"
          :error-messages="creditCardNumberErrors"
          :success="$v.transaction.credit_card_number.$invalid"
        ></v-text-field>
        <v-text-field
          label="CVV"
          placeholder="Ex:. 123"
          prepend-inner-icon="fa-key"
          v-model="$v.transaction.credit_card_cvv.$model"
          :error-messages="creditCardCVVErrors"
          :success="$v.transaction.credit_card_cvv.$invalid"
        ></v-text-field>

        <v-dialog
          ref="dateDialog"
          :return-value.sync="transaction.credit_card_validate"
          v-model="showDateDialog"
          persistent
          lazy
          width="290px"
          full-width
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
            <v-btn text @click="showDateDialog = false">Fechar</v-btn>
            <v-btn text @click="$refs.dateDialog.save(dateDialogValue)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-dialog>

        <v-select
          :items="pageProduct.installments_list"
          item-text="name"
          item-value="value"
          label="Parcelas"
          v-model="$v.transaction.installments.$model"
          :success="$v.transaction.installments.$invalid"
        ></v-select>
      </div>
      <p>* valor com taxa de juros de 1.99% ao mês</p>
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
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
const validateDocument = (value) => value.length == 11 || value.length == 14;
const validateZipCode = (value) => value.length == 8;
const validateCVV = (value) => value.length >= 3 || value.length <= 4;

import {
  required,
  requiredIf,
  minLength,
  numeric,
  email,
} from "vuelidate/lib/validators";
import moment from "moment";

export default {
  props: ["cupom", "affiliate"],
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
        payment_method: "",
        shopping_cart: ["1"],
        credit_card_name: "",
        credit_card_number: "",
        credit_card_cvv: "",
        credit_card_validate: new Date(),
        installments: "",
      },
      hasError: false,
      showDateDialog: false,
      installments_select: [
        { value: 1, name: "1 sem juros" },
        { value: 2, name: "2 com juros" },
      ],
      country_select: [{ value: "br", name: "Brasil" }],
      country_select: [{ value: "pt", name: "Portugal" }],
      state_select: [
        { value: "São Paulo", name: "São Paulo" },
        { value: "Acre", name: "Acre" },
        { value: "Alagoas", name: "Alagoas" },
        { value: "Amapá", name: "Amapá" },
        { value: "Amazonas", name: "Amazonas" },
        { value: "Bahia", name: "Bahia" },
        { value: "Ceará", name: "Ceará" },
        { value: "Espírito Santo", name: "Espírito Santo" },
        { value: "Goiás", name: "Goiás" },
        { value: "Maranhão", name: "Maranhão" },
        { value: "Mato Grosso", name: "Mato Grosso" },
        { value: "Mato Grosso do Sul", name: "Mato Grosso do Sul" },
        { value: "Minas Gerais", name: "Minas Gerais" },
        { value: "Pará", name: "Pará" },
        { value: "Paraná", name: "Paraná" },
        { value: "Paraíba", name: "Paraíba" },
        { value: "Pernambuco", name: "Pernambuco" },
        { value: "Piauí", name: "Piauí" },
        { value: "Rio de Janeiro", name: "Rio de Janeiro" },
        { value: "Rio Grande do Norte", name: "Rio Grande do Norte" },
        { value: "Rio Grande do Sul", name: "Rio Grande do Sul" },
        { value: "Rondônia", name: "Rondônia" },
        { value: "Roraima", name: "Roraima" },
        { value: "Santa Catarina", name: "Santa Catarina" },
        { value: "Sergipe", name: "Sergipe" },
        { value: "Tocantins", name: "Tocantins" },
        { value: "Distrito Federal", name: "Distrito Federal" },
      ],
    };
  },
  computed: {
    ...mapState({
      direct_sales: "direct_sales",
      pageProduct: "product",
      Cart: "shopping_cart",
    }),
    formattedDate() {
      return moment(this.transaction.credit_card_validate).format("MM/YYYY");
    },
    formattedDateOutput() {
      return moment(this.transaction.credit_card_validate).format("MMYY");
    },
    ...mapGetters({
      cartTotal: "totalCart",
      getShoppingCart: "getShoppingCart",
    }),
     emailErrors() {
      const errors = [];
      const email = this.$v.transaction.mail;
      if (!email.$dirty) {
        return errors;
      }
      !email.required && errors.push("Email é obrigatório!");
      !email.email && errors.push("Insira um email válido!");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      const phone = this.$v.transaction.phone;
      if (!phone.$dirty) {
        return errors;
      }
      !phone.required && errors.push("Este campo é obrigatório!");
      !phone.numeric && errors.push("Utilize apenas números");
      !phone.minLength &&
        errors.push(
          `Insira pelo menos ${phone.$params.minLength.min} caracteres!`
        );
      return errors;
    },
    passwordErrors() {
      const errors = [];
      const password = this.$v.transaction.password;
      if (!password.$dirty) {
        return errors;
      }
      !password.required && errors.push("Senha é obrigatória!");
      !password.minLength &&
        errors.push(
          `Insira pelo menos ${password.$params.minLength.min} caracteres!`
        );
      return errors;
    },
    documentErrors() {
      const errors = [];
      const document = this.$v.transaction.document;
      if (!document.$dirty) {
        return errors;
      }
      !document.required && errors.push("Este campo é obrigatório!");
      !document.numeric && errors.push("Utilize apenas números");
      !document.validateDocument &&
        errors.push("CPF deve ter 11 ou CNPJ com 14 digitos");
      return errors;
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
    addressErrors() {
      const errors = [];
      const address = this.$v.transaction.address;
      if (!address.$dirty) {
        return errors;
      }
      !address.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
    addressNumberErrors() {
      const errors = [];
      const address_number = this.$v.transaction.address_number;
      if (!address_number.$dirty) {
        return errors;
      }
      !address_number.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
    addressComplementErrors() {
      const errors = [];
      const address_complement = this.$v.transaction.address_complement;
      if (!address_complement.$dirty) {
        return errors;
      }
      !address_complement.minLength &&
        errors.push("O campo precisa ter no mínimo uma frase");
      return errors;
    },
    neighborhoodErrors() {
      const errors = [];
      const field = this.$v.transaction.neighborhood;
      if (!field.$dirty) {
        return errors;
      }
      !field.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
    cityErrors() {
      const errors = [];
      const field = this.$v.transaction.city;
      if (!field.$dirty) {
        return errors;
      }
      !field.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
    stateErrors() {
      const errors = [];
      const field = this.$v.transaction.state;
      if (!field.$dirty) {
        return errors;
      }
      !field.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
    countryErrors() {
      const errors = [];
      const field = this.$v.transaction.country;
      if (!field.$dirty) {
        return errors;
      }
      !field.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
    zipCodeErrors() {
      const errors = [];
      const field = this.$v.transaction.zip_code;
      if (!field.$dirty) {
        return errors;
      }
      !field.required && errors.push("Este campo é obrigatório!");
      !field.numeric && errors.push("Utilize apenas números");
      !field.validateZipCode && errors.push("CEP deve ter 8 digitos");
      return errors;
    },
    shippingErrors() {
      const errors = [];
      const field = this.$v.transaction.shipping_is_payment;
      if (!field.$dirty) {
        return errors;
      }
      !field.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
    shipNameErrors() {
      const errors = [];
      const name = this.$v.transaction.ship_name;
      if (!name.$dirty) {
        return errors;
      }
      !name.required && errors.push("Nome é obrigatório!");
      return errors;
    },
    shipAddressErrors() {
      const errors = [];
      const address = this.$v.transaction.ship_address;
      if (!address.$dirty) {
        return errors;
      }
      !address.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
    shipAddressNumberErrors() {
      const errors = [];
      const address_number = this.$v.transaction.ship_address_number;
      if (!address_number.$dirty) {
        return errors;
      }
      !address_number.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
    shipAddressComplementErrors() {
      const errors = [];
      const address_complement = this.$v.transaction.ship_address_complement;
      if (!address_complement.$dirty) {
        return errors;
      }
      !address_complement.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
    shipNeighborhoodErrors() {
      const errors = [];
      const field = this.$v.transaction.ship_neighborhood;
      if (!field.$dirty) {
        return errors;
      }
      !field.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
    shipCityErrors() {
      const errors = [];
      const field = this.$v.transaction.ship_city;
      if (!field.$dirty) {
        return errors;
      }
      !field.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
    shipStateErrors() {
      const errors = [];
      const field = this.$v.transaction.ship_state;
      if (!field.$dirty) {
        return errors;
      }
      !field.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
    shipCountryErrors() {
      const errors = [];
      const field = this.$v.transaction.ship_country;
      if (!field.$dirty) {
        return errors;
      }
      !field.required && errors.push("Este campo é obrigatório!");
      return errors;
    },
    shipZipCodeErrors() {
      const errors = [];
      const field = this.$v.transaction.ship_zip_code;
      if (!field.$dirty) {
        return errors;
      }
      !field.required && errors.push("Este campo é obrigatório!");
      !field.numeric && errors.push("Utilize apenas números");
      !field.validateZipCode && errors.push("CEP deve ter 8 digitos");
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
  methods: {
    ...mapActions(["postCheckout"]),
    onSubmit() {
      this.isLoading = true;
      try {
        const _transaction = Object.assign({}, this.transaction);
        const _product = this.getShoppingCart[0];
        console.log(_product);
        const _shopping_cart = [
          {
            total_amount: this.cartTotal,
            installments: _transaction.installments,
            itens: [
              {
                amount: _product.price,
                qty: 1,
                product_id: _product.id,
                product_name: _product.name,
                affiliate: this.affiliate,
                tangible: true,
              },
            ],
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
};
// Todo
// 2 - Validações
// 3 - Forma de pagamento
// 4 - Comprar
</script>

<style scoped lang="sass">
$color: #fff
</style>
