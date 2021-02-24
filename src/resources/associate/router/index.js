const Associate = () => import("../view/Associate.vue");
const Panel = () => import("../components/Panel.vue");
const Products = () => import("../components/Products.vue");

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
    ],
  },
];
