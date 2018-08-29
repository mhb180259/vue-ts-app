<template>
  <button class="btn btn-primary" @click="onClick">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'c-button',
  data() {
    return {
      disabled: {
        type: Boolean,
        default: false
      }
    }
  },
  methods: {
    onClick() {
      !this.disabled && this.$emit('click')
    }
  }
}
</script>
<style lang="scss" scoped>
//button
.btn {
  display: block;
  transition: all 0.2s;
  font-size: 34px;
  text-align: center;
  color: #fff;
  line-height: 80px;
  border-radius: 40px;
}
@mixin btn($color) {
  background-color: $color;
  border: 1px solid $color;

  &:enabled:active,
  &.active:enabled {
    background-color: darken($color, 10%);
    border: 1px solid darken($color, 10%);
  }
}
.btn-primary {
  @include btn(#ff3b41);
}
</style>
