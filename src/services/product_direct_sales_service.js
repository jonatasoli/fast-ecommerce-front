import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

export default {
  getDirectSalesProduct(uri) {
    alert(process.env.VUE_APP_BASE_URL);
    return apiClient.get(`/direct-sales/product/${uri}`, { crossDomain: true });
  },
  getDirectSalesUpsell(id) {
    return apiClient.get(`/direct-sales/upsell/${id}`, { crossDomain: true });
  },
  postCheckout(checkout) {
    console.log("POST _______");
    console.log(checkout);
    return apiClient.post("/direct-sales/checkout", checkout, {
      crossDomain: true
    });
  }
};
