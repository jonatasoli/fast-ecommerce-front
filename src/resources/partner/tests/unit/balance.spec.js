import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import router from "@/router";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Balance from "../../components/Balance.vue";

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);

describe("Balance", () => {
  let vuetify;
  let wrapper;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    const getters = {
      balance: () => ({
        totalBalance: 0,
        toBeAvailable: 0,
      }),
    };
    store = new Vuex.Store({
      modules: {
        partner: {
          namespaced: true,
          getters,
        },
      },
    });
    wrapper = shallowMount(Balance, { localVue, vuetify, router, store });
  });

  it("should render Balance", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
