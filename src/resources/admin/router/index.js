import adminDashboard from "./../views/AdminDashboard.vue"
import adminOrders from "./../views/AdminOrders.vue"
import adminTracking from "./../views/AdminTracking.vue"
import adminProduct from "./../views/AdminProduct.vue"

export default [
  {
    path: "/admdash",
    component: adminDashboard,
    name: "ADMIN",
  },
  {
    path: "/adm/orders",
    component: adminOrders,
    name: "adminOrders",
  },
  {
    path: "/adm/tracking",
    component: adminTracking,
    name: "adminTracking",
  },
  {
    path: "/admdash/produtos",
    component: adminProduct,
    name: "AdminProduct",
  }
];
