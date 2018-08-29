<template>
  <div class="index-header">
    <div class="index-header-menus">
      <div class="index-header-menu" @click="toCatalog">
        <div class="index-header-menu-icon">
          <div class="iconfont icon-quanbudingdan"></div>
        </div>
        <div class="index-header-menu-title">Catalog</div>
      </div>
      <router-link class="index-header-menu" :to="{path:'/order-list',query: {status: 0}}">
        <div class="index-header-menu-icon">
          <div class="iconfont icon-iconfontxiaofeifenqi"></div>
        </div>
        <div class="index-header-menu-title">Unpaid Orders</div>
      </router-link>
      <router-link class="index-header-menu" to="order-list">
        <div class="index-header-menu-icon">
          <div class="iconfont icon-wodedingdan"></div>
        </div>
        <div class="index-header-menu-title">All Orders</div>
      </router-link>
    </div>
  </div>
</template>
<script lang="js">
export default {
  name: 'Header',
  data() {
    return {}
  },
  methods: {
    toCatalog() {
      if (this.auth) {
        this.$router.push({ name: 'product-catalog' })
      } else {
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.index-header {
  // padding-top: 40px;
  width: 750px;
  // height: 320px;
  padding-bottom: 12px;
  background-image: linear-gradient(49deg, rgb(235, 51, 73) 0%, rgb(244, 92, 67) 100%);
}
.index-header-menus {
  width: 750px;
  font-size: 0;
}
.index-header-menu {
  display: inline-block;
  width: 250px;
}
.index-header-menu-icon {
  display: block;
  margin: 8px auto 0;
  width: 90px;
  height: 90px;
  vertical-align: middle;
  text-align: center;
  .iconfont {
    margin: 0;
    font-size: 72px;
    line-height: 90px;
    color: #fff;
  }
}
.index-header-menu-title {
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 30px;
}
</style>
