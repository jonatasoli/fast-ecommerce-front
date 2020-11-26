import Vue from "vue";
import Vuex from "vuex";

import * as types from "./mutations_types";
import {
  SET_SHOWCASE,
  SET_ERROR,
  GET_PRODUCT_DETAIL,
  ADD_PRODUCT_TO_CART,
  INCREMENT_PRODUCT_TO_CART,
  DECREMENT_PRODUCT_TO_CART,
  DECREMENT_PRODUCT_QUANTITY,
  RESET_SHOPPING_CART,
  SET_TOTAL_PRICE,
  SET_SHIPPING_PRICE,
  SET_ZIP_CODE,
  SET_INSTALLMENTS,
  RESPONSE_CHECKOUT,
} from "./mutations_types";
import productService from "./../services/product-service";

Vue.use(Vuex);

const productModule = {
  namespaced: true,
  state: {
    erro: undefined,
    shopping_cart: [],
    totalPrice: 0,
    shippingPrice: 0,
    zipCode: "",
    installments: [],
    transaction: [],
    product: [],
    products: [],
    checkout_response: [],
    upsell: [],
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
    [ADD_PRODUCT_TO_CART]: (state, { item }) => {
      state.shopping_cart.push(item);
    },
    [INCREMENT_PRODUCT_TO_CART]: (state, { cartItem }) => {
      // console.log(state)
      cartItem.qty++;
    },
    [SET_TOTAL_PRICE]: (state, totalPrice ) => {
      state.totalPrice = totalPrice;
    },
    [SET_SHIPPING_PRICE]: (state, shippingPrice ) => {
      state.shippingPrice = shippingPrice;
      console.log("STATE SHIPPIN", state.shippingPrice)
    },
    [DECREMENT_PRODUCT_TO_CART]: (state, cartItem ) => {
      cartItem.qty--;
    },
    [DECREMENT_PRODUCT_QUANTITY]: (state) => {
      state.product.quantity--;
    },
    [RESET_SHOPPING_CART]: (state) => {
      state.shopping_cart = [];
    },
    [SET_ZIP_CODE]: (state, zipCode) => {
      console.log("ZIP", zipCode);
      state.zipCode = zipCode;
    },
    [SET_INSTALLMENTS]: (state, { installments }) => {
      state.installments = installments;
    },
  [RESPONSE_CHECKOUT]: (state, { checkout_response }) => {
    console.log(checkout_response);
    state.checkout_response = checkout_response;
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
    getProduct: async ({ commit }, { id }) => {
      try {
        console.log("ACTION ID ", id);
        const response = await productService.getProductDetail(id);
        console.log(response.data);
        commit(types.GET_PRODUCT_DETAIL, { product: response.data });
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },
    addShoppingCart: ({ state, commit }, cart_item) => {
      try {
        const cartItem = state.shopping_cart.find(
          (item) => item.product_id === cart_item.product_id
        );
        console.log("CART ITEM", cartItem);
        if (!cartItem) {
          console.log("COMMIT");
          commit(types.ADD_PRODUCT_TO_CART, { item: cart_item });
        } else {
          console.log("add");
          commit(types.INCREMENT_PRODUCT_TO_CART, { cartItem: cartItem })
          // commit(types.INCREMENT_PRODUCT_TO_CART, cartItem)
        }
        commit(types.DECREMENT_PRODUCT_QUANTITY, cart_item);
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },
    resetShoppingCart: ({ commit }) => {
      try {
        commit(types.RESET_SHOPPING_CART);
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },
    increaseProduct: ({ commit }, productItem) => {
      try {
        console.log("ACTION ", productItem.qty)
        console.log("ACTION ", productItem)
        commit(types.INCREMENT_PRODUCT_TO_CART, { cartItem: productItem });
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },
    decrementProduct: ({ commit }, cart_item) => {
      try {
        commit(types.DECREMENT_PRODUCT_TO_CART, cart_item);
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },
    setTotalPrice: ({ commit }, totalPrice) => {
      try {
        console.log("TotalPrice ", totalPrice);
        commit(types.SET_TOTAL_PRICE, totalPrice);
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },
    setShippingPrice: ({ commit }, shippingPrice) => {
      try {
        console.log("ShippingPRice ", shippingPrice);
        commit(types.SET_SHIPPING_PRICE, shippingPrice);
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },
    setZipCode: ({ commit }, zipCode) => {
      try {
        commit(types.SET_ZIP_CODE, zipCode)
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },
    setInstallments: async ({ state, commit }) => {
      try {
        const cart = state.shopping_cart;
        console.log("INSTALL ACT", cart)
        const response = await productService.postInstallments(cart);
        commit(types.SET_INSTALLMENTS, { installments: response.data })
      } catch (error) {
        commit(types.SET_ERROR, { error });
      }
    },
    getAsyncInstallment: ({ state, commit }) => {
      const cart = state.shopping_cart;
      return productService.postInstallments(cart)
        .then((response) =>
          commit(types.SET_INSTALLMENTS, { installments: response.data })
        )
        .catch((error) => commit(types.SET_ERROR, { error }));
    },
  postCheckout: ({ commit }, payload) => {
    console.log("entrou no checkout");
    console.log(payload);
    return productService.postCheckout(payload)
      .then((response) =>
        commit(types.RESPONSE_CHECKOUT, {
          checkout_response: response.data,
        })
      )
      .catch((error) => commit(types.SET_ERROR, { error }));
  },
  },
  
  getters: {
    getShowcase: (state) => {
      return state.products;
    },
    getShoppingCart: (state) => {
      return state.shopping_cart;
    },
    getTotalPrice: (state) => {
      if (state.totalPrice) {
      return (state.totalPrice / 100);
      } else {
        return 0
      }
    },
    getShippingPrice: (state) => {
      if (state.shippingPrice) {
      return state.shippingPrice;
      } else {
        return 0
      }
    },
    getInstallments: (state) => {
      return state.installments
    },
  },
};

export default productModule;
