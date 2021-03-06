const Associate = () => import("../view/Associate.vue");
const Panel = () => import("../components/Panel.vue");
const Products = () => import("../components/Products.vue");
const Sales = () => import("../components/Sales.vue");
const Balance = () => import("../components/Balance.vue");
const Report = () => import("../components/Report.vue");
export default [
  {
    path: "/parceiro",
    component: Associate,
    name: "Associate",
    children: [
      {
        path: "/parceiro",
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
        path: "relatórios",
        component: Report,
        name: "Parceiro-relatórios",
      },
    ],
  },
];
