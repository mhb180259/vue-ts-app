<template>
  <div class="main-content">
    <div class="index-header-search">
      <input type="search" class="index-header-search-input" placeholder="Search: Model Number">
      <span class="index-icon iconfont icon-sousuo2"></span>
    </div>
    <div class="main">
      <header-nav></header-nav>
      {{barsListData}}
      <!--<div>-->
        <!--<div class="content-bar">-->
          <!--<a v-for="item in bars" @click="toBannerPage(item)" :key="item.key">-->
            <!--<img v-lazy="item.x_url" alt="">-->
          <!--</a>-->
        <!--</div>-->
        <!--<product-column-2 title="Best Sellers" :products="hotList">-->
          <!--&lt;!&ndash; <span class="more">MORE-->
            <!--<span class="iconfont icon-jiantou"></span>-->
          <!--</span> &ndash;&gt;-->
        <!--</product-column-2>-->
        <!--<div v-for="item in floor" :key="item.id">-->
          <!--<product-column-2 :title="item.name" :products="item.items"></product-column-2>-->
        <!--</div>-->
        <!--<div class="footer">-->
          <!--I have a bottom line-->
        <!--</div>-->
      <!--</div>-->
      <!--<scroll-top :bottom="120"></scroll-top>-->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';


@Component({
  components: {
    HeaderNav: () => import("./Header.vue")
  }
})
export default class HomeView extends Vue {
  @State('getHomeBars') private barsListData: any;
  @Action('getDataAction') private getHomeBarsActions: any;

  data() {
    return {
    }
  }

  private mounted() {
    this.getHomeBarsActions({type: "getHomeBars", params: {}})
  }
}
</script>
<style lang="less" scoped>
// .content {
//   background-color: #f6f6f6;
//   top: 0;
//   padding-bottom: 10px;
//   margin-bottom: 100px;
// }
.content-bar {
  // height: 320px;
  width: 100%;
  img {
    // height: 100%;
    width: 100%;
    height: auto;
  }
}
.main {
  margin-top: -2px;
}
.more {
  position: absolute;
  right: 20px;
  font-size: 22px;
}
.more > .iconfont {
  font-size: 22px;
}
.footer {
  line-height: 64px;
  font-size: 22px;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
}
.index-header-search {
  width: 750px;
  height: 96px;
  padding: 18px 20px 18px 20px;
  background-image: linear-gradient(49deg, rgb(235, 51, 73) 0%, rgb(244, 92, 67) 100%);
}
.index-header-search-input {
  width: 630px;
  height: 60px;
  border-radius: 30px;
  border: none;
  padding: 0 20px;
  font-size: 20px;
}
.index-header-search-input {
  outline: none;
}
.index-icon {
  font-size: 50px;
  position: relative;
  top: 2px;
}
.iconfont {
  margin-left: 20px;
  color: #fff;
  vertical-align: middle;
  line-height: 52px;
}
</style>
