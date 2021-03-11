import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import storeConfig from "../../store";
import { GET_AVAILABLE_AMOUNT } from "../../store/mutations_types";

describe("Vuex Store", () => {
  const localVue = createLocalVue();
  let store;
  beforeEach(() => {
    localVue.use(Vuex);
    store = new Vuex.Store({
      modules: {
        partner: {
          ...storeConfig,
        },
      },
    });
  });

  it("should update available_amount", () => {
    store.commit("partner/GET_TOTAL", {
      available_amount: {
        total: 100,
        refund: 50,
      },
    });
    // console.log(store.state.partner.available_amount);
    expect(store.state.partner.available_amount).toStrictEqual({
      total: 100,
      refund: 50,
    });
  });
});
