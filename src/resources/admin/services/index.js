import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
      Accept: "application/json",
    //   Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  export default {
      async getProducts() {
          let products_all;
          products_all = await apiClient.get("/product/product/all", {
              crossDomain: true,
          });
          console.log(products_all.data.products)
          return products_all.data.products
      },
      postProduct(payload) {
        console.log("POST _______");
        console.log(payload);
        return apiClient.post("/create-product", payload , {
          crossDomain: true,
        })
      }

  }