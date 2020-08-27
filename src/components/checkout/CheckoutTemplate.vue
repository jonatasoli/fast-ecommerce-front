<template>
  <v-container class="section">
          <v-snackbar
            v-model="showSnackbar"
            top
          >
            {{ error }}
            <v-btn
              color="pink"
              flat
              icon
              @click="showSnackbar = false"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-snackbar>

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
            v-model="transaction.mail"
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
            v-model="transaction.address_number"
          ></v-text-field>
          <v-text-field
            label="Complemento"
            placeholder="Ex:. Ao lado da igreja"
            v-model="transaction.address_complement"
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
            v-model="transaction.state"
          ></v-text-field>
          <v-select
            :items="country_select"
            item-text="name"
            item-value="value"
            label="País"
            v-model="transaction.country"
          ></v-select>
          <v-text-field
            label="Cep"
            v-model="transaction.zip_code"
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
            v-model="transaction.ship_address_number"
          ></v-text-field>
          <v-text-field
            label="Complemento"
            placeholder="Ex:. Ao lado da igreja"
            v-model="transaction.ship_address_complement"
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
          <v-select
            :items="country_select"
            item-text="name"
            item-value="value"
            label="País"
            v-model="transaction.ship_country"
          ></v-select>
          <v-text-field
            label="Cep"
            v-model="transaction.ship_zip_code"
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
          :items="installments_select"
          item-text="name"
          item-value="value"
          label="Standard"
          v-model="transaction.installments"
        ></v-select>

    </div>
        <v-btn
          color="#46cb18"
          dark large
          @click.prevent="onSubmit">
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
import moment from "moment";

export default {
  props: ['cupom', 'affiliate'],
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
        state: "",
        country: "br",
        zip_code: "",
        shipping_is_payment: true,
        ship_name: "",
        ship_address: "",
        ship_address_number: "",
        ship_address_complement: "",
        ship_neighborhood: "",
        ship_city: "",
        ship_state: "",
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
      country_select: [
        { value: "br", name: "Brasil"}
      ],
      state_select: [
        { value: "São Paulo", name: "São Paulo"}
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
      return moment(this.transaction.credit_card_validate).format("MM/YYYY")
    },
    formattedDateOutput() {
      return moment(this.transaction.credit_card_validate).format("MMYY")
    },
    ...mapGetters({
      cartTotal: "totalCart",
      getShoppingCart: "getShoppingCart"
    })
  },
  methods: {
    ...mapActions(['postCheckout']),
    onSubmit() {
      this.isLoading = true
      try {
        const _transaction = Object.assign({}, this.transaction);
        const _product = this.getShoppingCart[0];
        console.log(_product);
        const _shopping_cart = [{
            "total_amount": this.cartTotal,
            "installments": _transaction.installments,
            "itens": [{
                "amount": _product.price,
                "qty": 1,
                "product_id": _product.id,
                "product_name": _product.name,
                "affiliate": this.affiliate,
                "tangible": true
                }]
            }];
        _transaction.shopping_cart = _shopping_cart;
        _transaction.credit_card_validate=this.formattedDateOutput
        const _affiliate = this.affiliate;
        const _cupom = this.cupom;
        console.log("ShoppingCart", _shopping_cart);
        console.log("Formulario ", _transaction);
        console.log("Affliate ", _affiliate);
        console.log("Cupom ", _cupom);
        console.log("passou o pagamento");
        const checkout = { "transaction": _transaction, "affiliate": _affiliate, "cupom": _cupom}
        console.log(checkout)
        this.postCheckout(checkout);
        this.$router.push('/pagamento-processado')
      } catch (error) {
        console.log(error);
        this.error = error.message
        this.showSnackbar = true
      } finally {
        this.isLoading = false
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
