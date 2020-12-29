const ShoppingCart = () => import("./../views/ShoppingCart.vue");
const Checkout = () => import("./../views/Checkout.vue");
const ShoppingPaymentProcess = () => import("./../views/PaymentProcess.vue");

export default [
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
