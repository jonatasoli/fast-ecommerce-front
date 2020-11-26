import "@fortawesome/fontawesome-free/css/all.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: {
      background: "#18121E",
      secondary: "#984B43",
      primary: "#EAC67A",
      info: "#233237",
    },
  },
  icons: {
    iconfont: "fa",
  },
});
