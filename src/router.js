import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Smoothie from './views/Smoothie.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/smoothies/:smoothieID',
      name: 'Smoothie',
      component: Smoothie
    }
  ]
});
