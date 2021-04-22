import axios from "axios";

const apiClientUpload = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    // Authorization: `Bearer ${access_token}`,
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  },
});

export default {
  upload_image(image) {
    return apiClientUpload.post("/product/upload-image", image, {
      crossDomain: true,
    });
  },
};
