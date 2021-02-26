import Vue from "vue";
import Vuex from "vuex";

import * as types from "./mutations_types";
import {
  SET_SHOWCASE,
  SET_ERROR,
  GET_PRODUCT_DETAIL,
} from "./mutations_types";
import productService from "./../services/product-service";

Vue.use(Vuex);

const productModule = {
  namespaced: true,
  state: {
    erro: undefined,
    shopping_cart: [],
    totalPrice: 0,
    product: [],
    products: [],
    cupom: undefined,
  },
  mutations: {
    [SET_SHOWCASE]: (state, { products }) => {
      state.products = [];
      state.products = products;
    },
    [SET_ERROR]: (state, { error }) => {
      state.error = error;
    },
    [GET_PRODUCT_DETAIL]: (state, { product }) => {
      state.product = [];
      state.product = product;
    },
  },
  actions: {
    setShowcase: async ({ commit }) => {
      try {
        const response = await productService.getProductShowcase();
        commit(types.SET_SHOWCASE, { products: response });
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },
    setProductsCategory: async ({ commit }, { id }) => {
      try {
          const response = await productService.getProductCategory(id);
          commit(types.SET_SHOWCASE, {products: response});
          console.log(response)
      } catch (error) {
          commit(types.SET_ERROR, {error});
      }
    },
    getProduct: async ({ commit }, { uri }) => {
      try {
        console.log("ACTION URI ", uri);
        const response = await productService.getProductDetail(uri);
        console.log(response.data);
        commit(types.GET_PRODUCT_DETAIL, { product: response.data });
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },
  },

  getters: {
    getShowcase: (state) => {
      return state.products;
    },
    getShoppingCart: (state) => {
      return state.shopping_cart;
    },
  },
};

export default productModule;
