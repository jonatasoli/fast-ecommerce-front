import axios from "axios";

// const apiClient = axios.create({
//   baseURL: process.env.VUE_APP_BASE_URL,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//   },
// });

import qs from "qs";
const loginClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

const login = async (user) => {
  const response = await loginClient.post("/user/token", qs.stringify(user));
  return response.data;
};

const signup = async (user) => {
  console.log("__POST")
  console.log(user)
  return await loginClient.post("/user/signup", user)
};

const user = "response";

const userTokenResetPassword = async (document) => {
  return await loginClient.post(`/user/request-reset-password?document=${document}`)
}

const resetPassword = async (user) => {
  return await loginClient.put("/user/reset-password", user)
}

export default {
  login,
  signup,
  user,
  userTokenResetPassword,
  resetPassword
};
