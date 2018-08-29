import Vue from 'vue';
import VueLazyload from 'vue-lazyload'

import App from './App.vue';
import router from './router/router';
import store from './store';
import '~com';

import '@/style/index.less'
import '@/assets/font/iconfont.css'

Vue.use(VueLazyload, {
  preload: 1.3,
  error: require('@/assets/default.png'),
  loading: require('@/assets/default.png'),
  attempt: 1
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
