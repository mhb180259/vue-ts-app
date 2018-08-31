import Vue from 'vue';
// import alert from './alert.js';
// import picker from './picker.js';
// import toast from './toast.js';
// import date from './date.js';
// import preview from './preview-image.js';
// import gift from './gift.js';

// 导入loading指令
import loading from './loading/directive';
Vue.use(loading);

// Vue.$alert = Vue.prototype.$alert = alert;
// Vue.$toast = Vue.prototype.$toast = toast;
// Vue.$date = Vue.prototype.$date = date;
// Vue.$picker = Vue.prototype.$picker = picker;
// Vue.$preview = Vue.prototype.$preview = preview;
// Vue.$gift = Vue.prototype.$gift = gift;

// import HeadBar from './head-bar.vue';
// import InputGroup from './input-group.vue';
// import CheckBox from './check-box.vue';
// import Numbox from './numbox.vue';
// import Alert from './alert.vue';
// import Toast from './toast.vue';
// import Picker from './picker.vue';
// import Ellipsis from './ellipsis.vue';
// import CButton from './c-button.vue';
// import CountTime from './count-time.vue';
// Vue.component('head-bar', HeadBar);
// Vue.component('input-group', InputGroup);
// Vue.component('check-box', CheckBox);
// Vue.component('numbox', Numbox);
// Vue.component('Alert', Alert);
// Vue.component('Toast', Toast);
// Vue.component('Picker', Picker);
// Vue.component('Ellipsis', Ellipsis);
// Vue.component('CButton', CButton);
// Vue.component('CountTime', CountTime);

Vue.component('LoadMore', () => import('./load-more.vue'));
Vue.component('LoadBox', () => import('./load-box.vue'));
Vue.component('header-search', () => import('./header-search.vue'));
Vue.component('product-column-2', () => import('./product-column-2.vue'));
Vue.component('scroll-top', () => import('./scroll-top.vue'));

