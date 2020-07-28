import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getDirectSalesProduct(uri) {
    return apiClient.get(`/direct-sales/product/${uri}`);
    // return apiClient.get(`/product/${uri}`);
  },
  getDirectSalesUpsell(id) {
    return apiClient.get(`/direct-sales/upsell/${id}`);
    // return apiClient.get(`/upsell/${id}`);
  },
  postCheckout(checkout) {
    return apiClient.post("/direct-sales/checkout", checkout);
    // return apiClient.post("/checkout", checkout);
  }
};
