<template>
  <div class="load-more" ref="loadmore">
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
    load: {
      type: Boolean,
      default: false
    },
    isloading: {
      type: Boolean,
      default: false
    }
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
  },
  mounted() {
    let parent = (this.parent = this.$el.parentNode);
    if (window.getComputedStyle(parent, null).position !== 'absolute' && window.getComputedStyle(parent, null).position !== 'fixed') {
      parent.style.position = 'relative'
    }
    const winTop = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    let loadDom = this.$refs.loadmore;
    parent.addEventListener('scroll', () => {
      if (winTop * 2 - loadDom.getBoundingClientRect().top > 210 && !this.isloading) {
        this.loadMore()
      }
    })
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
