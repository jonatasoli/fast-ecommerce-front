import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  erro: undefined,
  shopping_cart: [],
  transaction: [],
  product: [],
  upsell: [],
  direct_sales: [],
  checkout: []
};

import * as types from "./mutations_types";
import {
  DIRECT_SALE_CHECKOUT,
  DIRECT_SALE_PRODUCT,
  DIRECT_SALE_PRODUCT_UPSELL_LIST,
  SET_ERROR
} from "./mutations_types";
import DirectSalesService from "./../services/product_direct_sales_service";

const mutations = {
  [DIRECT_SALE_CHECKOUT]: (state, { transaction }) => {
    state.transaction.push(transaction);
  },
  [DIRECT_SALE_PRODUCT]: (state, { product }) => {
    console.log(product);
    state.product = product;
    console.log(state.product);
  },
  [DIRECT_SALE_PRODUCT_UPSELL_LIST]: (state, { upsell }) => {
    state.upsell = upsell;
  },
  [SET_ERROR]: (state, { error }) => {
    state.error = error;
  }
};

const actions = {
  postCheckout: ({ commit }, { transaction }) => {
    return DirectSalesService.postCheckout(transaction)
      .then(response =>
        commit(types.DIRECT_SALE_CHECKOUT, { transaction: response.data })
      )
      .catch(error => commit(types.SET_ERROR, { error }));
  },
  getDirectSalesProduct: async ({ commit }, { uri }) => {
    try {
      console.log(uri);
      const response = await DirectSalesService.getDirectSalesProduct(uri);
      console.log(response.data);
      commit(types.DIRECT_SALE_PRODUCT, { product: response.data });
    } catch (error) {
      commit(types.SET_ERROR, { error });
    }
  },
  getDirectSalesUpsell: async ({ commit }, { ids }) => {
    try {
      const response = await DirectSalesService.getDirectSalesUpsell(ids);
      commit(types.DIRECT_SALE_PRODUCT_UPSELL, { upsell: response.data });
    } catch (error) {
      commit(types.SET_ERROR, { error });
    }
  }
};

const getters = {
  ProductURI: state => uri => state.product.uri === uri
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
});
