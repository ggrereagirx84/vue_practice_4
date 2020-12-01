import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import Firebase from "./firebase"

Vue.config.productionTip = false
Firebase.init();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
