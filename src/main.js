import newsfeed from './newsfeed'
import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from "vue";
import './plugins/bootstrap-vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSnackbar from "vue-snack";

// loads the Icon plugin
window._ = require("lodash");

require("vue-snack/dist/vue-snack.min.css");

Vue.config.productionTip = false;
Vue.config.devtools = true

Vue.use(VueSnackbar, {});

window.newsfeed = newsfeed
window.vueInstance = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
