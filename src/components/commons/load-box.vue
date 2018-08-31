<template>
  <div class="load-more" v-if="load">
    <img src="./loading/assets/loading-spin.svg" width="512" height="64" />
  </div>
</template>
<script>
export default {
  name: 'load-more',
  props: {
    load: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    text() {
      return this.load ? 'iconfont icon-xiangxiajixu' : ''
    }
  }
}
</script>
<style lang="less" scoped>
.load-more {
  line-height: 64px;
  font-size: 22px;
  text-align: center;
  overflow: hidden;
  img {
    margin-top: 30px;
  }
  .load {
    border: 1px solid rgba(255, 59, 65, 0.9);
    border-radius: 25px;
    padding: 2px 40px;
    height: 50px;
    width: 180px;
    line-height: 42px;
    margin: 0 auto;
    color: rgba(255, 59, 65, 0.9);
    .iconfont {
      font-size: 22px;
      margin-right: 10px;
    }
  }
  .no-more {
    color: #585858;
    margin: 0 auto;
    width: 250px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .line {
      width: 68px;
      height: 1px;
      background: #000;
    }
    .remark {
      width: 200px;
    }
  }
}
</style>
