import store from '../store'
const vip = store.getters.vip
export default {
  toVip (items) {
    console.log('vip: ', vip)

  }
}
