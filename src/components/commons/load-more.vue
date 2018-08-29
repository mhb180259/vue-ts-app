<template>
  <div class="load-more">
    <img v-if="load" src="./loading/assets/loading-spin.svg" width="512" height="64" />
    <div class="no-more" v-if="!load">
      <div class="line"></div>
      <div class="remark">No More</div>
      <div class="line"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'load-more',
  props: {
    load: Boolean
  },
  computed: {
    text() {
      return this.load ? 'iconfont icon-xiangxiajixu' : ''
    }
  },
  methods: {
    loadMore() {
      this.$emit('loadMore')
    }
  }
}
</script>
<style lang="scss" scoped>
.load-more {
  line-height: 64px;
  font-size: 22px;
  text-align: center;
  padding: 20px;
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
