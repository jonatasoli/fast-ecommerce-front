<template>
  <v-container class="section">
    <v-snackbar v-model="showSnackbar" top>
      {{ error }}
      <v-btn color="pink" flat icon @click="showSnackbar = false">
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
        :success="$v.transaction.name.$invalid"
      ></v-text-field>
      <v-text-field
        label="Endereço"
        placeholder="Ex:. Rua Barão de Mauá"
        v-model="$v.transaction.address.$model"
        :success="$v.transaction.address.$invalid"
      ></v-text-field>
      <v-text-field
        label="Número"
        placeholder="Ex:. 33"
        v-model="$v.transaction.address_number.$model"
        :success="$v.transaction.address_number.$invalid"
      ></v-text-field>
      <v-text-field
        label="Complemento"
        placeholder="Ex:. Ao lado da igreja"
        v-model="$v.transaction.address_complement.$model"
        :success="$v.transaction.address_complement.$invalid"
      ></v-text-field>
      <v-text-field
        label="Bairro"
        placeholder="Ex:. Jardim Cruzeiro"
        v-model="$v.transaction.neighborhood.$model"
        :success="$v.transaction.neighborhood.$invalid"
      ></v-text-field>
      <v-text-field
        label="Cidade"
        placeholder="Ex:. São Paulo"
        v-model="$v.transaction.city.$model"
        :success="$v.transaction.city.$invalid"
      ></v-text-field>
      <v-select
        :items="state_select"
        item-text="name"
        item-value="value"
        label="Estado"
        v-model="$v.transaction.state.$model"
        :success="$v.transaction.state.$invalid"
      ></v-select>
      <v-select
        :items="country_select"
        item-text="name"
        item-value="value"
        label="País"
        v-model="$v.transaction.country.$model"
        :success="$v.transaction.country.$invalid"
      ></v-select>
      <v-text-field
        label="Cep"
        v-model="$v.transaction.zip_code.$model"
        :success="$v.transaction.zip_code.$invalid"
      ></v-text-field>

      <v-switch
        v-model="$v.transaction.shipping_is_payment.$model"
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
          :success="$v.transaction.ship_name.$invalid"
        ></v-text-field>
        <v-text-field
          label="Endereço"
          placeholder="Ex:. Rua Barão de Mauá"
          v-model="$v.transaction.ship_address.$model"
          :success="$v.transaction.ship_address.$invalid"
        ></v-text-field>
        <v-text-field
          label="Número"
          placeholder="Ex:. 33"
          v-model="$v.transaction.ship_address_number.$model"
          :success="$v.transaction.ship_address_number.$invalid"
        ></v-text-field>
        <v-text-field
          label="Complemento"
          placeholder="Ex:. Ao lado da igreja"
          v-model="$v.transaction.ship_address_complement.$model"
          :success="$v.transaction.ship_address_complement.$invalid"
        ></v-text-field>
        <v-text-field
          label="Bairro"
          placeholder="Ex:. Jardim Cruzeiro"
          v-model="$v.transaction.ship_neighborhood.$model"
          :success="$v.transaction.ship_neighborhood.$invalid"
        ></v-text-field>
        <v-text-field
          label="Cidade"
          placeholder="Ex:. São Paulo"
          v-model="$v.transaction.ship_city.$model"
          :success="$v.transaction.ship_city.$invalid"
        ></v-text-field>
        <v-select
          :items="state_select"
          item-text="name"
          item-value="value"
          label="Estado"
          v-model="$v.transaction.ship_state.$model"
          :success="$v.transaction.ship_state.$invalid"
        ></v-select>
        <v-select
          :items="country_select"
          item-text="name"
          item-value="value"
          label="País"
          v-model="$v.transaction.ship_country.$model"
          :success="$v.transaction.ship_country.$invalid"
        ></v-select>
        <v-text-field
          label="Cep"
          v-model="$v.transaction.ship_zip_code.$model"
          :success="$v.transaction.ship_zip_code.$invalid"
        ></v-text-field>
      </div>

      <v-subheader>Forma de pagamento</v-subheader>
      <v-radio-group
        v-model="$v.transaction.payment_method.$model"
        :success="$v.transaction.payment_method.$invalid"
      >
        <v-radio
          name="payment-method"
          label="Cartão de Crédito"
          value="credit-card"
        >
        </v-radio>
        <v-radio name="payment-method" label="Boleto" value="slip-bank">
        </v-radio>
      </v-radio-group>
      <div v-if="transaction.payment_method == 'credit-card'">
        <v-subheader>Cartões aceitos</v-subheader>
        <v-icon fas fa-cc-visa></v-icon>
        <v-icon fas fa-cc-amex style="color:blue;"></v-icon>
        <v-icon fas fa-cc-mastercard style="color:red;"></v-icon>
        <v-icon fas fa-cc-discover style="color:orange;"></v-icon>

        <v-text-field
          label="Nome do Cartão"
          placeholder="João D Silva"
          prepend-inner-icon="fa-id-badge"
          v-model="$v.transaction.credit_card_name.$model"
          :success="$v.transaction.credit_card_name.$invalid"
        ></v-text-field>
        <v-text-field
          label="Número do Cartão"
          placeholder="Apenas Números"
          prepend-inner-icon="fa-credit-card"
          v-model="$v.transaction.credit_card_number.$model"
          :success="$v.transaction.credit_card_number.$invalid"
        ></v-text-field>
        <v-text-field
          label="CVV"
          placeholder="Ex:. 123"
          prepend-inner-icon="fa-key"
          v-model="$v.transaction.credit_card_cvv.$model"
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
            <v-btn flat @click="showDateDialog = false">Fechar</v-btn>
            <v-btn flat @click="$refs.dateDialog.save(dateDialogValue)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-dialog>

        <v-select
          :items="installments_select"
          item-text="name"
          item-value="value"
          label="Standard"
          v-model="$v.transaction.installments.$model"
          :success="$v.transaction.installments.$invalid"
        ></v-select>
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
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import {
  required,
  requiredIf,
  minLength,
  between,
  numeric,
  email
} from "vuelidate/lib/validators";
import moment from "moment";

export default {
  props: ["cupom", "affiliate"],
  data() {
    return {
      isLoading: false,
      showSnackbar: false,
      show1: false,
      dateDialogValue: this.formattedDate,
      transaction: {
        document: "",
        mail: "",
        password: "",
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
        installments: ""
      },
      hasError: false,
      showDateDialog: false,
      installments_select: [
        { value: 1, name: "1 sem juros" },
        { value: 2, name: "2 com juros" }
      ],
      country_select: [{ value: "br", name: "Brasil" }],
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
        { value: "Distrito Federal", name: "Distrito Federal" }
      ]
    };
  },
  computed: {
    ...mapState({
      direct_sales: "direct_sales",
      pageProduct: "product",
      Cart: "shopping_cart"
    }),
    formattedDate() {
      return moment(this.transaction.credit_card_validate).format("MM/YYYY");
    },
    formattedDateOutput() {
      return moment(this.transaction.credit_card_validate).format("MMYY");
    },
    ...mapGetters({
      cartTotal: "totalCart",
      getShoppingCart: "getShoppingCart"
    }),
    nameErrors () {
      const errors = []
      const name = this.$v.transaction.name
      if (!name.$dirty) { return errors }
      !name.required && errors.push('Nome é obrigatório!')
      !name.minLength && errors.push(`Insira pelo menos ${name.$params.minLength.min} caracteres!`)
      return errors
    },
    emailErrors () {
      const errors = []
      const email = this.$v.transaction.mail
      if (!email.$dirty) { return errors }
      !email.required && errors.push('Email é obrigatório!')
      !email.email && errors.push('Insira um email válido!')
      return errors
    },
    passwordErrors () {
      const errors = []
      const password = this.$v.transaction.password
      if (!password.$dirty) { return errors }
      !password.required && errors.push('Senha é obrigatória!')
      !password.minLength && errors.push(`Insira pelo menos ${password.$params.minLength.min} caracteres!`)
      return errors
    },
    documentErrors () {
      const errors = []
      const document = this.$v.transaction.document
      if (!document.$dirty) {return errors }
      !document.required && errors.push("documento é um campo obrigatório!")
      !document.numeric && errors.push("Utilize apenas números")
      return errors
    }, 

  },
  validations: {
    transaction: {
      document: {
        required,
        numeric,
        between: between(10, 11)
      },
      mail: {
        email,
        required
      },
      password: {
        required,
        minLength: minLength(6)
      },
      name: {
        required
      },
      phone: {
        numeric,
        minLength: minLength(11),
        required
      },
      address: {
        required
      },
      address_number: {
        numeric,
        required
      },
      address_complement: {
        required
      },
      neighborhood: {
        required
      },
      city: {
        required
      },
      state: {
        required
      },
      country: {
        required
      },
      zip_code: {
        numeric,
        between: between(8, 8),
        required
      },
      shipping_is_payment: {
        required
      },
      ship_name: {
        required: requiredIf(function() {
          return !this.shipping_is_payment;
        })
      },
      ship_address: {
        required: requiredIf(function() {
          return !this.shipping_is_payment;
        })
      },
      ship_address_number: {
        required: requiredIf(function() {
          return !this.shipping_is_payment;
        })
      },
      ship_address_complement: {
        required: requiredIf(function() {
          return !this.shipping_is_payment;
        })
      },
      ship_neighborhood: {
        required: requiredIf(function() {
          return !this.shipping_is_payment;
        })
      },
      ship_city: {
        required: requiredIf(function() {
          return !this.shipping_is_payment;
        })
      },
      ship_state: {
        required: requiredIf(function() {
          return !this.shipping_is_payment;
        })
      },
      ship_country: {
        required: requiredIf(function() {
          return !this.shipping_is_payment;
        })
      },
      ship_zip_code: {
        numeric,
        between: between(8, 8),
        required: requiredIf(function() {
          return !this.shipping_is_payment;
        })
      },
      payment_method: {
        required
      },
      credit_card_name: {
        required: requiredIf(function() {
          return !this.payment_method == "credit-card";
        })
      },
      credit_card_number: {
        numeric,
        required: requiredIf(function() {
          return !this.payment_method == "credit-card";
        })
      },
      credit_card_cvv: {
        numeric,
        between: between(3, 4),
        required: requiredIf(function() {
          return !this.payment_method == "credit-card";
        })
      },
      credit_card_validate: {
        required: requiredIf(function() {
          return !this.payment_method == "credit-card";
        })
      },
      installments: {
        required: requiredIf(function() {
          return !this.payment_method == "credit-card";
        })
      }
    }
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
                tangible: true
              }
            ]
          }
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
          cupom: _cupom
        };
        console.log(checkout);
        this.postCheckout(checkout);
        this.$router.push("/pagamento-processado");
      } catch (error) {
        console.log(error);
        this.error = error.message;
        this.showSnackbar = true;
      } finally {
        this.isLoading = false;
      }
    }
  }
};
// Todo
// 2 - Validações
// 3 - Forma de pagamento
// 4 - Comprar
</script>

<style scoped lang="sass">
$color: #fff
</style>
