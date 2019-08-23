import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from "vue";
import './plugins/bootstrap-vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSnackbar from "vue-snack";
import ButtonSpinner from "@/components/globals/ButtonSpinner";

// loads the Icon plugin
window._ = require("lodash");

require("vue-snack/dist/vue-snack.min.css");

Vue.config.productionTip = false;

window.Event = new Vue();

Vue.use(VueSnackbar, {});

Vue.component("button-spinner", ButtonSpinner);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
