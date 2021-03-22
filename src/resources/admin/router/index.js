import adminDashboard from "./../views/AdminDashboard.vue";
import adminOrders from "./../views/AdminOrders.vue";
import adminProduct from "./../views/AdminProduct.vue";
import TableOrders from "./../components/TableOrders.vue";

export default [
  {
    path: "/admdash",
    component: adminDashboard,
    name: "ADMIN",
  },
  {
    path: "/admdash/pedidos",
    component: adminOrders,
    name: "adminOrders",
    children: [
      {
        path: "table/:date",
        component: TableOrders,
        name:"tableOrders"
        
      }
    ]
  },
  {
    path: "/admdash/produtos",
    component: adminProduct,
    name: "AdminProduct",
  },
];
