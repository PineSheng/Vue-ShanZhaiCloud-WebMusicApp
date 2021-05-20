import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
//import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import detail from './utils/require.js'
import seconds from './commFunction/commom'
Vue.use(ElementUI);

Vue.config.productionTip = false
//Vue.prototype.$axios = axios
Vue.prototype.$http = detail
Vue.prototype.$seconds = seconds

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
