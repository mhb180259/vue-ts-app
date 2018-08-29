<template>
  <div v-if="products.length>0" class="index-buy-again">
    <div class="index-buy-again-header">
      <span class="iconfont icon-lishi"></span>
      Buy Again
    </div>
    <div class="index-buy-again-list-wrapper">
      <div class="index-buy-again-list">
        <div class="index-buy-again-item" v-for="(item) in products" :key="item.id" @click="goDetail(item)">
          <img :src="item.image_value|imgFormat('small')" alt="">
          <template v-if="item.discount_type != 0">
            <div class="new-price">${{item.price_real|moneyFormat}}</div>
            <!-- <div class="old-price">${{item.price|moneyFormat}}</div> -->
          </template>
          <template v-else>
            <div class="new-price">${{item.price|moneyFormat}}</div>
            <!-- <div class="old-price"></div> -->
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BuyAgain',
  data() {
    return {}
  },
  props: {
    products: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    goDetail(item) {
      this.$router.push({ path: '/product-detail', query: { id: item.id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.index-buy-again {
  // height: 274px;
  background-color: rgb(246, 246, 246);
  padding: 20px 0;
}
.index-buy-again-header {
  vertical-align: middle;
  font-size: 24px;
  line-height: 50px;
  padding-left: 20px;
  .iconfont {
    color: #ff3b41;
  }
}
.index-buy-again-list {
  display: flex;
  background-color: #fff;
}
.index-buy-again-list-wrapper {
  width: 100%;
  overflow-y: auto;
}
.index-buy-again-item {
  flex: 0 0 25%;
  background-color: rgb(255, 255, 255);
  width: 187px;
  padding: 12px 42px;
  border-right: 1px solid #f6f6f6;
  text-align: center;
  img {
    width: 92px;
    height: 92px;
  }
  div {
    height: 36px;
  }
}
.new-price {
  font-size: 24px;
  font-weight: bold;
}
.old-price {
  font-size: 22px;
}
</style>
