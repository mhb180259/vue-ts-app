import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/home-view.vue'),
      children: [
        {
          path: '/',
          redirect: 'home'
        },
        {
          path: 'home',
          name: 'home',
          component: () => import('@/components/home/index.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '@/components/About.vue'),
    },
  ],
});
