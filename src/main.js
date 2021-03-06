import newsfeed from './newsfeed'
import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSnackbar from 'vue-snack'
import VueGoogleCharts from 'vue-google-charts'

import BlockBox from './components/BlockBox'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import moment from 'moment'

moment.locale('de')

library.add(fas)
library.add(fab)
library.add(far)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('block-box', BlockBox)

// loads the Icon plugin
window._ = require('lodash')

require('vue-snack/dist/vue-snack.min.css')

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(VueSnackbar, {})
Vue.use(VueGoogleCharts)

window.newsfeed = newsfeed
window.vueInstance = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
