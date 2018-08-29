<template>
  <div class="header-search">
    <span class="search-icon iconfont icon-shangyiye-copy-copy" v-if="showBack" v-on:click="goBack"></span>
    <div class="index-header-search">
      <input type="search" class="index-header-search-input" placeholder="Search:Model Number" :value="value" @input="emitInput" @focus="emitFocus" @search="emitSearch">
    </div>
    <span class="search-icon iconfont icon-sousuo2" @click="emitSearch"></span>
  </div>
</template>
<script>
export default {
  name: 'header-search',
  props: {
    value: {
      type: String,
      default: ''
    },
    showBack: {
      type: Boolean,
      default: true
    },
    customBack: {
      type: Function
    }
  },
  methods: {
    emitInput(event) {
      this.$emit('input', event.target.value)
    },
    emitFocus() {
      this.$emit('focus')
    },
    emitSearch() {
      this.$emit('search', this.value)
    },
    goBack() {
      if (this.customBack) {
        this.customBack()
      } else {
        window.history.go(-1)
      }
    }
  }
}
</script>
<style lang="sss" scoped>
.header-search {
  display: flex;
  height: 88px;
  line-height: 88px;
  background-color: #fff;
  color: #a5a5a5;
  font-size: 0;
  /* border-bottom: 1px solid #f3f3f3; */
}
.index-header-search {
  display: inline-block;
  flex: 1;
  height: 88px;
  padding: 18px 20px;
  vertical-align: middle;
}
.index-header-search-input {
  width: 100%;
  height: 60px;
  border-radius: 30px;
  border: none;
  padding: 0 20px;
  font-size: 20px;
  background-color: #f6f6f6;
  vertical-align: top;
}
.index-header-search-input {
  outline: none;
}
.iconfont {
  margin: 0 10px;
  vertical-align: middle;
  /* line-height: 52px; */
}
.search-icon {
  font-size: 50px;
  position: relative;
  top: 4px;
}
</style>
