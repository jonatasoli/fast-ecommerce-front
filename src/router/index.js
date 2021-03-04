import Vue from "vue";
import VueRouter from "vue-router";

import Error404 from "../views/Error404.vue";

import DirectSales from "../views/direct_sales/DirectSales.vue";
import DirectSalesDetail from "../views/direct_sales/DirectSalesDetail.vue";
import PaymentProccess from "../components/payment/PaymentProccess.vue";
import PaymentError from "../components/payment/PaymentError.vue";
import LoginRoutes from "@/resources/login/router";
import HomeRoutes from "@/resources/home/router";
import ProductRoutes from "@/resources/product/router";
import ShoppingCartRoutes from "@/resources/shopping-cart/router";
import AdminRoutes from "@/resources/admin/router";
import PartnerRoutes from "@/resources/partner/router";

Vue.use(VueRouter);

const routes = [
  ...AdminRoutes,
  ...LoginRoutes,
  ...HomeRoutes,
  ...ProductRoutes,
  ...ShoppingCartRoutes,
  ...PartnerRoutes,
  {
    path: "/lancamentos",
    name: "DirectSales",
    component: DirectSales,
    // props busca itens
    children: [
      {
        path: ":uri",
        component: DirectSalesDetail,
        name: "direct-sales-product",
      },
    ],
  },
  {
    path: "/lancamento/:uri",
    name: "DirectSalesDetail",
    component: DirectSalesDetail,
    // props busca itens
  },
  {
    path: "/pagamento-processado",
    name: "PaymentProccess",
    component: PaymentProccess,
  },
  {
    path: "/pagamento-erro",
    name: "PaymentError",
    component: PaymentError,
  },
  { path: "*", component: Error404 },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
