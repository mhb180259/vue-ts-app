import Vue from 'vue'
import { addClass, removeClass } from './dom'
import loading from './loading.vue'
let Mask = Vue.extend(loading)

export default {
  install(Vue) {
    // 显示loading时，parent设置为position：relative，overflow：hidden
    // loading根据parent scrolltop，clientHeight设置btrf
    // 根据submit设置样式
    let toggleLoading = (el, binding) => {
      if (binding.value) {
        Vue.nextTick(() => {
          insertDom(el, el.mask, binding)
        })
      } else {
        el.mask.$on('after-leave', _ => {
          if (window.getComputedStyle(el, null).position !== el.original.position) {
            el.style.position = el.original.position
          }
          if (window.getComputedStyle(el, null).overflow !== el.original.overflow) {
            el.style.overflow = el.original.overflow
          }
        })
        el.mask.visible = false
      }
    }
    let insertDom = (parent, mask, binding) => {
      // 当父元素定位部位fixed与absolute时，设置其定位为relative
      if (window.getComputedStyle(parent, null).position !== 'absolute' && window.getComputedStyle(parent, null).position !== 'fixed') {
        parent.style.position = 'relative'
      }
      // 设置父元素为hidden，防止滚动
      parent.style.overflow = 'hidden'
      // 根据当前元素scrollTop设置mask位置
      mask.$el.style.transform = `translateY(${parent.scrollTop}px)`

      if (binding.modifiers.submit) {
        mask.submit = true
      }
      if (!parent.insertDom) {
        parent.appendChild(mask.$el)
        parent.insertDom = true
      }
      Vue.nextTick(() => {
        mask.visible = true
      })
    }
    Vue.directive('loading', {
      bind: function(el, binding) {
        let mask = new Mask({
          el: document.createElement('div')
        })
        el.original = {
          position: window.getComputedStyle(el, null).position,
          overflow: window.getComputedStyle(el, null).overflow
        }
        el.mask = mask
        toggleLoading(el, binding)
      },

      update: function(el, binding) {
        if (binding.oldValue !== binding.value) {
          toggleLoading(el, binding)
        }
      },

      unbind: function(el, binding) {
        el.mask && el.mask.parentNode && el.mask.parentNode.removeChild(el.mask)
      }
    })
  }
}
