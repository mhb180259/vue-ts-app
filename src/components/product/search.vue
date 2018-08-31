<template>
  <div class="content">
    <header-search @search="toProduct" v-model="itemName"></header-search>
  </div>
</template>
<script>
import mui from '@/utils/mui.js'
export default {
  name: 'search',
  data() {
    return {
      itemName: ''
    }
  },
  methods: {
    toProduct() {
      this.$router.push({ name: 'product-list', query: { itemName: this.itemName } })
    }
  },
  mounted() {
    const input = this.$children[0].$el.querySelector('input')
    // console.log(this.$children[0].$el.querySelector('input'))
    mui.plusReady(() => {
      var nativeWebview, imm, InputMethodManager
      let plus = window.plus
      var initNativeObjects = function() {
        if (mui.os.android) {
          var main = plus.android.runtimeMainActivity()
          var Context = plus.android.importClass('android.content.Context')
          InputMethodManager = plus.android.importClass('android.view.inputmethod.InputMethodManager')
          imm = main.getSystemService(Context.INPUT_METHOD_SERVICE)
        } else {
          nativeWebview = plus.webview.currentWebview().nativeInstanceObject()
        }
      }
      var showSoftInput = function() {
        if (mui.os.android) {
          imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED)
        } else {
          nativeWebview.plusCallMethod({
            setKeyboardDisplayRequiresUserAction: false
          })
        }
        setTimeout(function() {
          // 此处可写具体逻辑设置获取焦点的input
          input.focus()
        }, 200)
      }
      initNativeObjects()
      showSoftInput()
    })
  }
}
</script>
<style lang="css" scoped>

</style>
