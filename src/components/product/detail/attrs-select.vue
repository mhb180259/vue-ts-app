<template>
<div class="shade" v-if="isShow" @click.self="close">
  <div class="attrs-select">
    <div class="header">
      Select Attribute
      <span class="pull-right iconfont icon-iconset0127" @click="close"></span>
    </div>
    <div class="product">
      <div class="product-img">
        <img :src="prod.activeImg.url" alt="">
      </div>
      <div class="product-content">
        <div class="product-desc ellipsis">
          {{prod.item_name}}
        </div>
        <template v-if = "auth">
          <template v-if="prod.discount_type !==0">
            <span class="new-price">${{prod.x_show.price_real|moneyFormat}}</span>
            <span class="old-price">${{prod.x_show.price|moneyFormat}}</span>
          </template>
          <template v-else>
            <span class="new-price">${{prod.x_show.price|moneyFormat}}</span>
            <span class="old-price"></span>
          </template>
        </template>
        <template v-else>
          <span>Sign in for price</span>
        </template>
      </div>
    </div>
    <div class="attr-list" v-for="(skuProp) in prod.x_skuPropArr" :key="skuProp.prop_name">
      <div class="attr-list-header">
        {{skuProp.prop_name}}
      </div>
      <div class="attr-item" v-for="(skuValue, index) in skuProp.prop_values" :key="skuValue.x_key" :class="{clear: (index + 1) % 3 === 0, selected: skuValue.x_selected}" @click="selectProp(skuValue)">
        {{skuValue.value}}
      </div>
    </div>
    <div class="quantity">
      Quantity <numbox class="pull-right" v-model="prod.num"></numbox>
    </div>
    <div class="footer">
      <button class="btn" @click="onConfirm">
        Confirm
      </button>
    </div>
  </div>
</div>
</template>
<script>
import MixinProd from '@/mixins/mixin-prod.js'
export default {
  name: 'attrs-select',
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    onConfirm() {
      this.$emit('confirm', this.prod)
    },
    open(oldProd) {
      this.assignProd(Object._clone(oldProd))
      this.isShow = true
    },
    close() {
      this.isShow = false
    }
  },
  mixins: [MixinProd]
}
</script>
<style lang="scss" scoped>
@import '../../../assets/scss/variables.scss';
.attrs-select {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  left: 0;
  right: 0;
  z-index: 99;
  .header {
    height: 70px;
    line-height: 70px;
    padding: 0 20px;
    border-top: 1px solid $line-color;
    border-bottom: 1px solid $line-color;
  }
  .quantity {
    padding: 0 20px;
    margin-top: 24px;
  }
  .product {
    padding: 12px;
    overflow: hidden;
  }
  .attr-list {
    padding: 20px 20px 0 20px;
    .attr-item {
      margin-right: 12px;
      margin-bottom: 6px;
      &.clear {
        margin-right: 0;
      }
    }
  }
  .product-img,
  .product-img img {
    width: 140px;
    height: 140px;
    float: left;
  }
  .product-content {
    margin-left: 156px;
  }
  .product-desc {
    font-size: 28px;
  }
  .new-price,
  .old-price {
    display: inline-block;
  }
  .footer {
    padding: 24px 12px;
  }
}
</style>
