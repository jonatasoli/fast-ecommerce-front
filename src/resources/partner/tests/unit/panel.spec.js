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
        total: 0,
        refund: 0,
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
});
