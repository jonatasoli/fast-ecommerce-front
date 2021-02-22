import adminDashboard from "./../views/AdminDashboard.vue"
import adminProduct from "./../views/AdminProduct.vue"

export default [
  {
    path: "/admdash",
    component: adminDashboard,
    name: "ADMIN",
  },
  {
    path: "/admdash/produtos",
    component: adminProduct,
    name: "AdminProduct"
  }
];
