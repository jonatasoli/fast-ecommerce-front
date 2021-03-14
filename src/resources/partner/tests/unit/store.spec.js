import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import storeConfig from "../../store";

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
    store.commit("partner/GET_AVAILABLE_AMOUNT", {
      available_amount: {
        total: 100,
        refund: 50,
      },
    });
    expect(store.state.partner.available_amount).toStrictEqual({
      total: 100,
      refund: 50,
    });
  });
  it("should update todays profits", () => {
    const todays_profit = {
      daily_gain: 100,
    };
    store.commit("partner/GET_TODAYS_PROFIT", { todays_profit });
    expect(store.state.partner.todays_profit).toStrictEqual(todays_profit);
  });
  it("should update profits", () => {
    const profits = {
      daily_gain: 100,
      refund: 10,
      day: 1,
    };
    store.commit("partner/GET_PROFIT", { profits });
    expect(store.state.partner.profits).toStrictEqual(profits);
  });
  it("should update partnerProducts", () => {
    const products = [];
    store.commit("partner/GET_PRODUCTS", { products });
    expect(store.state.partner.partnerProducts).toStrictEqual(products);
  });
});
