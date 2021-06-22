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
    async getUser(document) {
        let user = await apiClient.get(`user/user/${document}`);
        return user.data
    },
    async getMyOrders(user_id) {
      let orders;
      orders = await apiClient.get(`/orders?user_id=${user_id}`, {
        crossDomain: true,
      });
      console.log(orders.data.orders);
      return orders.data.orders;
    },
}