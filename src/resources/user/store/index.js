import Vue from "vue";
import Vuex from "vuex";

import * as types from "./mutations_types";
import { SET_ERROR, ADD_USER_STATE, RESET_USER_STATE } from "./mutations_types";

import authService from "./../services/auth-service";

Vue.use(Vuex);

const userModule = {
  namespaced: true,

  state: {
    erro: undefined,
    userRole: undefined,
    accessToken: undefined,
  },

  mutations: {
    [SET_ERROR]: (state, { error }) => {
      state.error = error;
    },
    [ADD_USER_STATE]: (state, credentials) => {
      state.userRole = credentials.role;
      state.accessToken = credentials.access_token;
      localStorage.setItem("user", JSON.stringify(credentials));
    },
    [RESET_USER_STATE]: (state) => {
      state.userState = undefined;
      state.userRole = undefined;
      localStorage.removeItem("user");
    },
  },

  actions: {
    loginClient: async ({ commit }, user) => {
      try {
        const user_credentials = await authService.login(user);
        console.log("User CREDENTIAL ", user_credentials);
        commit(types.ADD_USER_STATE, user_credentials);
      } catch (error) {
        commit(types.SET_ERROR, { error });
        commit(types.RESET_USER_STATE);
      }
    },
    logoutClient: async ({ commit }) => {
      try {
        commit(types.RESET_USER_STATE);
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },
  },

  getters: {},
};

export default userModule;
