<template>
  <div class="box" v-show="loading">
    loading...
  </div>
</template>

<script lang="es6">
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="css" scoped>
.box {
  height: 80px;
  line-height: 80px;
  text-align: center;
  color: #afabab;
  background-color: transparent;
}
</style>