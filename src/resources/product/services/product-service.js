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
  async getProductDetail(uri) {
    console.log("SERVER URI", uri);
    let product = await apiClient.get(`/product/${uri}`, { crossDomain: true });
    console.log("PRODUCT --- ", product);
    return product;
  },
  async getProductShowcase() {
    let products;
    products = await apiClient.get(`/product/showcase/all`, {
      crossDomain: true,
    });
    console.log(products.data.products)
    return products.data.products;
  },
  async getProductCategory(path) {
    let products;
    products = await apiClient.get(`/product/category/products/${path}`, {
      crossDomain: true,
    });
    console.log(products.data.products)
    return products.data.product;
  },
  postInstallments(cart) {
    console.log("POST _______");
    console.log(cart);
    return apiClient.post(
      "/product/cart/installments",
      { cart: cart },
      {
        crossDomain: true,
      }
    );
  },
  postCheckout(checkout) {
    console.log("POST _______");
    console.log(checkout);
    return apiClient.post("/direct-sales/checkout", checkout, {
      crossDomain: true,
    });
  },
  calculateShipping(payload) {
    console.log("CART SHIP ", payload);
    return apiClient.post("/zip_code/shipping/calc", payload, {
      crossDomain: true,
    });
  },
};
