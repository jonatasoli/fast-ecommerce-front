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
  async getCategorys() {
    let categorys;
    categorys = await apiClient.get(`/product/category/all`, {
      crossDomain: true,
    });
    console.log(categorys.data);
    return categorys.data.category;
  },
};
