<template>
  <div v-if="show">
    <div class="gift animated" @click="close"></div>
    <div class="content">
      <div class="gift-panel">
        <div class="coupon" v-for="(item, index) in list" :key="index">
          <div class="coupon-header"></div>
          <div class="coupon-content">
            <div class="coupon-main">
              <div class="flex-box">
                <div class="dollar">$</div>
                {{item.rule_value[0].value / 100}}
              </div>
              <div class="logo"></div>
            </div>
            <div class="coupon-info">
              <div>Coupon off ${{item.rule_value[0].startV / 100}}</div>
              <div>{{item.start}} to {{item.end}}</div>
            </div>
          </div>
        </div>
        <div class="more" @click="toCoupon">
          More
        </div>
      </div>
      <div class="coupon-desc">
        The coupon(s) is now available in your account. You may view it under My LTS -> Coupon.
      </div>
      <div class="btn-panel" @click="close">
        <a class="btn">OK</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'gift',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    callback: {
      type: Function
    },
    closeFn: {
      type: Function
    }
  },
  methods: {
    close () {
      this.closeFn()
    },
    toCoupon () {
      this.closeFn()
      this.callback()
    }
  }
}
</script>
<style lang="css" scoped>
.gift{
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background-color: rgba(0,0,0,.6);
}
.content {
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  height: 1068px;
  margin: auto;
  background: transparent;
}
.gift-panel{
  width: 580px;
  padding-top: 196px;
  margin: 0 auto 0;
  background: url('../assets/gift.png');
  background-size: cover;
}
.coupon {
  margin: 12px 24px;
  margin-bottom: 0;
  /* height: 172px; */
  background-color: #fff;
}
.coupon-header{
  height: 16px;
  background: url('../assets/coupon_bar.png') repeat-x;
  background-size: contain;
}
.coupon-content {
  box-sizing: border-box;
  padding: 12px 12px 24px 12px;
  border-radius: 6px;
}
.selected {
  background-color: #ffebec;
}
.coupon-main {
  display: flex;
}
.flex-box {
  flex: 1;
  margin-left: 14px;
  height: 100%;
  line-height: 1.2;
  font-weight: 600;
  text-align: left;
  /* width: 120px; */
  font-size: 60px;
  color: #4B8CFF;
  position: relative;
}
.logo{
  display: inline-block;
  width: 66px;
  height: 18px;
  background: url('../assets/logo_small.png');
  background-size: contain;
  background-repeat: no-repeat;
}
.dollar {
  position: absolute;
  top: 5px;
  left: -14px;
  font-size: 24px;
}
.coupon-info{
  margin-top: 12px;
  color: #585858;
  font-size: 24px;
  line-height: 1;
  font-weight: bold;
}
.more{
  display: block;
  width: 100%;
  text-align: center;
  color: #fff;
  line-height: 2;
}
.coupon-desc{
  padding: 0 24px;
  margin: 48px 0;
  color: #fff;
  font-size: 24px;
  text-align: center;
}
.btn-panel{
  text-align: center;
}
.btn-panel .btn{
  display: inline-block;
  width: 200px;
  height: 60px;
  line-height: 60px;
}
</style>
