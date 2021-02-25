import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/scss/app.scss";

import Vuelidate from "vuelidate";
import vuetify from "./plugins/vuetify";
import VueMask from "v-mask";

import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  Vue,
  dsn: "https://8759d91181904d93b3504c94be86cec9@o281685.ingest.sentry.io/5651862",
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

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
