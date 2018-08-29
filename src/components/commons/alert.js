/**
 * this.$alert.show({ message: 'SUCCESS2', type: 'error' })
 * message显示字符
 * type为图标类型，分为error、success，为其他字符时，不显示图标
 */
import Vue from 'vue';
import { throttle } from 'lodash';
import alert from './alert.vue';
let AlertConstructor = Vue.extend(alert);

let instance
let initInstance = function() {
  instance = new AlertConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}
let showAlert = function(options) {
  if (!instance) {
    initInstance()
  }
  if (!instance.show) {
    for (let prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop]
      }
    }
    instance.show = true
    // setTimeout(() => (instance.show = false), 1500)
  }
}

const show = function(options) {
  throttle(function() {
    showAlert(options)
  }, 500)()
}

const hide = function() {
  instance.show = false
}

export default { show, hide }
