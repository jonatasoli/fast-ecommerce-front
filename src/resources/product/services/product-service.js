import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default {
  async getProductDetail(id) {
    console.log("SERVER ID ", id);
    let product = await apiClient.get(`/product/${id}`, { crossDomain: true });
    console.log("PRODUCT --- ", product);
    return product;
  },
  async getProductShowcase() {
    let products;
    products = await apiClient.get(`/product/showcase/all`, {
      crossDomain: true,
    });
    return products.data.products;
  },
};
