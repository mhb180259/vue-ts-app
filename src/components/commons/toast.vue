<template>
  <transition name="toast-fade">
    <div class="model" v-show="show">
      <div class="toast">
        <div class="iconfont icon-chenggong1" v-if="type === 'success'"></div>
        <div class="iconfont icon-cuowu" v-if="type === 'error'"></div>
        <div>{{message|filtcn}}</div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'toast',
  props: {
    show: Boolean,
    message: String,
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  filters: {
    filtcn: function (value) {
      if (window.is_debug_msg) {
        return value
      }
      if (/[\u3220-\uFA29]/.test(value)) return 'error'
      return value
    }
  }
}
</script>
<style lang="scss" scoped>
.model {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.toast {
  background-color: rgba(0, 0, 0, 0.8);
  width: 400px;
  padding: 20px;
  margin: 50% auto;
  color: #fff;
  border-radius: 30px;
  text-align: center;
}
.iconfont {
  font-size: 100px;
}
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.7s;
}
.toast-fade-leave-active {
  opacity: 0;
}
</style>
