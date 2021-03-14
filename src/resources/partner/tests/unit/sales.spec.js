import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Sales from "../../components/Sales.vue";

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);

describe("Sales", () => {
  let vuetify;
  let wrapper;
  beforeEach(() => {
    const getters = {
      transactions: () => [
        {
          code: "asd",
          product: {
            name: "Paçoca",
            uri: "Tem doce e salgada",
            price: 0.5,
            direct_sell: false,
            upsell: null,
            description: "Tem preço",
            image_path: "",
            active: true,
            discount: 0,
          },
          price: 0.5,
          buyerName: "João",
          sellerName: "Francisco",
          comission: 0,
          status: null,
          actions: null,
        },
      ],
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
    wrapper = shallowMount(Sales, { localVue, vuetify, store });
  });

  it("should render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
