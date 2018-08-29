import Vue from 'vue'
import { throttle } from 'lodash'
import gift from './gift.vue'
let GiftConstructor = Vue.extend(gift)

let instance
let initInstance = function () {
  instance = new GiftConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}
let showGift = function (options) {
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

const show = function (options = {}) {
  throttle(function () {
    showGift(options)
  }, 500)()
}

export default { show }
