<template>
  <div class="order-row">
    <slot name="header"></slot>
    <div class="order-row-item">
      <div class="order-row-item-select" v-if="canSel">
        <check-box :checked="checked" @input="change" :disabled="usable"></check-box>
      </div>
      <div class="order-row-item-main">
        <div class="order-row-item-img" @click="goDetail(data.id)">
          <img :src="data.img|imgFormat('normal')" alt="">
        </div>
        <div class="order-row-item-content">
           <div class="order-row-item-desc ellipsis-2">
             {{data.desc}}
          </div>
          <div class="label-list">
            <span class="label-item" v-for="label in data.labels" :key="label">{{label}}</span>
          </div>
          <slot name="info"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'order-row',
  props: {
    canSel: {
      type: Boolean,
      defualt: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    usable: {
      type: Boolean,
      default: false
    },
    disableclick: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default() {
        return {
          img: '',
          desc: '',
          labels: []
        }
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    change(checked) {
      this.$emit('select', checked)
    },
    goDetail(id) {
      if (this.disableclick) {
        return
      }
      this.$router.push({ name: 'product-detail', query: { id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.order-row {
  background-color: #fff;
  margin-top: 3px;
}
.order-row-item {
  padding: 12px 20px 12px 10px;
  margin-left: 10px;
  // height: 186px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
}
.order-row-item:last-of-type {
  border-bottom: 0;
}
.order-row-item-select {
  float: left;
  width: 20px;
  line-height: 150px;
  vertical-align: middle;
  margin-right: 20px;
}
.order-row-item-main {
  overflow: hidden;
}
.order-row-item-img {
  float: left;
  display: inline-block;
  width: 144px;
  height: 144px;
  img {
    width: 144px;
    height: 144px;
  }
}
.order-row-item-content {
  padding-left: 176px;
}
.order-row-item-desc {
  color: #a3a3a3;
  font-size: 28px;
  height: 66px;
  line-height: 1.2;
}
</style>
