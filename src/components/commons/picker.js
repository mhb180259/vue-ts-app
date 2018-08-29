/**
 * this.$toast.show({ message: 'SUCCESS2', type: 'error' })
 * message显示字符
 * type为图标类型，分为error、success，为其他字符时，不显示图标
 */
import Vue from 'vue'
import { throttle } from 'lodash'
import picker from './picker.vue'
let PickerConstructor = Vue.extend(picker)

let instance
let initInstance = function() {
  instance = new PickerConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}
let showPicker = function(options) {
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
    showPicker(options)
  }, 500)()
}

export default { show }
