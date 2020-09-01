import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/scss/app.scss";

import Vuelidate from "vuelidate";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.config.errorHandler = "debugger";
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
