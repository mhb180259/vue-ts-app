/**
 * this.$toast.show({ message: 'SUCCESS2', type: 'error' })
 * message显示字符
 * type为图标类型，分为error、success，为其他字符时，不显示图标
 */
import Vue from 'vue'
import { throttle } from 'lodash'
import toast from './toast.vue'
let ToastConstructor = Vue.extend(toast)

let instance
let initInstance = function() {
  instance = new ToastConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}
let showToast = function(options) {
  if (!instance) {
    initInstance()
  }
  let time = 1500
  if (options.time) {
    time = options.time
  }
  if (!instance.show) {
    for (let prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop]
      }
    }
    instance.show = true
    setTimeout(() => (instance.show = false), time)
  }
}

const show = function(options) {
  throttle(function() {
    showToast(options)
  }, 500)()
}

export default { show }
