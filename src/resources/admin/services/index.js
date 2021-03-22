import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    Accept: "application/json",
      // Authorization: `Bearer ${access_token}`,
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
    console.log(products_all.data.products);
    return products_all.data.products;
  },
  postProduct(payload) {
    console.log("POST _______");
    console.log(payload);
    return apiClient.post("/create-product", payload, {
      crossDomain: true,
    });
  },

  updateProduct(payload) {
    console.log("PUT _______");
    console.log(payload);
    const output = apiClient.put(`/product/update/${payload.id}`, payload, {
      crossDomain: true,
    });
    console.log("retorno", output.data);
    return output;
  },

  deleteProduct(id) {
    console.log("DELETE _______");
    console.log("produto excluido");
    return apiClient.delete(`/product/delete/${id}`, {
      crossDomain: true,
    });
  },

  async getOrders(date) {
    let orders;
    orders = await apiClient.get(`/orders/paid/${date}`, {
      crossDomain: true,
    });
    console.log(orders.data.orders)
    return orders.data.orders
  },

  postTrackingNumber(payload) {
    return apiClient.put(`/tracking_number/${payload.order_id}`, 
      {"tracking_number":payload.tracking}, {
      crossDomain: true,
    });
  },

  mailSendTrackingNumber(payload) {
    return apiClient.post('/mail/send-mail-tracking-number', payload, {
      crossDomain: true,
    });
  }
};
