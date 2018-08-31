<template>
  <div class="content" v-loading="loading">
    <head-bar>
      Order Info
    </head-bar>
    <div class="main">
      <router-link to="address-list" class="address">
        <div class="bold">{{simOrder.defaultAddress.user_name}} <span v-show="simOrder.defaultAddress.state">({{simOrder.defaultAddress.state}})</span></div>
        <div class="address-detail">
          <span class="iconfont icon-guanlidizhi pull-left"></span>
          <span class="iconfont icon-jiantou arrow-right pull-right"></span>
          <div class="ellipsis">
            {{simOrder.defaultAddress.street}} {{simOrder.defaultAddress.city}} <span v-show="simOrder.defaultAddress.mobile">({{simOrder.defaultAddress.mobile}})</span>
          </div>
        </div>
        <div class="label-list">
          <span class="label-item">
            Default Address
          </span>
          <span class="label-item yellow" v-show="simOrder.defaultAddress.valid_time">
            Certificate Address
          </span>
        </div>
      </router-link>
      <order-row v-for="(prod) in orderProds" :key="prod.id" :data="prod | prettyProduct">
        <div slot="info">
          <span class="new-price">${{prod.price_real|moneyFormat}}</span>
          <span class="old-price" v-if="prod.price_real != prod.price">${{prod.price|moneyFormat}}</span>
          <span class="pull-right">
            Quantity: <span class="bold">{{prod.num}}</span>
          </span>
        </div>
      </order-row>
      <div class="cell-list">
        <div class="cell-item">
          <span>Shipping Method</span>
          <div class="pull-right">
            <radio-list :value="true"  :selected ="dilivery.x_deliveryType"   @input="dilivery.x_deliveryType = arguments[0];simCreat()"  label="Pick Up" name="method"></radio-list>
            <radio-list :value="false"   :selected ="!dilivery.x_deliveryType"  @input="dilivery.x_deliveryType = arguments[0];simCreat()"  label="Express" name="method"></radio-list>
          </div>
        </div>
        <div class="cell-item">
          <span>Include Invoice?</span>
          <div class="pull-right">
            <radio-list :value="true"  :selected ="dilivery.x_inPriceType"  @input="dilivery.x_inPriceType = arguments[0]" label="Yes" class="radio-item" name="y"></radio-list>
            <radio-list :value="false" :selected ="!dilivery.x_inPriceType" @input="dilivery.x_inPriceType = arguments[0]" label="No" name="y"></radio-list>
          </div>
        </div>
         <!--todo -->
        <!-- <div class="cell-item">
          <span>COUPON</span>
          <div class="pull-right bold">
            NOT AVALILBLE
            <span class="iconfont icon-jiantou arrow-right"></span>
          </div>
        </div> -->
        <!-- <div class="cell-item">
          <span class="tint">OPTIONAL:COMMENTS</span>
        </div> -->
      </div>
      <div class="info-count">
        <div class="info-item">
          Amount
          <span class="pull-right">${{simOrder.order_sum.amount | moneyFormat}}</span>
        </div>
        <div class="info-item">
          Shipping&Handing
          <span class="pull-right">+${{simOrder.order_sum.express | moneyFormat}}</span>
        </div>
        <div class="info-item">
          Tax
          <span class="pull-right">+${{simOrder.order_sum.tax | moneyFormat}}</span>
        </div>
        <!--<div class="info-item" v-if="simOrder.order_sum.promotion">-->
          <!--Discount-->
          <!--<span class="pull-right">-${{simOrder.order_sum.promotion | moneyFormat}}</span>-->
        <!--</div>-->
        <div class="info-item" v-if="order.pay_info.acc_bonus_list.length>=1">
          Coupon
          <span class="pull-right">-${{order.x_bonusMoneny|moneyFormat}}</span>
        </div>
        <div class="info-item" v-if="simOrder.order_sum.manjian">
          Flash Sale
          <span class="pull-right">-${{simOrder.order_sum.manjian|moneyFormat}}</span>
        </div>
        <div class="info-item">
          <span class="total">Total: <span>${{simOrder.order_sum.totalPrice | moneyFormat}}</span></span>
        </div>
      </div>
    </div>
    <div class="footer">
      <a class="pull-left" :href="'tel:'+$state.mobile">
        <div class="iconfont icon-dianhua1"></div>
        <div class="intro">Call for Assistance</div>
      </a>
      <div class="pull-right">
        <div to="payment" class="btn" @click="creat">Place Order</div>
      </div>
    </div>
  </div>
</template>
<script>
// import orderService from '@/services/OrderService'
import { mapActions } from 'vuex'
export default {
  name: 'info',
  components: {
    OrderRow: () => import('@/components/order-row.vue'),
    RadioList: () => import('@/components/radio-list.vue')
  },
  data() {
    return {
      tid: '',
      dilivery: { x_deliveryType: false, x_inPriceType: false, logisticsCompany: 'UPS', serviceCode: '03', remark: 'comment' },
      order: { user_addr: '', x_deliveryType: false, x_inPriceType: false, fee_hd_value: {}, pay_info: { acc_bonus_list: [] } },
      orderProds: [],
      loading: false
    }
  },
  methods: {
    ...mapActions(['createOrder', 'createSimOrder']),
    creat() {
      this.loading = true
      this.createOrder({ form: this.simOrder, dilivery: this.dilivery }).then(tid => {
        this.loading = false
        this.$router.push({
          path: '/payment1',
          query: { tid: tid }
        })
      })
    },
    simCreat() {
      this.loading = true
      this.createSimOrder({ item: this.simOrder.items, dilivery: this.dilivery }).then(t => {
        this.loading = false
      })
    }
    // initialize () {
    //   if (!this.tid) return
    //   orderService.get(this.tid).then((resp) => {
    //     resp.data.pay_info.pay_remark = JSON.parse(resp.data.pay_info.pay_remark_string);
    //     resp.data.fee_hd_value = JSON.parse(resp.data.fee_hd);
    //     let order = resp.data;
    //     order.x_deliveryType = false
    //     order.x_inPriceType = true
    //     // 优惠券的金额以后统计.wholesale_order.pay_info.acc_bonus_list
    //     order.x_bonusMoneny = 0
    //     order.sell_order_list.forEach((sell) => {
    //       sell.wholesale_order_items.forEach((item) => {
    //         item.propValue = JSON.parse(item.props)
    //         let prod = {labels: Object.keys(item.propValue)}
    //         prod.img = item.wholesale_item_d_o.image_value
    //         prod.x_num = item.num * 1
    //         prod.id = item.wholesale_item_d_o.id
    //         prod.price = item.price
    //         prod.price_real = item.price_real
    //         prod.desc = item.wholesale_item_d_o.item_name
    //         order.x_deliveryType = item.wholesale_item_d_o.s_h_s_m
    //         order.x_inPriceType = (item.hd_method || 0) & (1 << 18)
    //         order.x_inPriceType = !!order.x_inPriceType
    //         this.orderProds.push(prod)
    //       })
    //     })
    //     order.x_deliveryType = true
    //     this.order = order;
    //     console.log(this.order)
    //   }, (err) => {
    //     this.$ltsMessage(err)
    //   })
    // }
  },
  computed: {
    simOrder() {
      console.log(this.$store.getters.sim_order)
      return this.$store.getters.sim_order
    }
  },
  mounted() {
    this.loading = false
    this.orderProds = this.$state.products
    if (this.$route.query.osid !== this.simOrder.osid) {
      // this.simOrderItemClear()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
.footer {
  // position: fixed;
  bottom: 0;
  width: 100%;
  height: 98px;
  background-color: #fff;
  padding: 8px 20px;
  .pull-left {
    div {
      display: inline-block;
    }
    .intro {
      width: 180px;
      font-size: 26px;
    }
    .iconfont {
      vertical-align: top;
      font-size: 60px;
    }
  }
  .pull-right {
    width: 330px;
    float: right;
  }
  button.btn {
    box-shadow: none;
  }
}
.info-count {
  background-color: #fff;
  padding: 12px 20px;
}
.info-item {
  color: $sub-color;
  line-height: 1.8;
  overflow: hidden;
  .tint {
    font-size: 24px;
  }
  .pull-right {
    color: $primary-color;
  }
  .total {
    float: right;
    color: $text-color;
    font-weight: bold;
    span {
      color: $primary-color;
    }
  }
}
.cell-item {
  margin-bottom: 12px;
}
.address {
  display: block;
  background-color: #fff;
  padding: 20px;
}
.address-detail {
  height: 42px;
  line-height: 42px;
}
.address-detail .ellipsis {
  margin: 0 40px;
}
.new-price {
  font-size: 28px;
  font-weight: bold;
}
.old-price {
  margin-left: 12px;
  font-size: 24px;
}
.pull-right {
  &.bold {
    color: $text-color;
  }
  span {
    color: $text-color;
    font-size: 28px;
  }
}
</style>
