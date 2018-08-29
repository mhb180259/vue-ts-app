<template>
  <div class="checkbox">
    <input type="checkbox" :disabled="disabled" :checked="checked" @change="change">
  </div>
</template>
<script>
export default {
  name: 'check-box',
  props: {
    checked: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    change(event) {
      this.$emit('input', event.target.checked)
    }
  }
}
</script>
<style lang="scss" scoped>
.checkbox {
  display: inline-block;
  vertical-align: middle;
  input[type='checkbox'] {
    -webkit-appearance: none;
    outline: 0 !important;
    width: 20px;
    border: 0;
    height: 20px;
    display: inline-block;
    background-color: transparent;
    position: relative;
  }
  input[type='checkbox']:before {
    content: '';
  }
  input[type='checkbox']:checked:before {
    color: #ff5055;
    content: '\e601';
    border: none;
  }
  input[type='checkbox']:before {
    display: inline-block;
    position: absolute;
    margin-top: 4px;
    width: 20px;
    height: 20px;
    border: 1px solid #585858;
    background-color: #f6f6f6;
    border-radius: 50%;
    font-size: 20px;
    font-family: 'iconfont' !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
