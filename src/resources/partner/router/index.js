const Partner = () => import("../view/Partner.vue");
const Panel = () => import("../components/Panel.vue");
const Products = () => import("../components/Products.vue");
const Sales = () => import("../components/Sales.vue");
const Balance = () => import("../components/Balance.vue");
const Report = () => import("../components/Report.vue");
export default [
  {
    path: "/parceiro",
    component: Partner,
    children: [
      {
        path: "",
        component: Panel,
        name: "Parceiro",
      },
      {
        path: "produtos",
        component: Products,
        name: "Parceiro-Produtos",
      },
      {
        path: "vendas",
        component: Sales,
        name: "Parceiro-Vendas",
      },
      {
        path: "saldo",
        component: Balance,
        name: "Parceiro-saldo",
      },
      {
        path: "relatorios",
        component: Report,
        name: "Parceiro-relatorios",
      },
    ],
  },
];
