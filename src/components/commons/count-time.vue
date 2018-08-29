<template>
  <div :class="{countDownContant: true, countDownContOverBg: finished}" v-if="(item.discount_type == 4) && item.status == 1">
    <span class="countText" v-if="!started && !finished">This round starts in:</span>
    <span class="countText" v-if="started && !finished">This round ends in:</span>
    <span v-if="!finished" class="countNum">
            <span class="countDay">{{count.day > 0 ? count.day + 'D' : '0D'}}</span>
            <span class="countHour">{{count.hour}}</span><a class="colon">:</a>
            <span class="countMin">{{count.minute}}</span><a class="colon">:</a>
            <span class="countSec">{{count.second}}</span>
        </span>
    <div class="countText specBot" v-if="finished">
      <p>This round has ended.Stay tuned for the next round.</p>
    </div>
  </div>
</template>

<script>
  import itemService from '@/services/ItemService'
  import timeService from '@/services/TimeService.js'

  export default {
    name: 'lts-countTime',
    props: ['propsItem', 'iIndex'],
    data() {
      return {
        item: {},
        count: {
          day: 0,
          hour: 0,
          minute: 0,
          second: 0
        },
        started: false,
        finished: false,
        start: '',
        end: '',
        oneIndex: ''
      }
    },
    created() {
      this.item = this.propsItem;
      this.oneIndex = this.iIndex;
      if (JSON.stringify(this.item) !== '{}' && this.item.discount_type === 4) {
        this.getCountTime();
      }
    },
    methods: {
      getCountTime() {
        let now;
        timeService.getUtcTime(this.item.sale_rule_time.end_time).then(v1 => {
          this.end = new Date(v1.time).getTime()
          timeService.getUtcTime(this.item.sale_rule_time.start_time).then(v2 => {
            this.start = new Date(v2.time).getTime()
            timeService.getTimeAndZone().then(v3 => {
              now = new Date(v3.current_time).getTime()
              if (this.end > now) {
                this.countdown(now)
              } else {
                // 活动结束，不显示了
                this.finished = true
              }
            })
          })
        })
      },
      // 倒计时
      countdown(time) {
        let self = this
        let start = this.start
        let end = this.end
        let now = time
        // let now = Date.parse(new Date())
        let date
        // 判断活动是否开始
        if (now < start) {
          // 还没开始
          this.started = false
          this.finished = false
          date = this.start
        } else if (start <= now <= end) {
          // 开始了还没结束
          this.started = true
          this.finished = false
          date = this.end
        } else {
          this.started = true
          this.finished = true
        }
        let msec = date - now

        // 计算时分秒数
        this.count.day = parseInt(msec / 1000 / 60 / 60 / 24);
        this.count.hour = parseInt(msec / 1000 / 60 / 60 % 24)
        this.count.minute = parseInt(msec / 1000 / 60 % 60)
        this.count.second = parseInt(msec / 1000 % 60)
        // 个位数前补零
        this.count.hour = this.count.hour > 9 ? this.count.hour : '0' + this.count.hour
        this.count.minute = this.count.minute > 9 ? this.count.minute : '0' + this.count.minute
        this.count.second = this.count.second > 9 ? this.count.second : '0' + this.count.second
        // 倒计时开始
        this.getCountStatus();
        if (msec >= 0) {
          setTimeout(function () {
            self.countdown(now + 1000)
          }, 1000)
        }
      },
      getCountStatus () {
        this.$emit('countStatus', this.started, this.finished, this.oneIndex);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .countDownContant {
    position: relative;
    width: 100%;
    height: 34px;
    background-image: url("http://ltsres-us.oss-us-west-1.aliyuncs.com/misc/dca80fc5acc89d4af0ef9ff6fbd8641b.png");
    background-size: cover;
    color: #fff;
    font-size: 18px;
    line-height: 35px;
    margin-bottom: 14px;
    .countNum {
      float: right;
      display: inline-block;
      height: 28px;
      line-height: 28px;
      font-weight: bold;
      margin-right: 90px;
      margin-top: 3px;
      span {
        /*display: inline-block;
        width: 28px;
        height: 28px;
        background-image: url("http://ltsres-us.oss-us-west-1.aliyuncs.com/misc/861d6cae4a0ce8ec88578263021f3568.png");
        text-align: center;*/
        display: inline-block;
        padding: 0 4px;
        height: 28px;
        background-color: #2f3430;
        text-align: center;
      }
      .colon {
        position: relative;
        left: 2px;
        top: -1px;
        display: inline-block;
        height: 28px;
        color: #2F3430;
      }
    }
    .countDay {

    }
    .countHour {
    }
    .countMin {
    }
    .countSec {
    }
    .countText {
      float: left;
      margin-left: 102px;
    }
  }
  .countDownContOverBg {
    background-image: url("http://ltsres-us.oss-us-west-1.aliyuncs.com/misc/ba704fce584c6ae33d42d92f3001de78.png");
  }
</style>
