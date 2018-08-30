<template>
  <div class="main-content" @scroll="scroll">
    <router-link class="about-me-header" to="account-detail">
      <div class="about-me-avatar">
        <div class="img" :style="{backgroundImage: 'url(' + avatarImg + ')'}"></div>
      </div>
      <div class="about-me-info">
        <div>{{me.user_name}}</div>
        <div>Level {{vip}}</div>
      </div>
      <span class="iconfont icon-jiantou pull-right"></span>
    </router-link>
    <div class="about-me-menus">
      <div class="about-me-menu" @click="goOrder()">
        <div class="menu-icon">
          <img src="../../assets/MYORDERS.png" alt="">
        </div>
        <div class="menu-title">
          My Orders
        </div>
      </div>
      <div class="about-me-menu" @click="goOrder(0)">
        <div class="menu-icon">
          <img src="../../assets/unpaid.png" alt="">
        </div>
        <div class="menu-title">
          Unpaid
        </div>
      </div>
      <div class="about-me-menu" @click="goOrder(1)">
        <div class="menu-icon">
          <img src="../../assets/OPEN.png" alt="">
        </div>
        <div class="menu-title">
          Open
        </div>
      </div>
      <div class="about-me-menu">
        <router-link to="coupon" class="about-me-menu">
          <div class="menu-icon">
            <img src="../../assets/youhuijuan.png" alt="">
          </div>
          <div class="menu-title">
            Coupon
          </div>
        </router-link>
      </div>
    </div>
    <div class="about-me-menus">
      <!--<div class="about-me-menu">-->
      <!--<div class="menu-icon">-->
      <!--<img src="../../assets/MYWALLET.png" alt="">-->
      <!--</div>-->
      <!--<div class="menu-title">-->
      <!--My Wallet-->
      <!--</div>-->
      <!--</div>-->
      <!--<router-link to="coupon" class="about-me-menu">-->
      <!--<div class="menu-icon">-->
      <!--<img src="../../assets/youhuijuan.png" alt="">-->
      <!--&lt;!&ndash; {{bonusCount}} &ndash;&gt;-->
      <!--</div>-->
      <!--<div class="menu-title">-->
      <!--Coupon-->
      <!--</div>-->
      <!--</router-link>-->
      <div class="about-me-menu">
        <div class="menu-icon red">
          ${{use_balance|moneyFormat}}
        </div>
        <div class="menu-title center">
          Balance
        </div>
      </div>
    </div>
    <div class="main" v-infinite-scroll="loadNext" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="product-column-2">
        <div class="product-header">
          — Order History —
        </div>
        <div class="product-list">
          <div v-for="(item) in historyData" class="product-item"
               :class="{ 'pull-left':item.x_group===0, 'pull-right':item.x_group===1}" :key="item.id"
               @click="viewDetail(item)">
            <div class="product-item-img">
              <img :src="item.image_value|imgFormat('middle')" alt="">
            </div>
            <div class="product-item-desc ellipsis-2">
              {{item.item_name}}
            </div>
            <template v-if="auth">
              <template v-if="item.discount_type !==0">
                <span class="new-price">${{item.price_real|moneyFormat}}</span>
                <span class="old-price">${{item.price|moneyFormat}}</span>
              </template>
              <template v-else>
                <span class="new-price">${{item.price|moneyFormat}}</span>
                <span class="old-price"></span>
              </template>
            </template>
            <template v-else>
              <span>Sign in for price</span>
            </template>
          </div>
          <!--<div class="product-item pull-left">-->
          <!--<div class="product-item-img">-->
          <!--<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521624031175&di=67266d58023a86838105fc44a47f2190&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm3%2FM01%2FC7%2F5F%2FwKhQ5lTAcWCEC0DzAAAAAE_5fFA266.jpg" alt="">-->
          <!--</div>-->
          <!--<div class="product-item-desc ellipsis-2">-->
          <!--Fugiat omnis aut ut quos tempora sapiente illo maxime id. Sit sit est quaerat qui. Qui eveniet esse nobis. Nostrum ad delectus harum. Qui veritatis ea dolore quos non.-->
          <!--</div>-->
          <!--<div class="login-tips">-->
          <!--Sign in for price-->
          <!--</div>-->
          <!--</div>        -->
          <!--<div class="product-item pull-right">-->
          <!--<div class="product-item-img">-->
          <!--<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521624031175&di=67266d58023a86838105fc44a47f2190&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm3%2FM01%2FC7%2F5F%2FwKhQ5lTAcWCEC0DzAAAAAE_5fFA266.jpg" alt="">-->
          <!--</div>-->
          <!--<div class="product-item-desc ellipsis-2">-->
          <!--Fugiat omnis aut ut quos tempora sapiente illo maxime id. Sit sit est quaerat qui. Qui eveniet esse nobis. Nostrum ad delectus harum. Qui veritatis ea dolore quos non.-->
          <!--</div>-->
          <!--<div class="login-tips">-->
          <!--Sign in for price-->
          <!--</div>-->
          <!--</div>        -->
          <!---->
          <!--<div class="product-item pull-left">-->
          <!--<div class="product-item-img">-->
          <!--<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521624031175&di=67266d58023a86838105fc44a47f2190&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm3%2FM01%2FC7%2F5F%2FwKhQ5lTAcWCEC0DzAAAAAE_5fFA266.jpg" alt="">-->
          <!--</div>-->
          <!--<div class="product-item-desc ellipsis-2">-->
          <!--Fugiat omnis aut ut quos tempora sapiente illo maxime id. Sit sit est quaerat qui. Qui eveniet esse nobis. Nostrum ad delectus harum. Qui veritatis ea dolore quos non.-->
          <!--</div>-->
          <!--<div class="new-price">$499.00</div>-->
          <!--<div class="old-price">$599.00</div>-->
          <!--</div>-->
          <!--<div class="product-item pull-right">-->
          <!--<div class="product-item-img">-->
          <!--<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521624031175&di=67266d58023a86838105fc44a47f2190&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fm3%2FM01%2FC7%2F5F%2FwKhQ5lTAcWCEC0DzAAAAAE_5fFA266.jpg" alt="">-->
          <!--</div>-->
          <!--<div class="product-item-desc ellipsis-2">-->
          <!--Fugiat omnis aut ut quos tempora sapiente illo maxime id. Sit sit est quaerat qui. Qui eveniet esse nobis. Nostrum ad delectus harum. Qui veritatis ea dolore quos non.-->
          <!--</div>-->
          <!--<div class="new-price">$499.00</div>-->
          <!--<div class="old-price">$599.00</div>-->
          <!--</div>-->

        </div>
        <loadMore :load="canLoad" @loadMore="loadNext"></loadMore>
      </div>
    </div>
  </div>
</template>
<script lang="es6">
// import checkService from '@/services/CheckService'
// import scroll from '@/mixins/mixin-scroll'
export default {
  name: "about-me",
  mixins: [scroll],
  data() {
    return {
      historyData: [],
      pagination: {
        page: 0,
        pageSize: 20,
        total: 0
      },
      use_balance: 0,
      bonusCount: 0,
      vip: 0,
      canLoad: true,
      loading: true
    };
  },
  computed: {
    avatarImg() {
      return this.me.avatar === "" ? require("../../assets/avatar-default.png") : this.me.avatar;
    }
  },
  methods: {
    loadNext() {
      if (this.canLoad) {
        this.queryHistory();
      }
    },
    initialize() {
      this.queryHistory();
      checkService.checkInfo().then(
        info => {
          info = info.data;
          if (!info || !info.acc_books) return;
          let subjects = info.acc_books._object("subject");
          this.use_balance = subjects["2010101"].use_balance;
          let sub0201102 = subjects["2010102"];
          this.bonusCount = sub0201102 && sub0201102.bonus ? sub0201102.bonus.length : 0;
          this.vip = info.vip;
          this.$store.commit("resetVip", { vip: info.vip });
        },
        function(msg) {
          this.$toast.show({ type: "error", message: msg.error_message });
        }
      );
    },
    queryHistory() {
      if (this.historyData.length >= this.pagination.total && this.pagination.page > 0) return;
      this.loading = true;
      this.pagination.page++;
      let params = {
        page: this.pagination.page,
        page_size: this.pagination.pageSize
      };
      checkService.history(params).then(
        orderInfo => {
          this.loading = false;
          let datalist = orderInfo.datalist;
          this.pagination.total = orderInfo.total;
          this.historyData._push(datalist, { x_group: 2 });
          if (this.historyData.length === this.pagination.total || datalist.length < this.pagination.pageSize) {
            this.canLoad = false;
          }
        },
        msg => {
          this.loading = false;
          // this.$toast.show({ type: 'error', message: msg.error_message })
        }
      );
    },
    goOrder(status) {
      this.$router.push({ name: "order-list", query: { status: status } });
    },
    viewDetail(item) {
      this.$router.push({ path: "/product-detail", query: { id: item.id } });
    }
  },
  mounted: function() {
    this.initialize();
  }
};
</script>
<style lang="less" scoped>
.product-header {
  line-height: 68px;
  font-size: 28px;
  text-align: center;
  color: rgba(0, 0, 0, 0.8);
}

.product-list {
  // margin: 0 20px;
  overflow: hidden;
}

.product-item {
  display: inline-block;
  // height: 382px;
  width: 374px;
  background-color: #fff;
  padding: 24px;
  margin-bottom: 2px;
  .login-tips {
    color: rgb(255, 59, 65);
    font-size: 28px;
    line-height: 1.8;
  }
  .new-price {
    font-size: 28px;
    line-height: 1.8;
    font-weight: bold;
  }
  .old-price {
    font-size: 24px;
  }
}

.product-item:nth-child(2n) {
  margin-left: 2px;
}

.product-item-img {
  text-align: center;
  height: 180px;
  img {
    display: inline-block;
    width: 160px;
    height: 160px;
  }
}

.product-item-desc {
  color: rgba(0, 0, 0, 0.8);
  height: 80px;
  font-size: 26px;
}

.about-me-header {
  display: block;
  height: 188px;
  width: 100%;
  background-image: linear-gradient(49deg, rgb(235, 51, 73) 0%, rgb(244, 92, 67) 100%);
  padding: 50px 20px 40px;
  color: #fff;
  .iconfont {
    margin-top: 30px;
  }
}

.about-me-avatar {
  display: inline-block;
  width: 98px;
  height: 98px;
  border-radius: 49px;
  background-color: #fff;
  .img {
    display: inline-block;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    background-size: contain;
  }
}

.about-me-info {
  margin-top: 8px;
  margin-left: 20px;
  display: inline-block;
  height: 80px;
  vertical-align: top;
  font-size: 28px;
  color: rgba(255, 255, 255, 0.8);
}

.about-me-menus {
  background-color: #fff;
  width: 100%;
  padding-top: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #eee;
  // height: 122px;
  font-size: 0;
  // margin-bottom: 1px; /* no */
  .about-me-menu {
    vertical-align: top;
    display: inline-block;
    width: 25%;
    text-align: center;
    height: 128px;
  }
  .menu-icon {
    display: inline-block;
    height: 88px;
    line-height: 88px;
    width: 88px;
    font-size: 22px;
    img {
      height: 88px;
      width: 88px;
    }
  }
  .menu-icon.red {
    width: 100%;
    color: rgb(255, 59, 65);
  }
  .menu-title {
    font-size: 22px;
    color: rgba(0, 0, 0, 0.8);
    line-height: 46px;
    word-break: keep-all; /* 不换行 */
    white-space: nowrap; /* 不换行 */
    text-align: center;
  }
  .center {
    margin-left: -10px;
  }
}
</style>
