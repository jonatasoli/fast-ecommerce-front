import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    //   Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const getProducts = async () => {
  const products = await apiClient.get("/product/showcase/all", {
    crossdomai: true,
  });
  return products.data.products;
};
