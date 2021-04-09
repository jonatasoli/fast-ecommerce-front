import Vue from "vue";
import Vuex from "vuex";

import * as types from "./mutations_types";
import {
  GET_PRODUCTS,
  GET_SIGNATURE,
  SET_ERROR,
  SET_ITEM_CREATE,
  SET_ITEM_UPDATE,
  SET_ITEM_DELETE,
  GET_ORDERS,
  SET_ORDER_TRACKING_NUMBER,
  SET_MAIL_TRACKING_NUMBER
} from "./mutations_types";

import productAdminService from "../services/index.js";

Vue.use(Vuex);

const productAdminModule = {
  namespaced: true,
  state: {
    products_all: [],
    orders: [],
    tracking_number: [],
    email: undefined,
    signature: [],
    error: [],
  },
  mutations: {
    [GET_PRODUCTS]: (state, { products_all }) => {
      state.products_all = [];
      state.products_all = products_all;
    },

    [GET_SIGNATURE]: (state, {signature}) => {
      state.signature = [];
      state.signature = signature;
    },

    [SET_ITEM_CREATE]: (state, { products_all }) => {
      state.products_all = [];
      state.products_all = products_all;
    },

    [SET_ITEM_UPDATE]: (state, { products_all }) => {
      state.products_all = [];
      state.products_all = products_all;
    },

    [SET_ITEM_DELETE]: (state, { products_all }) => {
      state.products_all = [];
      state.products_all = products_all;
    },

    [GET_ORDERS]: (state, { orders }) => {
      state.orders = [];
      state.orders = orders
    },

    [SET_ORDER_TRACKING_NUMBER]: (state, { tracking_number }) => {
      state.tracking_number = [];
      state.tracking_number = tracking_number
    },

    [SET_MAIL_TRACKING_NUMBER]: (state, {email}) => {
      state.email = undefined;
      state.email = email;
    },

    [SET_ERROR]: (state, { error }) => {
      state.error = [];
      state.error = error;
    },
  },
  actions: {
    setProductsAll: async ({ commit }) => {
      try {
        const response = await productAdminService.getProducts();
        commit(types.GET_PRODUCTS, { products_all: response });
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },
    setOrders: async ({commit}, date) => {
      try {
        console.log("ACTION URI ", date);
        const response = await productAdminService.getOrders(date);
        console.log(response.data);
        commit(types.GET_ORDERS, {orders: response});
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },
    setSignature: async({commit}) => {
      try {
        const response = await productAdminService.getSignature();
        commit(types.GET_SIGNATURE, {signature: response});
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },
    postProduct: ({ commit }, payload) => {
      console.log(payload);
      return productAdminService
        .postProduct(payload)
        .then((response) =>
          commit(types.SET_ITEM_CREATE, {
            payload_response: response.data,
          })
        )
        .catch((error) => commit(types.SET_ERROR, { error }));
    },
    updateProduct: ({ commit }, payload) => {
      console.log("UPDATE", payload);
      return productAdminService
        .updateProduct(payload)
        .then((response) =>
          commit(types.SET_ITEM_UPDATE, {
            payload_response: response.data,
          })
        )
        .catch((error) => commit(types.SET_ERROR, { error }));
    },

    deleteProduct: async ({ commit }, id) => {
      try {
        const response = await productAdminService.deleteProduct(id);
        commit(types.GET_PRODUCTS, { products_all: response });
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },

    postTrackingNumber: async({commit}, payload) => {
      try {
        console.log(payload)
        const response = await productAdminService.postTrackingNumber(payload);
        commit(types.SET_ORDER_TRACKING_NUMBER, {tracking_number: response});
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },
    sendEmailTrackingNumber: async({commit}, payload) => {
      try {
        const response = await productAdminService.mailSendTrackingNumber(payload);
        commit(types.SET_MAIL_TRACKING_NUMBER, {email: response});
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    }
  },
  getters: {
    getProductsAll: (state) => {
      return state.products_all;
    },
    getOrders: (state) => {
      return state.orders;
    }
  },
};
export default productAdminModule;
