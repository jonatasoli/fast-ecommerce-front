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
    }
}