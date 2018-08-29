<template>
  <span class="count-down">
    {{status}} <span v-if="status !== 'Closed'">
    in
      <span class="count-down-cell">{{day}}D</span>:
      <span class="count-down-cell">{{hour}}</span>:
      <span class="count-down-cell">{{minute}}</span>:
      <span class="count-down-cell">{{second}}</span>
    </span>
  </span>
</template>
<script>
// import moment from 'moment'
import TimeService from '@/services/TimeService.js'
export default {
  name: 'count-down',
  props: {
    data: String,
    id: Number
  },
  data() {
    return {
      count: 0,
      sTime: 0,
      eTime: 0,
      nTime: 0,
      status: 'Starts' // 'Starts', 'Ends', 'Closed
    }
  },
  // watch: {
  //   date(val) {
  //     this.count = 100000
  //     this.countDown()
  //   }
  // },
  computed: {
    second() {
      return this.format(Math.floor(this.count / 1000) % 60)
    },
    minute() {
      return this.format(Math.floor(this.count / (1000 * 60)) % 60)
    },
    hour() {
      return this.format(Math.floor(this.count / (1000 * 60 * 60)) % 24)
    },
    day() {
      return Math.floor(this.count / (1000 * 60 * 60 * 24))
    },
    showDay() {
      return this.day !== '00'
    }
  },
  methods: {
    format(num) {
      return num < 10 ? '0' + num : num
    },
    countDown() {
      let timer = setInterval(() => {
        if (this.count > 1) {
          this.count -= 1000
        } else {
          if (this.status === 'Starts') {
            this.$emit('toggle', {id: this.id, usable: true})
            this.count = this.eTime - Date.now()
            this.status = 'Ends'
          } else {
            this.status = 'Closed'
            clearInterval(timer)
            this.$emit('toggle', {id: this.id, usable: false})
          }
        }
      }, 1000)
    }
  },
  mounted() {
    const data = JSON.parse(this.data)

    TimeService.getUtcTime(data.startTime).then(startTime => {
      TimeService.getUtcTime(data.endTime).then(endTime => {
        TimeService.getTimeAndZone(Date.now()).then(nowTime => {
          console.log('startTime', startTime.time)
          console.log('endTime', endTime.time)
          console.log('nowTime', nowTime.current_time)
          this.sTime = new Date(startTime.time).getTime()
          this.eTime = new Date(endTime.time).getTime()
          this.nTime = new Date(nowTime.current_time).getTime()
          if (this.sTime - this.nTime > 1) {
            this.count = this.sTime - this.nTime
            this.status = 'Starts'
            this.$emit('toggle', {id: this.id, usable: false})
          } else if (this.eTime - this.nTime > 1) {
            this.count = this.eTime - this.nTime
            this.status = 'Ends'
          } else {
            this.status = 'Closed'
            this.$emit('toggle', {id: this.id, usable: false})
          }
          this.countDown()
        })
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.count-down {
  font-size: 24px;
  font-weight: normal;
  float: right;
  margin: 0 20px 0 16px;
}
.count-down-cell {
  background-color: #000;
  padding: 0 2px;
  border-radius: 4px;
}
</style>
