<template>
  <div class="main-content">
    <div class="index-header-search">
      <input type="search" class="index-header-search-input" placeholder="Search: Model Number">
      <span class="index-icon iconfont icon-sousuo2"></span>
    </div>
    <div class="main">
      <header-nav></header-nav>
      <div v-loading="loading">
        <div class="content-bar">
          <div v-for="item in barsList" :key="item.key" @click="toBannerPage(item)">
            <img :src="item.x_url" alt="">
          </div>
        </div>
        <load-box :load="!getHomeProducts"></load-box>
        <product-column-2 title="Best Sellers" :products="hotList"></product-column-2>
        <div v-for="item in floorList" :key="item.id">
          <product-column-2 :title="item.name" :products="item.items"></product-column-2>
        </div>
        <div class="footer"></div>
      </div>
      <scroll-top :bottom="120"></scroll-top>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
const Module = namespace("data");

@Component({
  components: {
    HeaderNav: () => import("./Header.vue")
  }
})
export default class Home extends Vue {
  @Module.State loading: any;
  @Module.Action getData: any;
  @Module.State getHomeBars: any;
  @Module.State getHomeProducts: any;

  get barsList() {
    if (!this.getHomeBars) return [];
    this.getHomeBars.data.bars.forEach((item: any) => {
      item.x_url = (<any>window)._imgFormat(item.url, 'large')
    });
    return this.getHomeBars.data.bars
  }

  get hotList() {
    if (!this.getHomeProducts) return [];
    return this.getHomeProducts.hot_buys.datalist[0].items.slice(0, 4);
  }

  get floorList() {
    if (!this.getHomeProducts) return [];
    return this.getHomeProducts.floor.datalist;
  }

  private toBannerPage(bar: any) {
    if (bar.type === 'detail') {
      this.$router.push({name: 'product-detail', query: {id: bar.key}})
    } else if (bar.type === 'search') {
      this.$router.push({name: 'product-list', query: bar})
    } else if (bar.type === 'activity-6get2') {
      this.$router.push({name: 'activity-6get2'})
    } else if (bar.type === 'miaosha') {
      this.$router.push({name: 'lightningdeals'})
    } else if (bar.type === 'no-ready') {
      this.$router.push({name: 'no-ready', query: bar})
    } else {
      this.$router.push({name: 'activity', query: bar})
    }
  }

  private async mounted() {
    this.getData({type: "getHomeBars", params: {}});
    this.getData({type: "getHomeProducts", params: {}});
  }
}
</script>
<style lang="less" scoped>
.content-bar {
  width: 100%;
  font-size: 0;
  > div:nth-child(1) {
    margin-top: 4px;
  }
  > div {
    margin-bottom: 4px;
  }
  img {
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
  height: 64px;
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
