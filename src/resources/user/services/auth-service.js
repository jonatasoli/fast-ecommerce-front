import axios from "axios";

// const apiClient = axios.create({
//   baseURL: process.env.VUE_APP_BASE_URL,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//   },
// });

import qs from 'qs';
const loginClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {'Content-Type': 'application/x-www-form-urlencoded' },
});

const login = async (user) => {
  const response = await loginClient.post(
    "/user/token",
    qs.stringify(user)
  )
  return response.data
};

const signup = "response"

const user = "response"

export default {
  login,
  signup,
  user
}
