import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Event from './views/Event.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/smoothies/:eventID',
      name: 'Smoothie',
      component: Smoothie
    }
  ]
});
