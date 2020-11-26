const Showcase = () => import("./../views/Showcase.vue");
const ProductDetail = () => import("./../views/ProductDetail.vue");
const ShoppingCart = () => import("./../views/ShoppingCart.vue");
const Checkout = () => import("./../views/Checkout.vue");
const ShoppingPaymentProcess = () => import("./../views/PaymentProcess.vue");

export default [
  {
    path: "/destaque",
    component: Showcase,
    name: "Showcase",
  },
  {
    path: "/produto/:id",
    component: ProductDetail,
    name: "ProductDetail",
  },
  {
    path: "/carrinho",
    component: ShoppingCart,
    name: "ShoppingCart",
  },
  {
    path: "/checkout",
    component: Checkout,
    name: "Checkout",
  },
  {
    path: "/checkout/payment-process",
    component: ShoppingPaymentProcess,
    name: "ShoppingPaymentProcess",
  },
];
