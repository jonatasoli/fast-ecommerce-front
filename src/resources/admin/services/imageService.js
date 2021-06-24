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
  upload_image(product_id, image) {
    console.log(image)
    return apiClientUpload.post(`/product/upload-image/${product_id}`, image, {
      crossDomain: true,
    });
  },
  upload_image_gallery(product_id, image) {
    return apiClientUpload.post(`/product/upload-image-gallery/?product_id=${product_id}`, image, {
      crossDomain: true,
    }) ;
  }
};
