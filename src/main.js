import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/scss/app.scss";

import Vuelidate from "vuelidate";
import vuetify from "./plugins/vuetify";
import VueMask from "v-mask";
import Lingallery from 'lingallery';
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
// não se esqueça de importar estilos CSS
import "tiptap-vuetify/dist/main.css";
// Os estilos CSS do vuetify
import "vuetify/dist/vuetify.min.css";

import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  Vue,
  dsn:
    "https://8759d91181904d93b3504c94be86cec9@o281685.ingest.sentry.io/5651862",
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

Vue.config.productionTip = false;
Vue.config.errorHandler = "debugger";
Vue.use(Vuelidate);
Vue.use(VueMask);
Vue.use(Lingallery);
Vue.use(TiptapVuetifyPlugin, {
  // a próxima linha é importante! Você precisa fornecer o objeto Vuetify para este lugar.
  vuetify, // o mesmo que "vuetify: vuetify"
  // opcional, o padrão é 'md' (ícones de vuetify padrão antes da v2 .0.0)
  iconsGroup: "mdi",
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
