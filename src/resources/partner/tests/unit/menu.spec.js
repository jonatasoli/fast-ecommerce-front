import Vue from "vue";
import Vuetify from "vuetify";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Menu from "../../components/MenuPartner.vue";
import router from "@/router";
Vue.use(Vuetify);
const localVue = createLocalVue();

describe("Menu", () => {
  let vuetify;
  let wrapper;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = shallowMount(Menu, { localVue, vuetify, router });
  });
  it("should render", () => {
    expect(wrapper.find(".home-style").exists()).toBe(true);
  });
});
