<template>
  <v-container fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12 sm6 md4 lg3 xl3>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>{{ texts.toolbar }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-progress-circular
              v-show="isLoading"
              indeterminate
              color="white"
              width="2"
            ></v-progress-circular>
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                v-if="!isLogin"
                prepend-icon="fa-envelope"
                name="email"
                label="Email"
                type="text"
                :error-messages="emailErrors"
                :success="!$v.user.email.$invalid"
                v-model.trim="$v.user.email.$model"
              ></v-text-field>
              <v-text-field
                prepend-icon="fa-id-card"
                name="username"
                label="Documento"
                type="username"
                :error-messages="usernameErrors"
                :success="!$v.user.username.$invalid"
                v-model.trim="$v.user.username.$model"
              ></v-text-field>
              <v-text-field
                prepend-icon="fa-lock"
                name="password"
                label="Senha"
                type="password"
                :error-messages="passwordErrors"
                :success="!$v.user.password.$invalid"
                v-model.trim="$v.user.password.$model"
              ></v-text-field>
            </v-form>
            <v-btn
              block
              depressed
              color="secondary"
              @click="isLogin = !isLogin"
            >
              {{ texts.button }}
            </v-btn>
          </v-card-text>

          <v-card-actions>
            <v-btn justify-center align-center color="primary" text>
              Esqueci minha senha
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="$v.$invalid"
              color="primary"
              large
              @click="submit"
              >{{ texts.toolbar }}</v-btn
            >
          </v-card-actions>

          <v-snackbar v-model="showSnackbar" top>
            {{ error }}
            <v-btn color="pink" flat icon @click="showSnackbar = false">
              <v-icon>fa-window-close</v-icon>
            </v-btn>
          </v-snackbar>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("user");

import { required, email, minLength } from "vuelidate/lib/validators";
import AuthService from "./../services/auth-service";
import { formatError } from "@/utils";
export default {
  name: "Login",
  data: () => ({
    error: undefined,
    isLogin: true,
    isLoading: false,
    showSnackbar: false,
    user: {
      email: "",
      username: "",
      password: "",
    },
  }),
  validations() {
    const validations = {
      user: {
        username: {
          required,
          minLength: minLength(11),
        },
        password: {
          required,
          minLength: minLength(6),
        },
      },
    };
    if (this.isLogin) {
      return validations;
    }
    return {
      user: {
        ...validations.user,
        email: {
          required,
          email,
          minLength: minLength(3),
        },
      },
    };
  },
  computed: {
    ...mapState({ userRole: "userRole" }),
    texts() {
      return this.isLogin
        ? { toolbar: "Entrar", button: "Criar conta" }
        : { toolbar: "Criar conta", button: "Já tenho uma conta" };
    },
    emailErrors() {
      const errors = [];
      const email = this.$v.user.email;
      if (!email.$dirty) {
        return errors;
      }
      !email.required && errors.push("Nome é obrigatório!");
      !email.minLength &&
        errors.push(
          `Insira pelo menos ${email.$params.minLength.min} caracteres!`
        );
      return errors;
    },
    usernameErrors() {
      const errors = [];
      const username = this.$v.user.username;
      if (!username.$dirty) {
        return errors;
      }
      !username.required && errors.push("Documento é obrigatório!");
      !username.minLength &&
        errors.push(
          `Insira pelo menos ${username.$params.minLength.min} caracteres!`
        );
      return errors;
    },
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
  },
  methods: {
    ...mapActions(["loginClient"]),
    async submit() {
      this.isLoading = true;
      try {
        this.isLogin
          ? await this.loginClient(this.user)
          : await AuthService.signup(this.user);
        console.log("ROLA", this.userRole);
        this.$router.push(
          this.$route.query.redirect || { name: this.userRole }
        );
      } catch (error) {
        console.log(error);
        this.error = formatError(error.message);
        this.showSnackbar = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
