<template>
  <div class="shade" v-show="show">
    <div class="alert">
      <div class="alert-main">
        <div class="iconfont icon-chenggong1" v-if="type === 'success'"></div>
        <div class="iconfont icon-cuowu" v-if="type === 'error'"></div>
        <div>{{message}}</div>
      </div>
      <div class="alert-footer">
        <div class="alert-footer-btn" v-if="cancel !== undefined" @click="cancel">Cancel</div>
        <div class="alert-footer-btn bold" v-if="confirm !== undefined" @click="confirm">Confirm</div>
      </div>
    </div>
  </div>
</template>
<script lang="js">
export default {
  name: 'alert',
  props: {
    show: Boolean,
    message: String,
    cancel: Function,
    confirm: Function,
    type: {
      type: String,
      default: 'success'
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
/*@import '../assets/scss/variables.less';*/
.shade {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
}
.alert {
  background-color: #fff;
  width: 540px;
  margin: 50% auto;
  border-radius: 30px;
}
.alert-main {
  padding: 20px;
  text-align: center;
  .iconfont {
    font-size: 100px;
    &.icon-chenggong1 {
      color: #63e237;
    }
    &.icon-cuowu {
      color: red;
    }
  }
}
.alert-footer {
  /*border-top: 1px solid $line-color;*/
  height: 90px;
  line-height: 90px;
  font-size: 0;
  display: flex;
}
.alert-footer-btn {
  // display: inline-block;
  // width: 50%;
  flex: 1;
  /*border-right: $line-color;*/
  font-size: 28px;
  text-align: center;
  &:last-of-type {
    border-right: none;
  }
}
</style>
