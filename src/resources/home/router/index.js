import Home from "./../views/Home.vue";
import Showcase from "./../../product/views/Showcase.vue";
import About from "./../../about/About.vue";
import Contact from "./../../contact/Contact.vue";

export default [
  {
    path: "/",
    component: Home,
    name: "USER",
  },
  {
    path: "/produtos/:path",
    component: Showcase,
    name: "ProductCategory",
  },
  {
    path: "/quem-somos",
    component: About,
    name: "About",
  },
  {
    path: "/contato",
    component: Contact,
    name: "Contact",
  },
];
