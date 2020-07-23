import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getDirectSalesProduct(uri) {
    // return apiClient.get(`/direct_sales/product/${uri}`);
    return apiClient.get(`/product/${uri}`);
  },
  getDirectSalesUpsell(id) {
    // return apiClient.get(`/direct_sales/upsell/${id}`);
    return apiClient.get(`/upsell/${id}`);
  },
  postCheckout(checkout) {
    // return apiClient.post("/direct_sales/checkout", checkout);
    return apiClient.post("/checkout", checkout);
  }
};
