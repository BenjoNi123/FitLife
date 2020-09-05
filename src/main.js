import Vue from 'vue'
import App from './App.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify';
import axios from 'axios';
import Routes from './routes.js'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: 'mdi'
})
window.axos = require('axios')
Vue.prototype.$http = axios
const app = new Vue({
  el: '#app',
  router: Routes,
  vuetify,
  render: h => h(App)
}).$mount('#app')

export default app;