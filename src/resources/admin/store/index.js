import Vue from "vue";
import Vuex from "vuex";

import * as types from "./mutations_types";
import {
  GET_PRODUCTS,
  SET_IMAGE,
  GET_IMAGES,
  DELETE_IMAGE,
  SET_ERROR,
  SET_ITEM_CREATE,
  SET_ITEM_UPDATE,
  SET_ITEM_DELETE,
  GET_ORDERS,
  SET_ORDER_TRACKING_NUMBER,
  SET_ORDER_CHECKED,
  SET_MAIL_TRACKING_NUMBER
} from "./mutations_types";

import productAdminService from "../services/index.js";
import ImageService from "../services/imageService.js"

Vue.use(Vuex);

const productAdminModule = {
  namespaced: true,
  state: {
    products_all: [],
    product: [],
    image: '',
    orders: [],
    tracking_number: [],
    email: undefined,
    checked: undefined,
    error: [],
  },
  mutations: {
    [GET_PRODUCTS]: (state, { products_all }) => {
      state.products_all = [];
      state.products_all = products_all;
    },

    [SET_IMAGE]: (state, { image }) => {
      state.image = '';
      state.image = image;
    },
    [GET_IMAGES]: (state, { images }) => {
      console.log(`IMAGES  ${state.images}`)
      state.images = []
      state.images = images
    },
    [DELETE_IMAGE]: ({id, image} ) => {
      var index = image.findIndex(image => image.id == id)
      image.splice(index, 1)
    },

    [SET_ITEM_CREATE]: (state, { products_all }) => {
      console.log(products_all)
      state.products_all.push(products_all)
    },

    [SET_ITEM_UPDATE]: (state, { product_all}) => {
      state.product = [];
      state.product= product_all;
    },

    [SET_ITEM_DELETE]: (state, { products_all }) => {
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

    [SET_ORDER_CHECKED]: (state, { checked }) => {
      state.checked = checked;
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

    setImage: async ({commit}, payload) => {
      try {
        console.log(payload.image)
        const response = await ImageService.upload_image(payload.product_id, payload.image);
        console.log(response.data)
        commit(types.SET_IMAGE, {image: response.data});
      } catch (error) {
        commit(types.SET_ERROR, { error })
      }
        
    },
    postImageGallery: async ({commit}, payload) => {
      try {
        console.log(payload)
        const response = await ImageService.upload_image_gallery(payload.product_id, payload.image);
        console.log(response.data)
        commit(types.GET_IMAGES, {images : response.data});
      } catch (error) {
        commit(types.SET_ERROR, { error })
      }
    },
    deleteImageGallery: async ({commit, rootState}, id) => {
      try {
        await productAdminService.deleteImage(id)
        console.log(`IMAGES  ${rootState.product.images}`)
        const image = rootState.product.images
        commit(types.DELETE_IMAGE, {id: id, image: image})
      } catch (error) {
        commit(types.SET_ERROR, { error })
      }
    },
    setOrders: async ({commit}, payload) => {
      try {
        console.log("ACTION URI ", payload);
        const response = await productAdminService.getOrders(payload.dates, payload.status);
        commit(types.GET_ORDERS, {orders: response});
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
            products_all: response.data,
          })
        )
        .catch((error) => commit(types.SET_ERROR, { error }));
    },
    
    updateProduct: async ({ commit }, payload) => {
      try {
        console.log("UPDATE", payload);
        const response = await productAdminService.updateProduct(payload)
        commit(types.SET_ITEM_UPDATE, {product: response});
        } catch (error) {
          commit(types.SET_ERROR, { error });
        }
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
    postCheckedOrder: async({commit}, payload) => {
      try {
        console.log(payload)
        const response = await productAdminService.postCheckedOrder(payload);
        commit(types.SET_ORDER_CHECKED, response);
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
    },
    getImage: (state) => {
      return state.image;
    }
  },
};
export default productAdminModule;
