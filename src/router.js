import Vue from "vue";
import Router from "vue-router";
import SineUp from "./components/SineUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import store from "./store";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: SineUp,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/dashboard',
      component: Dashboard,
      beforeEnter(to, from, next) {
        if(store.getters.getLoginUser) {
          next();
        } else {
          next('/login');
        }
      }
    }
  ]
});