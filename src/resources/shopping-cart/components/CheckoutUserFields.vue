<template>
  <div>
    <v-text-field
      label="Documento"
      placeholder="Apenas números"
      prepend-inner-icon="fa-id-card"
      v-model.trim="$v.transaction.document.$model"
      :error-messages="documentErrors"
      :success="!$v.transaction.document.$invalid"
      :error="$v.transaction.document.$invalid"
    ></v-text-field>
    <v-text-field
      label="e-mail"
      placeholder="email@email.com"
      prepend-inner-icon="fa-envelope"
      v-model="$v.transaction.mail.$model"
      :error-messages="emailErrors"
      :success="!$v.transaction.mail.$invalid"
      :error="$v.transaction.mail.$invalid"
    ></v-text-field>
    <v-text-field
      label="Telefone"
      placeholder="Apenas números"
      prepend-inner-icon="fa-phone"
      v-model="$v.transaction.phone.$model"
      :error-messages="phoneErrors"
      :success="!$v.transaction.phone.$invalid"
      :error="$v.transaction.phone.$invalid"
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
      :success="!$v.transaction.password.$invalid"
      :error="$v.transaction.password.$invalid"
    ></v-text-field>
  </div>
</template>

<script>
const validateDocument = (value) => value.length == 11 || value.length == 14;

import { required, minLength, numeric, email } from "vuelidate/lib/validators";

export default {
  props: ["transaction"],
  data() {
    return {
      show1: false,
    };
  },
  computed: {
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
    },
  },
};
</script>

<style scoped lang="sass">
$color: #fff
</style>
