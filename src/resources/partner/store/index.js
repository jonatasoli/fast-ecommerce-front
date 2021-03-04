import Vue from "vue";
import Vuex from "vuex";
import { getProducts } from "../services/partner";

import {
  GET_AVAILABLE_AMOUNT,
  GET_TODAYS_PROFIT,
  GET_PROFIT,
  GET_PRODUCTS,
  SET_ERROR,
} from "./mutations_types";

Vue.use(Vuex);

const associateModule = {
  namespaced: true,
  state: {
    error: [],
    available_amount: {
      total: null,
      refund: null,
    },
    balance: {
      totalBalance: 0,
      toBeAvailable: 0,
    },
    todays_profit: {
      daily_gain: null,
    },
    associateProducts: [],
    transactions: [
      {
        code: null,
        product: {
          name: null,
          uri: null,
          price: 0,
          direct_sell: null,
          upsell: null,
          description: null,
          image_path: null,
          active: null,
          discount: null,
        },
        price: 0,
        buyerName: null,
        sellerName: null,
        comission: null,
        status: null,
        actions: null,
      },
    ],
    profits: [
      {
        daily_gain: null,
        refund: null,
        day: null,
      },
    ],
  },
  getters: {
    getProfits(state) {
      return state.profits;
    },
    getAvailableAmount(state) {
      return state.available_amount;
    },
    products(state) {
      return state.associateProducts;
    },
    transactions(state) {
      return state.transactions;
    },
    balance(state) {
      return state.balance;
    },
  },
  mutations: {
    [GET_AVAILABLE_AMOUNT]: (state, { available_amount }) => {
      state.available_amount = available_amount;
    },
    [GET_TODAYS_PROFIT]: (state, { todays_profit }) => {
      state.available_amount = todays_profit;
    },
    [GET_PROFIT]: (state, { profits }) => {
      state.available_amount = profits;
    },
    [GET_PRODUCTS]: (state, { products }) => {
      state.associateProducts = products;
    },
    [SET_ERROR]: (state, { error }) => {
      state.error = error;
    },
  },
  actions: {
    async PopulateProducts({ commit }) {
      try {
        const response = await getProducts();
        commit(GET_PRODUCTS, { products: response });
      } catch (error) {
        commit(SET_ERROR, { error });
      }
    },
  },
};

export default associateModule;
