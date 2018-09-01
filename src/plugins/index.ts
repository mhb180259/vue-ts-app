/**
 * 此文件添加vue的全局属性或方法
 * */
import * as filters from './filters';


export default {
  install(Vue: any, { store = {} }) {
    // window.mnAction = (action, data) => {
    //   store.dispatch(action, data)
    // }
    // window.mnRoute = () => {}
    Vue.prototype.$state = (<any>store).state;
    Vue.prototype.$getters = (<any>store).getters;
    Vue.prototype.$dispatch = (<any>store).dispatch;
    // Vue.prototype.$Promise = Promise
    // Vue.prototype.$prettys = prettys
    // Vue.prototype.$checkType = checkType
    // Vue.prototype.$ltsMessage = msg => {
    //   console.log(msg)
    // }
    Vue.mixin({
      computed: {
        auth() {
          return (<any>store).state.user.auth
        },
        me() {
          return (<any>store).state.user
        }
      }
    });
    Object.keys(filters).forEach(function(key) {
      Vue.filter(key, (<any>filters)[key])
    })
  }
}
