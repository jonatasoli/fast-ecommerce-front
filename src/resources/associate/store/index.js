import Vue from "vue";
import Vuex from "vuex";
import { getProducts } from "../services/products";

import {
  GET_AVAILABLE_AMOUNT,
  GET_TODAYS_PROFIT,
  GET_PROFIT,
  GET_PRODUCTS,
  SET_ERROR,
} from "./mutations_types";
import productAdminService from "@resources/admin/services";

Vue.use(Vuex);

const associateModule = {
  namespaced: true,
  state: {
    error: [],
    available_amount: {
      total: null,
      refund: null,
    },
    todays_profit: {
      daily_gain: null,
    },
    profits: [
      {
        daily_gain: null,
        refund: null,
        day: null,
      },
      {
        daily_gain: null,
        refund: null,
        day: null,
      },
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
      return state.products;
    },
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
  },
};

export default associateModule;
