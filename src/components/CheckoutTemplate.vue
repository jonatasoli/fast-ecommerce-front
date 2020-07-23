<template>
  <section class="section">
    <div class="column is-three-fifths is-offset-one-fifth">
      <h3>Nome do produto</h3>
    </div>

    <div class="column is-three-fifths is-offset-one-fifth">
      <h3>Descrição</h3>
    </div>
    <div class="column is-three-fifths is-offset-one-fifth">
      <form ref="form" @submit.prevent="onSubmit">
        <b-field grouped>
          <b-field
            label="Email"
            :type="{ 'is-danger': hasError }"
            :message="{ 'Username is not available': hasError }"
          >
            <b-input
              type="email"
              expanded
              placeholder="email@email.com"
              icon-pack="fas"
              icon="envelope"
              v-model="transaction.mail"
              maxlength="30"
            ></b-input>
          </b-field>
          <b-field label="Password">
            <b-input type="password" expanded v-model="transaction.password" password-reveal></b-input>
          </b-field>
        </b-field>
        <h3>Endereço de cobrança</h3>
        <b-field label="Nome" :label-position="labelPosition">
          <b-input v-model="transaction.name"></b-input>
        </b-field>
        <b-field label="Endereço" :label-position="labelPosition">
          <b-input v-model="transaction.address"></b-input>
        </b-field>
        <b-field label="Número" :label-position="labelPosition">
          <b-input v-model="transaction._number"></b-input>
        </b-field>
        <b-field label="Bairro" :label-position="labelPosition">
          <b-input v-model="transaction.neighborhood"></b-input>
        </b-field>
        <b-field label="Cidade" :label-position="labelPosition">
          <b-input v-model="transaction.city"></b-input>
        </b-field>
        <b-field label="Estado" :label-position="labelPosition">
          <b-input v-model="transaction._state"></b-input>
        </b-field>
        <b-field label="País" :label-position="labelPosition">
          <b-input v-model="transaction.country"></b-input>
        </b-field>
        <b-field label="Cep" :label-position="labelPosition">
          <b-input v-model="transaction.zip"></b-input>
        </b-field>

        <b-checkbox
          v-model="transaction.shipping_is_payment"
        >Endereço de cobrança é o mesmo de envio</b-checkbox>
        <h3>Forma de pagamento</h3>
        <div class="block">
          <b-radio
            v-model="transaction.payment_method"
            name="payment-method"
            native-value="credit-cart"
          >Cartão</b-radio>
          <b-radio
            v-model="transaction.payment_method"
            name="payment-method"
            native-value="slip-bank"
          >Boleto</b-radio>
        </div>
        <b-field label="Cartões aceitos" :label-position="labelPosition">
          <b-icon pack="fas" icon="fa-cc-visa" style="color:navy;"></b-icon>
          <b-icon pack="fas" icon="fa-cc-amex" style="color:blue;"></b-icon>
          <b-icon pack="fas" icon="fa-cc-mastercard" style="color:red;"></b-icon>
          <b-icon pack="fas" icon="fa-cc-discover" style="color:orange;"></b-icon>
        </b-field>
        <b-field label="Nome no cartão" :label-position="labelPosition">
          <b-input v-model="transaction.credit_card_name"></b-input>
        </b-field>
        <b-field label="Numero do cartão" :label-position="labelPosition">
          <b-input pack="fas" icon="credit-card" v-model="transaction.credit_card_number"></b-input>
        </b-field>
        <b-field label="CVV" :label-position="labelPosition">
          <b-input type="password" v-model="transaction.credit_card_cvv" password-reveal></b-input>
        </b-field>
        <b-field label="Validade do cartão" :label-position="labelPosition">
          <b-datepicker
            type="month"
            placeholder="Selecione a validade do cartão..."
            icon="calendar-today"
            v-model="transaction.credit_card_validate"
            trap-focus
          ></b-datepicker>
        </b-field>
        <b-button type="primary" @click.prevent="onSubmit">Comprar</b-button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      labelPosition: "on-border",
      transaction: {
        mail: "",
        password: "",
        name: "",
        address: "",
        _number: "",
        neighborhood: "",
        city: "",
        _state: "",
        country: "Brasil",
        zip: "",
        shipping_is_payment: true,
        ship_name: "",
        ship_address: "",
        ship__number: "",
        ship_neighborhood: "",
        ship_city: "",
        ship_state: "",
        ship_country: "Brasil",
        ship_zip: "",
        payment_method: "credit-card",
        shopping_cart: ["1"],
        credit_card_name: "",
        credit_card_number: "",
        credit_card_cvv: "",
        credit_card_validate: new Date()
      },
      hasError: false
    };
  },
  computed: {
    ...mapState("direct_sales", ["direct_sales"])
  },
  methods: {
    onSubmit() {
      const _transaction = Object.assign({}, this.transaction);
      console.log("Formulario ", _transaction);
    }
  }
};
// Todo
// 1 - Configurar o campo de completar endereço
// 2 - Validações
// 3 - Forma de pagamento
// 4 - Comprar
</script>

<style scoped lang="scss">
</style>
