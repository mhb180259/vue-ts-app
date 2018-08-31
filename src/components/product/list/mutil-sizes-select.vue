<template>
  <div class="shade" v-show="isShow" @click.self="hide">
    <div class="mutil-sizes-select">
      <div class="mutil-sizes-header"></div>
      <div class="mutil-sizes-main">
        <div class="attr-list" v-for="(sub, subIndex) in selected" :key="sub.name">
          <div class="header">
            {{sub.name}}
          </div>
          <div class="attr-item" v-for="(item, index) in sub.value" :key="item.name" :class="{clear: (index + 1) % 3 === 0, selected: item.selected}" @click="selectSize(subIndex, index)">
            {{item.name}}
          </div>
        </div>
      </div>
      <div class="footer">
        <button class="btn grey" @click="reset">Reset</button>
        <button class="btn pull-right" @click="determine">Determine</button>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'mutil-sizes-select',
  props: {
    isShow: Boolean,
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
  methods: {
    reset() {
      this.selected.forEach(item => {
        item.value.forEach(child => {
          child.selected = false
        })
      })
      this.$emit('determine', this.selected)
      this.hide()
    },
    hide() {
      this.$emit('update:isShow', false)
    },
    selectSize(subIndex, itemIndex) {
      this.selected[subIndex].value[itemIndex].selected = !this.selected[subIndex].value[itemIndex].selected
    },
    determine() {
      // 使用emit返回想要数据
      this.$emit('determine', this.selected)
      this.hide()
    }
  }
}
</script>
<style lang="scss" scoped>
.shade {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
}
.mutil-sizes-select {
  position: absolute;
  left: 100px;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  padding: 12px;
  display: flex;
  flex-direction: column;
}
.mutil-sizes-header {
  height: 40px;
}
.mutil-sizes-main {
  flex: 1;
  overflow: auto;
}
.attr-list {
  display: flex;
  // justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 30px;
  .header {
    font-size: 26px;
    margin-bottom: 12px;
    width: 100%;
  }
  .attr-item {
    flex: 0 0 30%;
    margin-right: 12px;
    margin-bottom: 12px;
    &.clear {
      margin-right: 0;
    }
  }
}
.footer {
  // position: absolute;
  padding: 10px 54px;
  bottom: 0;
  right: 0;
  left: 0;
  .btn {
    display: inline-block;
    width: 220px;
    font-weight: normal;
  }
}
</style>
