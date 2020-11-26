<template>
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
</template>

<script>
const validateCVV = (value) => value.length >= 3 || value.length <= 4;

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters } = createNamespacedHelpers("product");
import { required, requiredIf, numeric } from "vuelidate/lib/validators";
import moment from "moment";

export default {
  props: ["transaction"],
  data() {
    return {
      isLoading: false,
      showSnackbar: false,
      show1: false,
      dateDialogValue: this.formattedDate,
      hasError: false,
      showDateDialog: false,
      payment_method_select: [
        { name: "Cartão de Crédito", value: "credit-card" },
        { name: "Boleto", value: "slip-payment" },
      ],
      payment_method: "credit-card",
      installments_select_local: [{ name: "1 x", value: 1 }],
      installment: 1,
    };
  },
  watch: {
    payment_method() {
      this.$emit("payment-method", this.payment_method);
    },
    installment() {
      console.log("emitindo evendo ", this.installment);
      this.$emit("installment-select", this.installment);
    },
    /* async installments_select_local() { */
    /*     console.log("WATCH ", this.installments_select_local) */
    /*     this.installments_select_local = await this.getAsyncInstallment(); */
    /*     console.log("WATCH ", this.installments_select_local) */
    /*     }, */
  },
  computed: {
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
  validations: {
    transaction: {
      name: {
        required,
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
    ...mapGetters(["getShoppingCart", "getInstallments"]),
    ...mapActions(["getAsyncInstallment", "setInstallments"]),
  },
  async mounted() {
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
    });
  },
};
</script>

<style scoped lang="sass">
$color: #fff
</style>
