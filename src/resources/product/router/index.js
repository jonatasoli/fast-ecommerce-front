const Showcase = () => import("./../views/Showcase.vue");
const ProductDetail = () => import("./../views/ProductDetail.vue");

export default [
  {
    path: "/destaque",
    component: Showcase,
    name: "Showcase",
  },
  {
    path: "/produto/:uri",
    component: ProductDetail,
    name: "ProductDetail",
  },
];
