/**
 * this.$toast.show({ message: 'SUCCESS2', type: 'error' })
 * message显示字符
 * type为图标类型，分为error、success，为其他字符时，不显示图标
 */
import Vue from 'vue'
import { throttle } from 'lodash'
import date from './date.vue'
let DateConstructor = Vue.extend(date)

let instance
let initInstance = function() {
  instance = new DateConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}
let showDate = function(options) {
  if (!instance) {
    initInstance()
  }
  if (!instance.show) {
    options.closeFn = () => {
      instance.show = false
    }
    for (let prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop]
      }
    }
    instance.show = true
  }
}

const show = function(options) {
  throttle(function() {
    showDate(options)
  }, 500)()
}

export default { show }
