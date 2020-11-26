<template>
  <div>
    <v-subheader>Endereço de cobrança</v-subheader>
    <v-text-field
      label="Nome"
      placeholder="Seu nome completo"
      v-model="$v.transaction.name.$model"
      :error-messages="nameErrors"
      :success="!$v.transaction.name.$invalid"
      :error="$v.transaction.name.$invalid"
    ></v-text-field>
    <v-text-field
      label="Endereço"
      placeholder="Ex:. Rua Barão de Mauá"
      v-model="$v.transaction.address.$model"
      :error-messages="addressErrors"
      :success="!$v.transaction.address.$invalid"
      :error="$v.transaction.address.$invalid"
    ></v-text-field>
    <v-text-field
      label="Número"
      placeholder="Ex:. 33"
      v-model="$v.transaction.address_number.$model"
      :error-messages="addressNumberErrors"
      :success="!$v.transaction.address_number.$invalid"
      :error="$v.transaction.address_number.$invalid"
    ></v-text-field>
    <v-text-field
      label="Complemento"
      placeholder="Ex:. Ao lado da igreja"
      v-model="$v.transaction.address_complement.$model"
      :error-messages="addressComplementErrors"
      :success="!$v.transaction.address_complement.$invalid"
      :error="$v.transaction.address_complement.$invalid"
    ></v-text-field>
    <v-text-field
      label="Bairro"
      placeholder="Ex:. Jardim Cruzeiro"
      v-model="$v.transaction.neighborhood.$model"
      :error-messages="neighborhoodErrors"
      :success="!$v.transaction.neighborhood.$invalid"
      :error="$v.transaction.neighborhood.$invalid"
    ></v-text-field>
    <v-text-field
      label="Cidade"
      placeholder="Ex:. São Paulo"
      v-model="$v.transaction.city.$model"
      :error-messages="cityErrors"
      :success="!$v.transaction.city.$invalid"
      :error="$v.transaction.city.$invalid"
    ></v-text-field>
    <v-select
      :items="state_select"
      item-text="name"
      item-value="value"
      label="Estado"
      v-model="$v.transaction.state.$model"
      :error-messages="stateErrors"
      :success="!$v.transaction.state.$invalid"
      :error="$v.transaction.state.$invalid"
    ></v-select>
    <v-select
      :items="country_select"
      item-text="name"
      item-value="value"
      label="País"
      v-model="$v.transaction.country.$model"
      :error-messages="countryErrors"
      :success="!$v.transaction.country.$invalid"
      :error="$v.transaction.country.$invalid"
    ></v-select>
    <v-text-field
      label="Cep"
      v-model="$v.transaction.zip_code.$model"
      :error-messages="zipCodeErrors"
      :success="!$v.transaction.zip_code.$invalid"
      :error="$v.transaction.zip_code.$invalid"
    ></v-text-field>

    <v-switch
      v-model="$v.transaction.shipping_is_payment.$model"
      :error-messages="shippingErrors"
      :success="!$v.transaction.shipping_is_payment.$invalid"
      :error="$v.transaction.shipping_is_payment.$invalid"
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
        :success="!$v.transaction.ship_name.$invalid"
        :error="$v.transaction.ship_name.$invalid"
      ></v-text-field>
      <v-text-field
        label="Endereço"
        placeholder="Ex:. Rua Barão de Mauá"
        v-model="$v.transaction.ship_address.$model"
        :error-messages="shipAddressErrors"
        :success="!$v.transaction.ship_address.$invalid"
        :error="$v.transaction.ship_address.$invalid"
      ></v-text-field>
      <v-text-field
        label="Número"
        placeholder="Ex:. 33"
        v-model="$v.transaction.ship_address_number.$model"
        :error-messages="shipAddressNumberErrors"
        :success="!$v.transaction.ship_address_number.$invalid"
        :error="$v.transaction.ship_address_number.$invalid"
      ></v-text-field>
      <v-text-field
        label="Complemento"
        placeholder="Ex:. Ao lado da igreja"
        v-model="$v.transaction.ship_address_complement.$model"
        :error-messages="shipAddressComplementErrors"
        :success="!$v.transaction.ship_address_complement.$invalid"
        :error="$v.transaction.ship_address_complement.$invalid"
      ></v-text-field>
      <v-text-field
        label="Bairro"
        placeholder="Ex:. Jardim Cruzeiro"
        v-model="$v.transaction.ship_neighborhood.$model"
        :error-messages="shipNeighborhoodErrors"
        :success="!$v.transaction.ship_neighborhood.$invalid"
        :error="$v.transaction.ship_neighborhood.$invalid"
      ></v-text-field>
      <v-text-field
        label="Cidade"
        placeholder="Ex:. São Paulo"
        v-model="$v.transaction.ship_city.$model"
        :error-messages="shipCityErrors"
        :success="!$v.transaction.ship_city.$invalid"
        :error="$v.transaction.ship_city.$invalid"
      ></v-text-field>
      <v-select
        :items="state_select"
        item-text="name"
        item-value="value"
        label="Estado"
        v-model="$v.transaction.ship_state.$model"
        :error-messages="shipStateErrors"
        :success="!$v.transaction.ship_state.$invalid"
        :error="$v.transaction.ship_state.$invalid"
      ></v-select>
      <v-select
        :items="country_select"
        item-text="name"
        item-value="value"
        label="País"
        v-model="$v.transaction.ship_country.$model"
        :error-messages="shipCountryErrors"
        :success="!$v.transaction.ship_country.$invalid"
        :error="$v.transaction.ship_country.$invalid"
      ></v-select>
      <v-text-field
        label="Cep"
        v-model="$v.transaction.ship_zip_code.$model"
        :error-messages="shipZipCodeErrors"
        :success="!$v.transaction.ship_zip_code.$invalid"
        :error="$v.transaction.ship_zip_code.$invalid"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
const validateZipCode = (value) => value.length == 8;

import {
  required,
  requiredIf,
  minLength,
  numeric,
} from "vuelidate/lib/validators";

export default {
  props: ["transaction"],
  data() {
    return {
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
        { value: "Distrito Federal", name: "Distrito Federal" },
      ],
    };
  },
  computed: {
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
  },
  validations: {
    transaction: {
      name: {
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
    },
  },
};
</script>

<style scoped lang="sass">
$color: #fff
</style>
