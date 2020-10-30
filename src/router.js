import Vue from "vue";
import Router from "vue-router";
import SineUp from "./components/SineUp"

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: SineUp,
    }
  ]
});