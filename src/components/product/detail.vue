<template>
  <div class="content">
    <head-bar>
      Product Detail
      <span class="iconfont icon-shouye" slot="right" @click="goHome"></span>
    </head-bar>
    <div class="main" v-loading="loading">
      <div class="slider">
        <img v-lazy="prod.activeImg.x_url" alt="">
        <!--<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521624031175&di=67266d58023a86838105fc44a47f2190&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm3%2FM01%2FC7%2F5F%2FwKhQ5lTAcWCEC0DzAAAAAE_5fFA266.jpg" alt="">-->
      </div>
      <div class="cart-bar" slot="header" v-if="prod.discount_type > 0">
        {{activity[prod.discount_type]}}
        <CountDown ref="itemCountDown"  v-if="prod.discount_type === 4" :data="prod.sale_rule"></CountDown>
      </div>
      <div class="detail-desc">
        {{prod.item_name}}
      </div>
      <div class="detail-price">
        <template v-if = "auth">
          <template v-if="prod.discount_type !== 0">
            <template v-if="prod.discount_type == 4">
              <span class="new-price">${{discountRealPrice(prod.sale_rule_do.price)|moneyFormat}}</span>
              <span class="old-price">${{discountRealPrice(prod.x_show.price)|moneyFormat}}</span>
            </template>
            <template v-else>
              <span class="new-price">${{discountRealPrice(prod.x_show.price_real)|moneyFormat}}</span>
              <span class="old-price">${{discountRealPrice(prod.x_show.price)|moneyFormat}}</span>
            </template>
          </template>
          <template v-else>
            <span class="new-price">${{discountRealPrice(prod.x_show.price)|moneyFormat}}</span>
            <span class="old-price"></span>
          </template>
        </template>
        <template v-else>
          <span class="login-tips" @click="goLogin">Sign in for price</span>
        </template>
      </div>
      <div class="detail-attribute" @click="openAttrsSelect">
        <div class="attribute-main">
          Attribute<span  v-for="(item) in prod.x_show.selectedProps" :key="item">{{item}}</span>
          <span v-if="prod.x_show.selectedProps.length === 0">select</span>
        </div>
        <span class="iconfont icon-gengduo4"></span>
      </div>
      <div class="detail-together" v-if="prod.package_item_list.length>0" >
        <div class="detail-together-header">
          Frequently bought together
          <span class="pull-right">
            {{prod.package_item_list.length}}Items <span class="iconfont icon-jiantou arrow-right"></span>
          </span>
        </div>
        <div class="detail-together-main">
          <span v-for="(itemp, index) in prod.package_item_list" :key="itemp.id">
            <span class="add" v-if="index > 0">+</span>
            <div  class="img-box" >
              <img :src="itemp.image_value" alt="">
            </div>
          </span>
        </div>
      </div>
      <div class="detail-content">
        <div v-html="prod.description"></div>
      </div>
    </div>
    <div class="footer">
      <a class="footer-icon-item" :href="'tel:'+$state.mobile">
        <div class="iconfont icon-dianhua1"></div>
        <div>Contact LTS</div>
      </a>
      <router-link to="cart" class="footer-icon-item">
        <div class="iconfont icon-gouwuche3">
           <span class="badge">{{cartCount}}</span>
        </div>
        <div>Cart</div>
      </router-link>
      <div class="footer-btns">
        <div class="btn-buy-now" @click="openAttrsSelect(orderNow)">
          Order Now
        </div>
        <div class="btn-add-to" @click="openAttrsSelect(addCart)">
          Add To Cart
        </div>
      </div>
    </div>
    <AttrsSelect ref="prodAttrSelect"  @confirm="confirmAttrsSelect"></AttrsSelect>
  </div>
</template>
<script>
import MixinProd from '@/mixins/mixin-prod.js'
import { mapActions, mapGetters } from 'vuex'
import cartService from '@/services/CartService'
export default {
  name: 'detail',
  components: {
    CountDown: () => import('@/components/count-down.vue'),
    AttrsSelect: () => import('./detail/attrs-select.vue')
  },
  data() {
    return {
      activity: {
        1: 'Discount',
        2: 'On Sale',
        4: 'DoorBuster'
      },
      selCallback: null,
      loading: true
      // prod: { x_show: { price_real: 0, price: 0, selectedProps: [] }, activeImg: { url: '' }, x_skuPropArr: [] }
    }
  },
  computed: {
    ...mapGetters(['cartCount']),
    prodId() {
      return this.$route.query.id
    }
  },
  methods: {
    ...mapActions(['createSimOrder']),
    initialize() {
      this.loading = true
      this.queryProd(this.prodId).then(() => (this.loading = false))
    },
    orderNow() {
      if (!this.auth) {
        this.$router.push({ path: '/login', query: { redirect: JSON.stringify({ name: 'product-detail', query: { id: this.prodId } }) } })
        return
      }
      let self = this
      let skuProdTmp = this.getMatchedSkuProd()
      if (skuProdTmp.id === this.prod.id) {
        return
      }
      if (skuProdTmp.storage <= 0) {
        this.$alert.show({
          type: 'error',
          message: 'Ugho oh.sold out.',
          confirm: function() {
            self.$alert.hide()
          }
        })
        return
      }
      if (this.$refs.itemCountDown) {
        let sts = this.$refs.itemCountDown.status
        if (sts === 'Starts') {
          this.$alert.show({
            type: 'error',
            message: 'This offer has not yet started',
            confirm: function() {
              self.$alert.hide()
            }
          })
          return
        } else if (sts === 'Closed') {
          this.$alert.show({
            type: 'error',
            message: 'This offer had been closed.',
            confirm: function() {
              self.$alert.hide()
            }
          })
          return
        }
      }

      this.loading = true
      this.createSimOrder({ item: [this.prod] }).then(
        osid => {
          this.loading = false
          let self = this
          setTimeout(() => {
            self.$store.commit('setProducts', [self.prod])
            self.$router.push({ path: '/sim-info', query: { osid: osid } })
          }, 50)
        },
        msg => {
          this.loading = false
          this.$toast.show({ type: 'error', message: msg.error_message })
        }
      )
    },
    openAttrsSelect(cb) {
      if (!this.$state.auth) {
        console.log(this.$route)
        this.$router.push({ path: '/login', query: { redirect: JSON.stringify({ path: this.$route.path, query: this.$route.query }) } })
        return
      }
      let self = this
      let skuNum = 0
      this.prod.item_struct_props.forEach(t => {
        if (t.sku && t.storage > 0) {
          skuNum++
        }
      })
      if (skuNum === 0) {
        this.$alert.show({
          type: 'error',
          message: 'Ugho oh.sold out.',
          confirm: function() {
            self.$alert.hide()
          }
        })
      } else {
        if (!this.prod.item_prop_value_maps) return
        this.$refs.prodAttrSelect.open(this.prod)
        this.selCallback = cb
      }
    },
    confirmAttrsSelect(newProd) {
      this.prod = Object._clone(newProd)
      this.$refs.prodAttrSelect.close()
      this.selCallback && this.selCallback()
    },
    goHome() {
      this.$router.push('/')
    },
    addCart() {
      if (!this.prod.id) return
      let skuProd = this.getMatchedSkuProd()
      if (this.prod.id === skuProd.id) {
      } else {
        // 真正的SKU
        cartService.putCartPlus(this.prod, skuProd).then(
          () => {
            this.$dispatch('cartCount')
            this.$toast.show({ type: 'success', message: 'success' })
          },
          msg => {
            this.$toast.show({ type: 'error', message: msg.error_message })
          }
        )
      }
    },
    goLogin() {
      this.$router.push({path: '/login'});
    }
  },
  mounted() {
    this.initialize()
  },
  mixins: [MixinProd]
}
</script>
<style lang="scss" scoped>
.slider {
  width: 750px;
  height: 750px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  img {
    width: 100%;
    height: 100%;
  }
}
.detail-desc {
  padding: 20px 20px 0 20px;
  background-color: #fff;
  font-size: 28px;
}
.detail-price {
  padding: 20px 20px 24px 20px;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  .new-price {
    font-size: 28px;
  }
  .old-price {
    margin-left: 10px;
    font-size: 24px;
  }
}
.login-tips {
  color: rgb(255, 59, 65);
  font-size: 28px;
  line-height: 1.8;
}
.detail-attribute {
  height: 80px;
  padding: 20px;
  background-color: #fff;
  font-size: 28px;
  color: #a3a3a3;
  display: flex;
  .attribute-main {
    flex: 1;

    .selected {
      border: 1px solid red;
      border-radius: 10px;
      padding: 2px 12px;
    }
    .unselect {
      border-radius: 10px;
      padding: 2px 12px;
    }
  }
  .iconfont {
    color: #a3a3a3;
    line-height: 40px;
  }
  span {
    margin-left: 24px;
    font-weight: bold;
    color: #585858;
  }
}
.detail-together {
  margin-top: 12px;
  background-color: #fff;
}
.detail-together-header {
  height: 68px;
  line-height: 68px;
  padding: 0 20px;
  font-size: 28px;
  font-weight: bold;
  border-bottom: 1px solid #e5e5e5;
  .pull-right {
    color: #a3a3a3;
  }
}
.detail-together-main {
  height: 148px;
  padding: 24px 20px;
  .img-box {
    display: inline-block;
    width: 100px;
    height: 100px;
  }
  img {
    width: 100%;
    height: 100%;
  }
  span.add {
    color: #a3a3a3;
    font-size: 24px;
    display: inline-block;
    padding: 0 8px;
    height: 100px;
    line-height: 100px;
    vertical-align: top;
  }
}
.detail-content {
  margin: 12px 20px;
  background-color: #fff;
}
.footer {
  width: 100%;
  height: 98px;
  background-color: #fff;
  padding: 8px 8px;
  font-size: 0;
  & > div,
  & > a {
    vertical-align: middle;
    display: inline-block;
  }
}
.footer-icon-item {
  width: 155px;
  text-align: center;
  div {
    font-size: 20px;
    line-height: 1;
  }
  .iconfont {
    font-size: 44px;
  }
  .icon-gouwuche3 {
    position: relative;
    .badge {
      position: absolute;
      height: 20px;
      // width: 20px;
      top: 0px;
      left: 90px;
    }
  }
}
.footer-btns {
  width: 420px;
  font-size: 0;
  & > div {
    display: inline-block;
    font-weight: bold;
    width: 210px;
    line-height: 80px;
    text-align: center;
    height: 80px;
    color: #fff;
    font-size: 26px;
  }
}
.btn-buy-now {
  background-color: #ffa03b;
  border-radius: 40px 0 0 40px;
}
.btn-add-to {
  background-color: #ff3b41;
  border-radius: 0 40px 40px 0;
}
.prop-selected {
  border: 1px solid #ff3b41;
}
</style>
<style>
.detail-content img {
  width: 100%;
  height: auto;
}
</style>
