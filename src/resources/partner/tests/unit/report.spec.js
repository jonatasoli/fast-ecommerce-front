import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Report from "../../components/Report.vue";

Vue.use(Vuetify);
const localVue = createLocalVue();

describe("Report", () => {
  let vuetify;
  let wrapper;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = shallowMount(Report, { localVue, vuetify });
  });
  it("should render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
