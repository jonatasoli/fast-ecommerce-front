import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Products from "../../components/Products.vue";

const localVue = createLocalVue();
Vue.use(Vuetify);
localVue.use(Vuex);

describe("Products", () => {
  let wrapper;
  let vuetify;
  beforeEach(() => {
    const getters = {
      products: () => ({
        name: "Paçoca",
        description: "tem doce e salgada",
        image_path: "",
        uri: "De várias marcas",
        price: 0.5,
      }),
    };
    vuetify = new Vuetify();
    const store = new Vuex.Store({
      modules: {
        partner: {
          namespaced: true,
          getters,
        },
      },
    });
    wrapper = shallowMount(Products, { localVue, vuetify, store });
  });
  it("should render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
