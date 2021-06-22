import Vue from "vue";
import Vuex from "vuex";

import * as types from "./mutations_types";
import { 
  SET_ERROR, 
  ADD_USER_STATE, 
  RESET_USER_STATE,
  GET_USER,
  GET_ORDERS } from "./mutations_types";

import authService from "./../services/auth-service";
import userService from "./../services/index";

Vue.use(Vuex);

const userModule = {
  namespaced: true,

  state: {
    user: [],
    erro: undefined,
    userRole: undefined,
    accessToken: undefined,
    myOrders: [],
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
      localStorage.removeItem("user_data");
    },
    [GET_USER]: (state, user) => {
      state.user = [];
      state.user = user;
      localStorage.setItem("user_data", JSON.stringify(user));
    },
    [GET_ORDERS]: (state, orders) => {
      state.myOrders = [];
      state.myOrders = orders;
    }
  },

  actions: {
    getUser: async ({commit}, document) => {
      try {
        const response = await userService.getUser(document);
        console.log("User DATA", response)
        commit(types.GET_USER,  response)
      } catch (error) {
        commit(types.SET_ERROR, { error })
      }
    },
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
    setMyOrders: async ({commit}, user_id) => {
      try {
        console.log("ACTION URI ", user_id);
        const response = await userService.getMyOrders(user_id);
        commit(types.GET_ORDERS, response);
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },
  },

  getters: {
    getMyOrders: (state) => {
      return state.myOrders;
    }
  },
};

export default userModule;
