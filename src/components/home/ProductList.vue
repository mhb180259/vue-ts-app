<template>
  <div class="product-list">
    <div class="product-list-header">
      <span class="product-list-title"></span>
      <span class="more">
        More
        <span class="icon"></span>
      </span>
    </div>
    <div class="product-list-content">
      <div class="product-item">
        <div class="product-item-img">
          <img src="" alt="">
          <div class="product-item-title"></div>
          <div class="new-price"></div>
          <div class="old-price"></div>
        </div>
      </div>
      <div class="product-item">
        <div class="product-item-img">
          <img src="" alt="">
          <div class="product-item-title"></div>
          <div class="new-price"></div>
          <div class="old-price"></div>
        </div>
      </div>
      <div class="product-item">
        <div class="product-item-img">
          <img src="" alt="">
          <div class="product-item-title"></div>
          <div class="new-price"></div>
          <div class="old-price"></div>
        </div>
      </div>
      <div class="product-item">
        <div class="product-item-img">
          <img src="" alt="">
          <div class="product-item-title"></div>
          <div class="new-price"></div>
          <div class="old-price"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductList',
  data() {
    return {}
  }
}
</script>
<style lang="css" scoped>
.product-list-header {
}
.product-list-title {
  text-align: center;
}
.more {
  float: right;
}
</style>
