import Vue from 'vue'
import App from './App.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify';
import axios from 'axios';
import Routes from './routes.js'

Vue.config.productionTip = false;

window.baseUrl = (
  document.URL.includes('localhost') || document.URL.includes('127.0.0.1')
) ? "http://localhost:3000/" : "https://fit-life-backend.herokuapp.com/";

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