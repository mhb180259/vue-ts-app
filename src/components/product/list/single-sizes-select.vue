<template>
    <div class="shade" v-show="isShow" @click="hide">
      <div class="single-sizes-select">
        <div class="link" :style="{left: left + 'px'}"></div>
        <div v-for="(size, index) in selected" :key="index" class="size-item text-left" :class="calcAlign(index)">
          <div class="attr-item" :class="{selected:size.selected}" @click.stop="selectSize(index)">{{size.name}}</div>
        </div>
        <div class="footer">
          {{selected}}
          <button class="btn grey" @click.stop="reset">Reset</button>
          <button class="btn" @click.stop="determine">Determine</button>
        </div>
      </div>
    </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'single-sizes-select',
  props: {
    isShow: Boolean,
    index: Number,
    name: String,
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      selected: _.cloneDeep(this.list)
    }
  },
  watch: {
    list: {
      handler(val) {
        this.selected = _.cloneDeep(this.list)
      },
      deep: true
    }
  },
  computed: {
    left() {
      return 20 + 180 * this.index
    }
  },
  methods: {
    hide() {
      this.$emit('update:isShow', false)
    },
    calcAlign(index) {
      let remainder = index % 3
      if (remainder === 0) {
        return 'text-left'
      }
      if (remainder === 1) {
        return 'text-center'
      }
      if (remainder === 2) {
        return 'text-right'
      }
    },
    selectSize(index) {
      let flag = !this.selected[index].selected
      this.selected[index].selected = flag
    },
    reset() {
      this.selected = this.selected.map(item => ({ name: item.name, selected: false }))
    },
    determine() {
      this.$emit('determine', this.selected)
      this.hide()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/scss/variables.scss';
.shade {
  position: absolute;
  z-index: 99;
  top: 0px;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.single-sizes-select {
  font-size: 0;
  background-color: #fff;
  padding: 12px 20px 20px 20px;
  .link {
    width: 168px;
    position: absolute;
    top: -20px;
    height: 20px;
    background-color: #fff;
  }
  .size-item {
    display: inline-block;
    width: 33%;
    height: 64px;
    padding: 12px 0;
  }
  .footer {
    margin-top: 24px;
    .btn {
      height: 80px;
      line-height: 80px;
      font-size: 32px;
      font-weight: normal;
      border-radius: 30px;
      width: 50%;
      display: inline-block;
    }
    .btn.reset {
      background-color: #eee;
      color: $text-color;
      &:enabled:active,
      &.active:enabled {
        border: 1px solid #eee;
        background-color: #eee;
      }
    }
  }
}
</style>
