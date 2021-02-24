const Associate = () => import("../view/Associate.vue");
const Panel = () => import("../components/Panel.vue");

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
  },
];
