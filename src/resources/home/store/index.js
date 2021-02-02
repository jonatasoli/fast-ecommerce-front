import Vue from "vue";
import Vuex from "vuex";

import * as types from "./mutations_types";
import {
    SET_ERROR,
    SET_CATEGORYS,
} from "./mutations_types";
import homeService from "./../services/home-services";

Vue.use(Vuex);

const homeModule = {
    namespaced:  true,
    state: {
        error: undefined,
        categorys: [],
        products: [],
    },
    mutations: {
        [SET_CATEGORYS]: (state, { categorys }) => {
            state.categorys = [];
            state.categorys = categorys;
        },
        [SET_ERROR]: (state, { error }) => {
            state.error = error;
        },
    },
    actions: {
        setCategorys: async ({commit}) => {
            try {
                const response = await homeService.getCategorys();
                commit(types.SET_CATEGORYS, {categorys: response});
            } catch (error) {
                commit(types.SET_ERROR, {error});
            }
        },
    },
    getters: {
        getCategory: (state) => {
            return state.categorys;
        },
    },
};

export default homeModule;