/**
 * this.$preview.show({ items, index })
 * item为{src, h, w}的数组，保存图片信息
 * index为图片顺序，默认为0
 */
import Vue from 'vue'
import preview from './preview-image.vue'
let PreviewConstructor = Vue.extend(preview)

let instance
let initInstance = function() {
  instance = new PreviewConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}
let showPreview = function(options) {
  if (!instance) {
    initInstance()
  }
  for (let prop in options) {
    if (options.hasOwnProperty(prop)) {
      instance[prop] = options[prop]
    }
  }
  instance.init()
}

const show = function(options) {
  showPreview(options)
}

export default { show }
