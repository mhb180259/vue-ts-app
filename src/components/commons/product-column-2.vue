<template>
  <div class="product-column-2">
    <div class="product-header" v-if="title!==''">
      <span>—</span> {{title}}
      <span>—</span>
      <slot class="pull-right"></slot>
    </div>
    <div class="product-list">
      <div v-for="(item) in products" class="product-item" :class="{ 'pull-left':item.x_group===0, 'pull-right':item.x_group===1}" :key="item.id" @click="goDetail(item.id)">
        <template v-if="item.discount_type">
          <template v-if="['0601','0607'].indexOf($route.query.key) !== -1 || ['0601','0607'].indexOf($route.query.activityId) !== -1">
          <div class="product-item-label off">
            <div>
              <big>
                <span v-if="item.discount_type === 1">{{100 - item.discount}}</span>
                <span v-if="item.discount_type === 2">{{(item.discount / item.price).toFixed(2)*100}}</span>
                <span v-if="item.discount_type === 4">{{(1 - item.price_real / item.price).toFixed(2)*100}}</span>
              </big>%
            </div>
            <div>
              <small>OFF</small>
            </div>
          </div>
        </template>
          <template v-else>
          <div v-if="item.discount_type === 2" class="product-item-label flash">
            <div>
              Flash</div>
            <div>
              Sale
            </div>
          </div>
          <div v-if="item.discount_type === 1" class="product-item-label off">
            <div>
              <big>{{100 - item.discount}}</big>%</div>
            <div>
              <small>OFF</small>
            </div>
          </div>
        </template>
        </template>
        <div class="product-item-img">
          <img v-lazy="imgFml(item.image_value)" alt="">
        </div>
        <!-- <ellipsis-plus class="product-item-desc" ref="noButton" text="Fugiat omnis aut ut quos tempora sapiente illo maxime id. Sit sit est quaerat qui. Qui eveniet esse nobis. Nostrum ad delectus harum. Qui veritatis ea dolore quos non." :show-button="false" :line="2">
          </ellipsis-plus> -->
        <div class="product-item-desc ellipsis-2">
          {{item.item_name}}
        </div>
        <template v-if="auth">
          <template v-if="item.discount_type != 0">
            <span class="new-price" v-if="item.discount_type == 1">${{(item.price * item.discount / 100)|moneyFormat}}</span>
            <span class="new-price" v-else-if="item.discount_type == 2">${{(item.price - item.discount)|moneyFormat}}</span>
            <span class="new-price" v-else-if="item.discount_type == 4">${{item.sale_rule_do ? ((item.sale_rule_do.price) / 100).toFixed(2) : ((item.sale_rule_time.price) / 100).toFixed(2)}}</span>
            <span class="old-price">${{item.price|moneyFormat}}</span>
          </template>
          <template v-else>
            <span class="new-price">${{item.price|moneyFormat}}</span>
            <span class="old-price"></span>
          </template>
        </template>
        <template v-else>
          <div class="login-tips" @click.stop="goLogin">
            Sign in for price
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="js">
export default {
  name: 'product-column-2',
  props: {
    title: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imgFml(url) {
      return window._imgFormat(url, 'normal')
    },
    goLogin() {
      this.$router.push({path: '/login'});
    },
    goDetail(id) {
      this.$router.push({path: '/product-detail', query: {id: id}});
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.product-column-2 {
  overflow: auto;
}
.product-header {
  line-height: 68px;
  font-size: 28px;
  text-align: center;
  padding: 0 20px;
  color: rgba(0, 0, 0, 0.8);
  span {
    color: #a3a3a3;
  }
}
.product-list {
  // margin: 0 20px;
}
.product-item {
  position: relative;
  &:nth-child(2n) {
    border-left: 1px solid #f6f6f6;
  }
  vertical-align: top;
  display: inline-block;
  // height: 382px;
  width: 375px;
  background-color: #fff;
  padding: 24px;
  margin-bottom: 2px;
  .login-tips {
    color: rgb(255, 59, 65);
    font-size: 28px;
    line-height: 1.8;
  }
  .new-price {
    font-size: 28px;
    line-height: 1.8;
    font-weight: bold;
  }
  .old-price {
    font-size: 24px;
    min-height: 36px;
  }
}
.product-item-label {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 80px;
  height: 80px;
  background-size: contain;
  text-align: center;
  font-size: 24px;
  color: #fff;
  padding: 14px 8px;;
  line-height: 1;
  &.off {
    background-image: url('../../assets/label_red.png');
  }
  &.flash {
    background-image: url('../../assets/label_yellow.png');
  }
}
.product-item-img {
  text-align: center;
  height: 180px;
  img {
    display: inline-block;
    width: 160px;
    height: 160px;
  }
}
.product-item-desc {
  color: rgba(0, 0, 0, 0.8);
  font-size: 26px;
  height: 80px;
}
</style>
