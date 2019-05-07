import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Smoothie from './views/Smoothie.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/smoothies/:smootieID',
      name: 'smoothie',
      component: Smoothie
    }
  ]
});
