<template>
  <div class="nav-bar footer">
    <router-link class="nav-bar-item" to="home" replace>
      <div class="iconfont icon-shouye"></div>
    </router-link>
    <router-link class="nav-bar-item" to="category" replace>
      <div class="iconfont icon-fenlei"></div>
    </router-link>
    <a class="nav-bar-item tel" :href="'tel:'+$state.mobile">
    </a>
    <router-link class="nav-bar-item" to="cart" replace>
      <div class="iconfont icon-gouwuche">
        <span class="badge">{{cartCount}}</span>
      </div>
    </router-link>
    <router-link class="nav-bar-item last" to="about-me" replace>
      <div class="iconfont icon-wode"></div>
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NavBar',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['cartCount'])
  }
}
</script>
<style lang="scss" scoped>
.nav-bar {
  background-color: #fff;
  width: 100%;
  height: 98px;
  line-height: 98px;
  padding: 8px 20px;
  // position: fixed;
  // left: 0;
  // right: 0;
  // bottom: 0;
  font-size: 0;
}
.nav-bar-item {
  display: inline-block;
  width: 82px;
  height: 82px;
  vertical-align: top;
  line-height: 82px;
  margin-right: 75px;
  text-align: center;
  color: #000;
  text-decoration: none;
  .iconfont {
    font-size: 40px;
  }
  &.tel {
    background-image: url('../assets/tel.png');
    background-size: contain;
  }
}
.nav-bar-item.last {
  margin-right: 0;
}
.nav-bar-item.router-link-active {
  color: rgb(255, 59, 65);
  .icon-shouye:before {
    content: '\e66e';
  }
  .icon-fenlei:before {
    content: '\e69e';
  }
  .icon-gouwuche:before {
    content: '\e67e';
  }
  .icon-wode:before {
    content: '\e681';
  }
}
</style>
