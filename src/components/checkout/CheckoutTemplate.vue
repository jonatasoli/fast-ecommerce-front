<template>
  <v-container class="section">
  <v-row>
  </v-row>
      <v-form
      ref="form"
      v-model="valid"
      align="center"
      justify="center"
      :lazy-validation="lazy"
      @submit.prevent="onSubmit"
    >
          <v-text-field
            label="Documento"
            placeholder="Apenas números"
            prepend-inner-icon="fa-id-card"
            v-model="transaction.document"
          ></v-text-field>
          <v-text-field
            label="e-mail"
            placeholder="email@email.com"
            prepend-inner-icon="fa-envelope"
            v-model="transaction.email"
          ></v-text-field>
          <v-text-field
            label="Telefone"
            placeholder="Apenas números"
            prepend-inner-icon="fa-phone"
            v-model="transaction.phone"
            type="number"
          ></v-text-field>
          <v-text-field
            label="Senha"
            prepend-inner-icon="fa-lock"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            v-model="transaction.password"
          ></v-text-field>

        <v-subheader>Endereço de cobrança</v-subheader>
          <v-text-field
            label="Nome"
            placeholder="Seu nome completo"
            v-model="transaction.name"
          ></v-text-field>
          <v-text-field
            label="Endereço"
            placeholder="Ex:. Rua Barão de Mauá"
            v-model="transaction.address"
          ></v-text-field>
          <v-text-field
            label="Número"
            placeholder="Ex:. 33"
            v-model="transaction._number"
          ></v-text-field>
          <v-text-field
            label="Complemento"
            placeholder="Ex:. Ao lado da igreja"
            v-model="transaction.complement"
          ></v-text-field>
          <v-text-field
            label="Bairro"
            placeholder="Ex:. Jardim Cruzeiro"
            v-model="transaction.neighborhood"
          ></v-text-field>
          <v-text-field
            label="Cidade"
            placeholder="Ex:. São Paulo"
            v-model="transaction.city"
          ></v-text-field>
          <v-text-field
            label="Estado"
            placeholder="Ex:. São Paulo"
            v-model="transaction._state"
          ></v-text-field>
          <v-text-field
            label="País"
            v-model="transaction.country"
          ></v-text-field>
          <v-text-field
            label="Cep"
            v-model="transaction.zip"
          ></v-text-field>
    
          <v-switch 
            v-model="transaction.shipping_is_payment"
            class="ma-2"
            label="Endereço de cobrança é o mesmo de envio?">
          </v-switch>

    <div v-if="!transaction.shipping_is_payment">
        <v-subheader>Endereço de envio</v-subheader>
          <v-text-field
            label="Nome"
            placeholder="Seu nome completo"
            v-model="transaction.ship_name"
          ></v-text-field>
          <v-text-field
            label="Endereço"
            placeholder="Ex:. Rua Barão de Mauá"
            v-model="transaction.ship_address"
          ></v-text-field>
          <v-text-field
            label="Número"
            placeholder="Ex:. 33"
            v-model="transaction.ship_number"
          ></v-text-field>
          <v-text-field
            label="Complemento"
            placeholder="Ex:. Ao lado da igreja"
            v-model="transaction.ship_complement"
          ></v-text-field>
          <v-text-field
            label="Bairro"
            placeholder="Ex:. Jardim Cruzeiro"
            v-model="transaction.ship_neighborhood"
          ></v-text-field>
          <v-text-field
            label="Cidade"
            placeholder="Ex:. São Paulo"
            v-model="transaction.ship_city"
          ></v-text-field>
          <v-text-field
            label="Estado"
            placeholder="Ex:. São Paulo"
            v-model="transaction.ship_state"
          ></v-text-field>
          <v-text-field
            label="País"
            v-model="transaction.ship_country"
          ></v-text-field>
          <v-text-field
            label="Cep"
            v-model="transaction.ship_zip"
          ></v-text-field>
    </div>

        <v-subheader>Forma de pagamento</v-subheader>
          <v-radio-group v-model="transaction.payment_method">
            <v-radio
              name="payment-method"
              label="Cartão de Crédito"
              value="credit-card">
            </v-radio>
            <v-radio
              name="payment-method"
              label="Boleto"
              value="slip-bank">
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
            v-model="transaction.credit_card_name"
          ></v-text-field>
          <v-text-field
            label="Número do Cartão"
            placeholder="Apenas Números"
            prepend-inner-icon="fa-credit-card"
            v-model="transaction.credit_card_number"
          ></v-text-field>
          <v-text-field
            label="CVV"
            placeholder="Ex:. 123"
            prepend-inner-icon="fa-key"
            v-model="transaction.credit_card_cvv"
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
                v-model="dateDialogValue">
                <v-spacer></v-spacer>
                <v-btn
                  flat
                  @click="showDateDialog = false"
                >Fechar</v-btn>
                <v-btn
                  flat
                  @click="$refs.dateDialog.save(dateDialogValue)"
                >OK</v-btn>
              </v-date-picker>
            </v-dialog>

        <v-select
          :items="transaction.installments"
          item-text="name"
          item-value="value"
          label="Standard"
          v-model="transaction.installment_select"
        ></v-select>

    </div>
        <v-btn
          color="primary"
          dark large
          @click.prevent="onSubmit">
          <v-icon>fa-money-check-alt</v-icon>
          Comprar
          </v-btn>
      </v-form>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      show1: false,
      labelPosition: "on-border",
      dateDialogValue: this.formattedDate, 
      transaction: {
        document: "",
        mail: "",
        password: "",
        name: "",
        address: "",
        _number: "",
        complement: "",
        neighborhood: "",
        city: "",
        _state: "",
        country: "Brasil",
        zip: "",
        shipping_is_payment: true,
        ship_name: "",
        ship_address: "",
        ship_number: "",
        ship_complement: "",
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
        credit_card_validate: new Date(),
        installments: [
          { value: 1, name: "1 sem juros" },
          { value: 2, name: "2 com juros" }
        ],
        installment_select: ""
      },
      hasError: false,
      showDateDialog: false
    };
  },
  computed: {
    ...mapState({
    direct_sales: "direct_sales",
    pageProduct: "product"
    }),
    formattedDate() {
      return moment(this.transaction.credit_card_validate).format("MM/YYYY")
    }
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

<style scoped lang="sass">
.has-margin-top-1
    margin-top: 0.75rem !important


.center-element
  display: flex
  align-items: center
  justify-content: center

$color: #fff
</style>
