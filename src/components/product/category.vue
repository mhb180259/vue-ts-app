<template>
  <div class="main-content">
    <header-search :show-back="false" @focus="toSearch" @search="toSearch"></header-search>
    <div class="category">
      <div class="category-list">
        <div class="category-item" :class="{'selected': 999 === selectedId}" @click="select(999, 'On Sale')">
          On Sale
        </div>
        <div v-for="item in categoryList" :key="item.id" class="category-item ellipsis"
             :class="{'selected':item.id === selectedId}" @click="select(item.id, item.name)">
          {{item.name}}
        </div>
      </div>
      <div class="product-list">
        <scroll-top :bottom="120"></scroll-top>
        <div class="product-title">
          {{selectedName}}
        </div>
        <div class="product-row">
          <div v-for="(product, index) in itemProduct" :key="index" class="product-row-item" @click="gotoDetail(product.id)">
            <div class="product-row-item-img">
              <img v-lazy="imgFml(product.image_value)" alt="">
            </div>
            <div class="product-row-item-content">
              <div class="product-row-item-desc ellipsis-2">
                {{product.item_name}}
              </div>
              <template v-if="auth">
                <template v-if="product.discount_type != 0">
                  <span class="new-price">${{product.price_real|moneyFormat}}</span>
                  <span class="old-price">${{product.price|moneyFormat}}</span>
                </template>
                <template v-else>
                  <span class="new-price">${{product.price|moneyFormat}}</span>
                  <span class="old-price"></span>
                </template>
              </template>
              <template v-else>
                <div class="login-tips">
                  Sign in for price
                </div>
              </template>
            </div>
          </div>
        </div>
        <load-more :isloading="isLoading" :load="canLoad" @loadMore="loadMore"></load-more>
      </div>
    </div>
  </div>
</template>
<script lang="es6">
import { mapActions, mapState } from "vuex";

export default {
  name: "category",
  data() {
    return {
      isLoading: false,
      selectedId: 999,
      selectedName: "On Sale",
      busy: false,
      search: {
        orderBy: "",
        cateId: [],
        itemName: "",
        page: 1,
        pageSize: 10
      },
      canLoad: true
    };
  },
  computed: mapState('cache', [
    "itemProduct",
    "categoryList",
    "searchCateId"
  ]),
  methods: {
    ...mapActions('cache', [
      "searchItem",
      "putCateId",
      "clearAllItem"
    ]),
    imgFml(url) {
      return window._imgFormat(url, "normal");
    },
    loadMore() {
      this.isLoading = true;
      if (this.canLoad) {
        this.search.page++;
        this.query();
      }
    },
    toSearch() {
      this.$router.push({ name: "search" });
    },
    gotoDetail(id) {
      this.$router.push(`product-detail?id=${id}`);
    },
    toBack() {
      this.$router.push({ name: "home" });
    },
    select(id, name) {
      this.clearAllItem({});
      this.search.page = 1;
      this.canLoad = true;
      this.id = id;
      this.selectedId = id;
      this.putCateId({params: {id: id}}); // 发送Action
      this.name = name;
      this.query("initItem");
    },
    async query(type) {
      this.selectedName = this.name;
      if (this.id === 999) {
        this.id = "";
      }
      this.search.cateId = [this.id];
      // 搜索产品列表
      let params = {
        item_search: JSON.stringify({
          puserIds: this.search.puserIds,
          itemName: this.search.itemName,
          brand: this.search.brand,
          cateId: this.search.cateId[this.search.cateId.length - 1],
          attribute_1: this.search.attribute_1,
          discountType: this.search.discountType,
          allStatus: this.search.allStatus,
          sin: this.search.sin,
          propValues: this.search.condition,
          tags: [],
          type: 0,
        }),
        page: this.search.page,
        page_size: this.search.pageSize,
        order_by: this.search.orderBy
      };
      let resData = await this.searchItem({type, params});
      this.isLoading = false;
      if (this.itemProduct.length >= resData.data.total) {
        this.canLoad = false;
      }
    }
  },
  mounted() {
    this.id = 999;
    this.name = "On Sale";
    this.selectedId = 999;
    if (this.searchCateId !== -1) {
      this.id = this.searchCateId;
      this.selectedId = this.searchCateId;
    } else {
      if (this.categoryList[0]) {
        this.id = this.categoryList[0].id;
        this.name = this.categoryList[0].name;
      }
    }
    this.query("initItem");
  }
};
</script>
<style lang="less" scoped>
.category {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.login-tips {
  color: rgb(255, 59, 65);
  font-size: 28px;
  line-height: 1.8;
}

.product-list {
  padding-left: 12px;
  flex: 1;
  height: 100%;
  // position: fixed;
  // left: 204px;
  // right: 0;
  // top: 160px;
  // bottom: 110px;
  overflow: scroll;
}

.product-title {
  height: 68px;
  line-height: 68px;
}

.product-row-item {
  background-color: #fff;
  border: 1px solid #f6f6f6;
  height: 156px;
  width: 100%;
  padding: 18px 40px 18px 36px;
}

.product-row-item-content {
  margin-left: 144px;
}

.product-row-item-desc {
  font-size: 24px;
  color: #585858;
  line-height: 1.2;
}

.new-price {
  font-size: 28px;
}

.old-price {
  font-size: 24px;
}

.product-row-item-img {
  float: left;
  width: 120px;
  height: 120px;
  img {
    width: 100%;
    height: 100%;
  }
}

.category-list {
  width: 192px;
  height: 100%;
}

.category-item {
  text-align: center;
  font-size: 28px;
  padding: 0 20px;
  width: 100%;
  background-color: #fff;
  line-height: 100px;
  border-bottom: 1px solid #eee;
  &.selected {
    background-color: #f6f6f6;
    color: #ff3b41;
  }
}

.category-item.active {
  color: #ff3b41;
}
</style>
