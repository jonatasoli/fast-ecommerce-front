import Home from "./../views/Home.vue"
import Showcase from "./../../product/views/Showcase.vue"

export default [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
  {
    path: "/:id",
    component: Showcase,
    name: "ProductCategory",
  }
];
