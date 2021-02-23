import Vue from "vue";
import Vuex from "vuex";
import productModule from "@/resources/product/store";
import shoppingCartModule from "@/resources/shopping-cart/store";
import homeModule from "@/resources/home/store";
import userModule from "@/resources/user/store";
import productAdminModule from "@/resources/admin/store";
import associateModule from "@/resources/associate/store";

Vue.use(Vuex);

const state = {
  erro: undefined,
  shopping_cart: [],
  transaction: [],
  product: [],
  upsell: [],
  direct_sales: [],
  checkout: [],
  checkout_response: [],
};

import * as types from "./mutations_types";
import {
  DIRECT_SALE_CHECKOUT,
  DIRECT_SALE_RESPONSE_CHECKOUT,
  DIRECT_SALE_PRODUCT,
  DIRECT_SALE_PRODUCT_UPSELL_LIST,
  SET_ERROR,
  SET_SHOPPING_CART,
  SET_ITEM_SHOPPING_CART,
} from "./mutations_types";
import DirectSalesService from "./../services/product_direct_sales_service";

const mutations = {
  [DIRECT_SALE_CHECKOUT]: (state, { transaction }) => {
    state.transaction = transaction;
  },
  [DIRECT_SALE_RESPONSE_CHECKOUT]: (state, { checkout_response }) => {
    console.log(checkout_response);
    state.checkout_response = checkout_response;
  },
  [DIRECT_SALE_PRODUCT]: (state, { product }) => {
    state.product = product;
  },
  [DIRECT_SALE_PRODUCT_UPSELL_LIST]: (state, { upsell }) => {
    state.upsell = upsell;
  },
  [SET_ITEM_SHOPPING_CART]: (state, { product }) => {
    state.shopping_cart.push(product);
  },
  [SET_SHOPPING_CART]: (state, { product }) => {
    state.shopping_cart = product;
  },
  [SET_ERROR]: (state, { error }) => {
    state.error = error;
  },
};

const actions = {
  postCheckout: ({ commit }, payload) => {
    console.log("entrou no checkout");
    console.log(payload);
    return DirectSalesService.postCheckout(payload)
      .then((response) =>
        commit(types.DIRECT_SALE_RESPONSE_CHECKOUT, {
          checkout_response: response.data,
        })
      )
      .catch((error) => commit(types.SET_ERROR, { error }));
  },
  getDirectSalesProduct: async ({ commit }, { uri }) => {
    try {
      const response = await DirectSalesService.getDirectSalesProduct(uri);
      commit(types.DIRECT_SALE_PRODUCT, { product: response.data });
      commit(types.SET_ITEM_SHOPPING_CART, { product: response.data });
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
  },
  addShoppingCart: async ({ commit }, { product }) => {
    try {
      commit(types.SET_ITEM_SHOPPING_CART, { product });
    } catch (error) {
      commit(types.SET_ERROR, { error });
    }
  },
  resetShoppingCart: async (commit) => {
    try {
      commit(types.SET_SHOPPING_CART, undefined);
    } catch (error) {
      commit(types.SET_ERROR, { error });
    }
  },
};

const getters = {
  ProductURI: (state) => (uri) => state.product.uri === uri,
  totalCart: (state) => {
    let sumTotalCart = 0;
    let _product = state.shopping_cart;
    let _item = undefined;
    for (_item in state.shopping_cart) {
      sumTotalCart += _product[_item].price;
    }
    sumTotalCart = sumTotalCart / 100;
    return parseFloat(sumTotalCart).toFixed(2);
  },
  getShoppingCart: (state) => {
    return state.shopping_cart;
  },
};

export default new Vuex.Store({
  modules: {
    product: productModule,
    cart: shoppingCartModule,
    category: homeModule,
    user: userModule,
    productAdmin: productAdminModule,
    associate: associateModule,
  },
  state,
  mutations,
  actions,
  getters,
});
