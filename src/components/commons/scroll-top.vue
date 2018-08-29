<template>
  <div class="scroll-top" v-show="show" @click="scrollTop" :style="{'bottom': bottom + 'px'}">
    <img src="../assets/top.png" alt="">
  </div>
</template>
<script>
export default {
  name: 'scroll-top',
  props: {
    bottom: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      show: false,
      parent: null
    }
  },
  methods: {
    scrollTop() {
      this.parent.scrollTop = 0
    }
  },
  mounted() {
    let parent = (this.parent = this.$el.parentNode)
    if (window.getComputedStyle(parent, null).position !== 'absolute' && window.getComputedStyle(parent, null).position !== 'fixed') {
      parent.style.position = 'relative'
    }
    parent.addEventListener('scroll', () => {
      if (parent.scrollTop === 0 && this.show) {
        this.show = false
      } else if (parent.scrollTop !== 0 && !this.show) {
        this.show = true
      }
    })
  }
}
</script>
<style lang="css" scoped>
.scroll-top {
  position: fixed;
  /* bottom: 10px; */
  right: 20px;
  /* background-color: #fff; */
  width: 66px;
  height: 66px;
}
.scroll-top img {
  width: 100%;
  height: 100%;
}
</style>
