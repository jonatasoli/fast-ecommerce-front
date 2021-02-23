import Vue from "vue";
import Vuex from "vuex";

import {
  GET_AVAILABLE_AMOUNT,
  GET_TODAYS_PROFIT,
  GET_PROFIT,
  GET_PRODUCTS,
  SET_ERROR,
} from "./mutations_types";
import productAdminService from "@resources/admin/services";

Vue.use(Vuex);

const AssociateModule = {
  namespaced: true,
  state: {
    error: [],
    available_amount: {
      total: null,
      refunt: null,
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
    getProfit(state) {
      return state.profits;
    },
    getAvailableAmount(state) {
      return state.avilable_amount;
  },
  },
  },
};

export default AssociateModule;
