import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/scss/app.scss";

import Vuelidate from "vuelidate";
import vuetify from "./plugins/vuetify";
import VueMask from "v-mask";

Vue.config.productionTip = false;
Vue.config.errorHandler = "debugger";
Vue.use(Vuelidate);
Vue.use(VueMask);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
