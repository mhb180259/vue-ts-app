<template>
  <div>
    <div class="header-bar is-fixed">
      <div class="header-left">
        <span class="iconfont icon-shangyiye-copy-copy" v-on:click="goBack" v-if="showBack"></span>
      </div>
      <div class="header-title">
        <slot></slot>
      </div>
      <div class="header-right">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="bottom-box"></div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  props: {
    showBack: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: 'center'
    },
    customBack: {
      type: Function
    }
  },
  data() {
    return {}
  },
  methods: {
    goBack() {
      if (this.customBack) {
        this.customBack()
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$header-height: 88px !default;
// .header-bar.is-fixed {
//   right: 0;
//   top: 39px;
//   left: 0;
//   position: sticky;
//   z-index: 1;
// }
.is-fixed {
  position: fixed;
  top: 0;
  z-index: 10;
}
.bottom-box {
  height: $header-height;
}
.header-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: $header-height;
  min-height: $header-height;
  background-color: #fff;
  color: #000;
  box-sizing: border-box;
  line-height: 1;
  padding: 0 20px;
  text-align: center;
  box-shadow: 0 5px 20px #f6f6f6;
  // @extend .z-depth-1;
  // border-bottom: 1px solid #bfbfbf;
  // box-shadow: 0 1px 6px #ccc;
}
.header-left,
.header-right {
  flex: 0.5;
}
.header-right {
  text-align: right;
}
.header-left {
  text-align: left;
  span {
    padding: 20px 40px 20px 0;
    // display: inline-block;
    width: 36px;
    height: 36px;
  }
}
.header-title {
  flex: 2;
  text-align: center;
  font-size: 32px;
  vertical-align: middle;
  font-weight: bold;
}
.header-table {
  height: 100%;
  width: 100%;
  display: table;
}
.header-cell {
  display: table-cell;
  vertical-align: middle;
}
</style>
