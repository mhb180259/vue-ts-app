<template>
  <div class="content">
    <head-bar>
      Coupon
    </head-bar>
    <div class="main">
      <div class="coupon" v-for="item in list" :key="item.id">
        <div class="coupon-header"></div>
        <div class="coupon-content">
          <div class="coupon-main">
            <div class="flex-box">
              <div class="dollar">$</div>
              {{item.value / 100}}
            </div>
            <div class="logo"></div>
          </div>
          <div class="coupon-info">
            <div>Coupon off ${{item.startV / 100}}</div>
            <div>{{item.startDate.replace(/\//g, '-')}} to {{item.endDate.replace(/\//g, '-')}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CheckService from '@/services/CheckService'
import moment from 'moment'
export default {
  name: 'coupon',
  data() {
    return {
      list: []
    }
  },
  beforeMount() {
    CheckService.checkInfo().then(data => {
      if (data.data) {
        let list = []
        for (const item of data.data.acc_books) {
          if (item.subject === 2010102) {
            item.bonus.datalist.forEach(child => {
              list.push({
                id: child.id,
                ...JSON.parse(child.rule)[0],
                startDate: moment(child.start_time).format('MM/DD/YYYY'),
                endDate: moment(child.end_time).format('MM/DD/YYYY')
              })
            })
          }
        }
        this.list = list
      }
    })
  }
}
</script>
<style lang="css" scoped>
.coupon {
  margin: 24px auto;
  width: 710px;
  height: 280px;
  background-color: #fff;
}
.coupon-header{
  height: 24px;
  background: url('../../assets/coupon_bar.png') repeat-x;
  background-size: contain;
}
.coupon-content {
  box-sizing: border-box;
  padding: 24px;
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
  margin-left: 30px;
  height: 100%;
  line-height: 1;
  font-weight: 600;
  text-align: left;
  /* width: 120px; */
  font-size: 100px;
  color: #4B8CFF;
  position: relative;
}
.dollar {
  position: absolute;
  top: 10px;
  left: -30px;
  font-size: 50px;
}
.logo{
  display: inline-block;
  width: 88px;
  height: 24px;
  background: url('../../assets/logo_small.png');
  background-size: contain;
  background-repeat: no-repeat;
}
.coupon-info{
  color: #585858;
  margin-top: 24px;
  font-size: 28px;
  font-weight: bold;
}
</style>
