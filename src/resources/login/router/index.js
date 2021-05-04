const Login = () => import("./../views/Login.vue");
const ResetPassword = () => import("./../views/ResetPassword.vue");

export default [
  {
    path: "/login",
    component: Login,
    name: "Login",
  },
  {
    path: "/redefinir-senha",
    component: ResetPassword,
    name: "ResetPassword",
    props: true,
  }
  
];
