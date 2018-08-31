<template>
  <div class="content">
    <header-search></header-search>
    <div class="main">
      <img src="../../assets/catalog/1-min.png" alt="" class="preview-image" @click="preview(0)">
      <img src="../../assets/catalog/2-min.png" alt="" class="preview-image" @click="preview(1)">
      <img src="../../assets/catalog/3-min.png" alt="" class="preview-image" @click="preview(2)">
      <img src="../../assets/catalog/4-min.png" alt="" class="preview-image" @click="preview(3)">
      <img src="../../assets/catalog/5-min.png" alt="" class="preview-image" @click="preview(4)">
      <img src="../../assets/catalog/6-min.png" alt="" class="preview-image" @click="preview(5)">
      <img src="../../assets/catalog/7-min.png" alt="" class="preview-image" @click="preview(6)">
      <img src="../../assets/catalog/8-min.png" alt="" class="preview-image" @click="preview(7)">
      <img src="../../assets/catalog/9-min.png" alt="" class="preview-image" @click="preview(8)">
      <img src="../../assets/catalog/10-min.png" alt="" class="preview-image" @click="preview(9)">
      <img src="../../assets/catalog/11-min.png" alt="" class="preview-image" @click="preview(10)">
      <img src="../../assets/catalog/12-min.png" alt="" class="preview-image" @click="preview(11)">
      <img src="../../assets/catalog/13-min.png" alt="" class="preview-image" @click="preview(12)">
      <img src="../../assets/catalog/14-min.png" alt="" class="preview-image" @click="preview(13)">
      <img src="../../assets/catalog/15-min.png" alt="" class="preview-image" @click="preview(14)">
      <img src="../../assets/catalog/16-min.png" alt="" class="preview-image" @click="preview(15)">
      <img src="../../assets/catalog/17-min.png" alt="" class="preview-image" @click="preview(16)">
      <img src="../../assets/catalog/18-min.png" alt="" class="preview-image" @click="preview(17)">
      <img src="../../assets/catalog/19-min.png" alt="" class="preview-image" @click="preview(18)">
      <img src="../../assets/catalog/20-min.png" alt="" class="preview-image" @click="preview(19)">
      <img src="../../assets/catalog/21-min.png" alt="" class="preview-image" @click="preview(20)">
      <img src="../../assets/catalog/22-min.png" alt="" class="preview-image" @click="preview(21)">
      <img src="../../assets/catalog/23-min.png" alt="" class="preview-image" @click="preview(22)">
      <img src="../../assets/catalog/24-min.png" alt="" class="preview-image" @click="preview(23)">
      <img src="../../assets/catalog/25-min.png" alt="" class="preview-image" @click="preview(24)">
      <img src="../../assets/catalog/26-min.png" alt="" class="preview-image" @click="preview(25)">
      <img src="../../assets/catalog/27-min.png" alt="" class="preview-image" @click="preview(26)">
      <img src="../../assets/catalog/28-min.png" alt="" class="preview-image" @click="preview(27)">
      <img src="../../assets/catalog/29-min.png" alt="" class="preview-image" @click="preview(28)">
      <img src="../../assets/catalog/30-min.png" alt="" class="preview-image" @click="preview(29)">
      <img src="../../assets/catalog/31-min.png" alt="" class="preview-image" @click="preview(30)">
      <img src="../../assets/catalog/32-min.png" alt="" class="preview-image" @click="preview(31)">
      <img src="../../assets/catalog/33-min.png" alt="" class="preview-image" @click="preview(32)">
      <img src="../../assets/catalog/34-min.png" alt="" class="preview-image" @click="preview(33)">
      <img src="../../assets/catalog/35-min.png" alt="" class="preview-image" @click="preview(34)">
      <img src="../../assets/catalog/36-min.png" alt="" class="preview-image" @click="preview(35)">
      <img src="../../assets/catalog/37-min.png" alt="" class="preview-image" @click="preview(36)">
      <img src="../../assets/catalog/38-min.png" alt="" class="preview-image" @click="preview(37)">
      <img src="../../assets/catalog/39-min.png" alt="" class="preview-image" @click="preview(38)">
      <img src="../../assets/catalog/40-min.png" alt="" class="preview-image" @click="preview(39)">
      <img src="../../assets/catalog/41-min.png" alt="" class="preview-image" @click="preview(40)">
      <img src="../../assets/catalog/42-min.png" alt="" class="preview-image" @click="preview(41)">
      <img src="../../assets/catalog/43-min.png" alt="" class="preview-image" @click="preview(42)">
      <img src="../../assets/catalog/44-min.png" alt="" class="preview-image" @click="preview(43)">
    </div>
  </div>
</template>
<script>
export default {
  name: 'catalog',
  data() {
    return {
      items: []
    }
  },
  methods: {
    preview (index) {
      this.$preview.show({ items: this.items, index })
    }
  },
  mounted() {
    let items = []
    this.$el.querySelectorAll('.preview-image').forEach((item, index) => {
      // console.log('item2', item.height, index)
      item.addEventListener('load', () => {
        // this.$preview.show({ items })
        this.items[index] = {
          w: item.width,
          h: item.height,
          src: item.src
        }
      })
    })

    // this.$preview.show({ items })
  }
}
</script>
<style lang="css" scoped>
.main {
  margin-top: 12px;
  background-color: #fff;
}
.main img {
  width: 100%;
  height: auto;
}
</style>
