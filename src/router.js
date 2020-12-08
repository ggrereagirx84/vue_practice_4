import Vue from "vue";
import Router from "vue-router";
import SineUp from "./components/SineUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

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
    }
  ]
});