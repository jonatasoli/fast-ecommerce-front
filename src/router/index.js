import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home/views/Home.vue";

import Error404 from "../views/Error404.vue";

import DirectSales from "../views/direct_sales/DirectSales.vue";
import DirectSalesDetail from "../views/direct_sales/DirectSalesDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/lancamentos",
    component: DirectSales,
    // props busca itens
    children: [
      {
        path: ":uri",
        component: DirectSalesDetail,
        name: "direct-sales-product"
      }
    ]
  },
  {
    path: "/lancamento/:uri",
    component: DirectSalesDetail
    // props busca itens
  },
  { path: "*", component: Error404 }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
