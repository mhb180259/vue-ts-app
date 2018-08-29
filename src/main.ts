import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';
// import '~com';

import '@/style/index.less'
import '@/assets/font/iconfont.css'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
