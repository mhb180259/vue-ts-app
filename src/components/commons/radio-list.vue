<template>
  <div class="radio-item">
    <label class="radio-label">
      <input type="radio" :value="value" :checked ="selected" :disabled="disabled"  :name="name" @change="change">
      {{label}}
    </label>
  </div>
</template>
<script>
export default {
  name: 'radio-list',
  props: {
    disabled: { type: Boolean, default: false },
    value: [String, Number, Boolean, Object],
    selected: Boolean,
    label: String,
    name: String
  },
  data() {
    return {}
  },
  methods: {
    change(event) {
      this.$emit('change', event.target.checked)
      if (event.target.checked) {
        this.$emit('input', this.value)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/variables.scss';
.radio-label {
  display: inline-block;
  color: $text-color;
  font-weight: bold;
}
.radio-item {
  display: inline-block;
  vertical-align: middle;
  input[type='radio'] {
    -webkit-appearance: none;
    outline: 0 !important;
    width: 20px;
    border: 0;
    height: 20px;
    display: inline-block;
    background-color: transparent;
  }
  input[type='radio']:before {
    content: '';
  }
  input[type='radio']:checked:before {
    border: 5px solid #ff5055;
    color: #ff5055;
  }
  input[type='radio']:before {
    box-sizing: border-box;
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
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
