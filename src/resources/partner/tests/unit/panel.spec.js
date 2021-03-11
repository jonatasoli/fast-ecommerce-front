import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import router from "@/router";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Panel from "../../components/Panel.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuetify);

describe("Panel", () => {
  let wrapper;
  let vuetify;
  let store;
  let getters;
  beforeEach(() => {
    getters = {
      getProfits: () => ({
        daily_gain: 0,
        refund: 0,
        day: 1,
      }),
      getAvailableAmount: () => ({
        total: 100,
        refund: 50,
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
    wrapper = shallowMount(Panel, { localVue, vuetify, router, store });
  });

  it("should render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should have available amount total", () => {
    const value = wrapper.findAll(".fixed-height").at(0);
    expect(value.text()).toBe(`Total: ${getters.getAvailableAmount().total}`);
  });
  it("should have available amount refund", () => {
    const value = wrapper.findAll(".fixed-height").at(1);
    expect(value.text()).toBe(
      `Reembolsos: ${getters.getAvailableAmount().refund}`
    );
  });
  it("should have refund percentage", () => {
    const value = wrapper.findAll(".fixed-height").at(2);
    expect(value.text()).toBe(
      `Porcentagem de reembolsos: ${
        (getters.getAvailableAmount().refund * 100) /
        getters.getAvailableAmount().total
      }%`
    );
  });
});
