import adminDashboard from "./../views/AdminDashboard.vue";
import adminOrders from "./../views/AdminOrders.vue";
import adminTracking from "./../views/AdminTracking.vue";
import adminProduct from "./../views/AdminProduct.vue";
import TableOrders from "./../components/TableOrders.vue";
import TableTrancking from "./../components/TableTrancking.vue";

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
    path: "/admdash/codigo-rastreio",
    component: adminTracking,
    name: "adminTracking",
    children: [
      {
        path: "table-trancking/:date",
        component: TableTrancking,
        name: "tableTrancking"
      }
    ]
  },
  {
    path: "/admdash/produtos",
    component: adminProduct,
    name: "AdminProduct",
  },
];
