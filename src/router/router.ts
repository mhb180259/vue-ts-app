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
          component: () => import(/* webpackChunkName: "home" */'@/components/home/index.vue')
        },
        // {
        //   path: 'about-me',
        //   name: 'about-me',
        //   component: () => import('@/components/my/about-me.vue'),
        //   meta: { auth: true }
        // }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login/Login.vue')
    },
  ],
});
