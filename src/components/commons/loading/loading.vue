<template>
  <transition name="loading-fade" @after-leave="handleAfterLeave">
    <div v-show="visible" class="loading-mask" :class="{'black': submit}">
      <div class="loading-spinner">
        <img src="./assets/loading-spin.svg" width="512" height="64" />
      </div>
    </div>
  </transition>
</template>
<script lang="es6">
export default {
  name: 'Loading',
  data() {
    return {
      text: null,
      visible: false,
      submit: false,
      customClass: ''
    }
  },
  methods: {
    handleAfterLeave() {
      this.$emit('after-leave')
    }
  }
}
</script>
<style lang="css" scoped>
.loading-mask {
  position: fixed;
  z-index: 999999;
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
  background-color: transparent;
}
.loading-mask.black {
  background-color: transparent;
}
.loading-spinner {
  top: 50%;
  margin-top: -32px;
  width: 100%;
  text-align: center;
  position: absolute;
}
.loading-mask.is-fullscreen {
  position: fixed;
}
.loading-mask.is-fullscreen .loading-spinner {
  margin-top: -25px;
}
.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: opacity 0.5s;
}
.loading-fade-enter,
.loading-fade-leave-active {
  opacity: 0;
}
</style>
