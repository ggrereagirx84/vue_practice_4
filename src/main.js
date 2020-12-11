import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import firebase from 'firebase';

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyDP25oDFSsZ_PFGa1l79fdefNAfoO7NoRw",
  authDomain: "vue-practice-4.firebaseapp.com",
  databaseURL: "https://vue-practice-4.firebaseio.com",
  projectId: "vue-practice-4",
  storageBucket: "vue-practice-4.appspot.com",
  messagingSenderId: "966662047373",
  appId: "1:966662047373:web:56f0a59001ef2aa5a0c4c4"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
