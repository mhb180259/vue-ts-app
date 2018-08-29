<template>
  <div class="numbox" :class="disable ? 'disable':''">
    <div class="numbox-minus"><span @click="changeClick(value - 1)">-</span></div>
    <div v-if="disable" style="font-size: 28px" class="numbox-input">{{value}}</div>
    <input v-if="!disable" class="numbox-input" :class="disable ? 'disable':''" type="number" :value="value" @change="changeNum($event.target.value)" @input="change($event.target.value)">
    <div class="numbox-plus">
      <span @click="changeClick(value + 1)">+</span></div>
  </div>
</template>
<script>
export default {
  name: 'numbox',
  props: {
    value: {
      type: Number,
      default: 0
    },
    mix: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 999
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    emitNum(value) {
      this.$el.querySelector('input[type="number"]').value = value
      this.$emit('input', value)
      this.$emit('change', value)
    },
    changeNum(value) {
      value = parseInt(value)
      if (value < this.mix) {
        value = this.mix
      }
      this.emitNum(value)
    },
    changeClick(value) {
      if (this.disable) {
        return
      }
      value = parseInt(value)
      if (value > this.max) {
        value = this.max
      } else if (value < this.mix) {
        value = this.mix
      }
      this.emitNum(value)
    },
    change(value) {
      if (this.disable) {
        return
      }
      value = parseInt(value)
      if (!(value >= 0)) {
        value = 0
      }
      if (value > this.max) {
        value = this.max
      }
      this.emitNum(value)
    }
  }
}
</script>
<style lang="scss" scoped>
.disable {
  color: #a3a3a3 !important;
}
.numbox {
  display: inline-block;
  width: 176px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #a3a3a3; /*no*/
  border-radius: 20px;
  font-size: 0;
  color: #585858;
  div {
    display: inline-block;
  }
  span {
    padding: 20px;
  }
  .numbox-minus,
  .numbox-plus {
    text-align: center;
    line-height: 36px;
    font-size: 28px;
    width: 50px;
  }
  .numbox-input {
    vertical-align: top;
    outline: none;
    border-top: 0;
    border-bottom: 0;
    border-left: 1px solid #a3a3a3;
    border-right: 1px solid #a3a3a3;
    height: 36px;
    line-height: 36px;
    width: 72px;
    text-align: center;
  }
}
</style>
