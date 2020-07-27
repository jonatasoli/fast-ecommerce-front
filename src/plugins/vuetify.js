import "@fortawesome/fontawesome-free/css/all.css"
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: {
      background: "#18121E",
      color: "blue",
      active: "red"
    }
  },
  icons: {
    iconfont: "fa"
  }
})
