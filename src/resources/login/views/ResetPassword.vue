<template>
  <v-container fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12 sm6 md4 lg3 xl3>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Redefinir Senha</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="fa-lock"
                name="password"
                label="Senha"
                type="password"
                :error-messages="passwordErrors"
                :success="!$v.user.password.$invalid"
                v-model.trim="$v.user.password.$model"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="fa-key"
                name="password"
                label="Confirmar Senha"
                type="password"
                :error-messages="newPasswordErrors"
                :success="!$v.user.newPassword.$invalid"
                v-model.trim="$v.user.newPassword.$model"
              >
              </v-text-field>
            </v-form>
            <v-btn block depressed color="secondary" @click="save"> Enviar </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthService from "./../services/auth-service";
import {
  required,
  minLength,
  sameAs,
} from "vuelidate/lib/validators";
export default {
  name: "ResetPassword",
  props: ["document"],
  data() {
    return {
      user: {
        document: this.document,
        password: "",
        newPassword: "",
      }
    };
  },
  validations() {
    const validations = {
      user: {
        password: {
          required,
          minLength: minLength(6),
        }, 
      newPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
      },
    };
    return validations;
  },
  computed: {
    passwordErrors() {
      const errors = [];
      const password = this.$v.user.password;
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
    newPasswordErrors() {
      const errors = [];
      const newPassword = this.$v.user.newPassword;
      if (!newPassword.sameAsPassword) {
        errors.push("Senhas não conferem");
      }
      return errors;
    },
  },
  methods: {
    save() {
      console.log(this.user)
      AuthService.resetPassword(this.user)
      alert("Senha alterada com sucesso!")
      this.$router.push({name: "Login"})
    }
  },
};
</script>

<style></style>
