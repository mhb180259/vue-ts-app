<template>
  <div class="lightningdeals">
    <head-bar>Lightning Deals</head-bar>
    <div>
      <img src="http://ltsres-us.oss-us-west-1.aliyuncs.com/misc/58414b4c97eab1a84150a18523798c75.png" alt="" class="bg">
    </div>
    <div class="main" id="main" v-loading="loading">
      <div class="goodsCont">
        <div class="mixGoods" v-for="(i,index) in goodsList" :key="index">
          <CountTime :propsItem="i" :iIndex="index" v-on:countStatus="countStatus"></CountTime>
          <div class="oneGoods">
            <div class="checkBoxDiv">
              <template v-if="i.timeFinish">
                <div v-show="i.addCartFlag" class="checkBox" @click="addCartItem(i)"></div>
                <img v-show="!i.addCartFlag" class="checkBoxImg" @click="deleteCartItem(i)" src="https://ltsb2b.oss-us-west-1.aliyuncs.com/misc/d190683b4bb81c2ff0238353948d4139.png" alt="">
              </template>
              <!--<template v-else>
                <div v-show="i.addCartFlag" class="noCheckBox"></div>
              </template>-->
            </div>
            <div class="imgCon" :style="{backgroundImage:'url('+i.image_value+'!item_middle)'}"></div>
            <div class="textCon">
              <div class="goodsName" @click="goDetail(i.id)">
                <!--<div class="goodsLogo">{{i.showTag}}</div>-->
                <span>{{i.item_name}}</span>
              </div>
              <div class="goodsProps">
                <div class="oneProps">
                  <ul class="propsName">
                    <li v-for="(iProp,index) in i.showProps" :key="index">{{iProp}}</li>
                  </ul>
                </div>
              </div>
              <div class="priceCon">
                <div class="priceShow" v-if="auth">
                  <span class="activePrice">${{parseFloat(i.price_real / 100)}}</span>
                  <template v-if="i.price_real != i.price">
                    <span class="catalogPrice">${{parseFloat(i.price / 100)}}</span>
                    <span class="discountSign">
                      <span>{{((parseFloat(i.price / 100) - parseFloat(i.price_real / 100)) * 100 / parseFloat(i.price / 100)).toFixed(0)}}%off</span>
                      <span class="triangle"></span>
                    </span>
                  </template>
                  <div class="numCart" v-if="i.timeFinish">
                    <Numbox v-model="i.num" :min="i.sale_rule_time ? i.sale_rule_time.minimum : ''"
                            :max="i.sale_rule_time ? i.sale_rule_time.maxinum : ''" class="inputNum" @change="addCartItem(i)"></Numbox>
                  </div>
                  <div style="position:absolute;bottom: 0;left: 0;color: rgba(0,0,0,0.5);font-size: 12px;" v-if="i.sale_rule_time">Min Quantity {{i.sale_rule_time.minimum}}, Max Quantity {{i.sale_rule_time.maxinum}}</div>
                </div>
                <button v-else class="signLogin" @click="goLogin">Sign In For Price</button>
              </div>
            </div>
          </div>
          <div :class="{relationGoods: true,relationGoodsRun: !i.addCartFlag}" v-if="i.relationList.length != 0">
            <!--<div class="relationCover" v-show="i.addCartFlag"></div>-->
            <div class="relationTriangle"></div>
            <p class="relationText">Frequently bought together items. Save more by getting these.</p>
            <div class="relationCon">
              <div class="oneRelation" v-for="(item,index) in i.relationList" :key="index">
                <div class="checkBoxDiv">
                  <div v-show="item.addCartFlag" class="checkBox" @click="addCartItem(item)"></div>
                  <img v-show="!item.addCartFlag" class="checkBoxImg" @click="deleteCartItem(item)" src="https://ltsb2b.oss-us-west-1.aliyuncs.com/misc/d190683b4bb81c2ff0238353948d4139.png" alt="">
                </div>
                <div class="imgCon" :style="{backgroundImage:'url('+item.image_value+'!item_middle)'}"></div>
                <div class="textCon">
                  <div class="goodsName" @click="goDetail(item.id)">
                    <!--<div class="goodsLogo">{{item.showTag}}</div>-->
                    <span>{{item.item_name}}</span>
                  </div>
                  <div class="priceCon">
                    <div class="priceShow">
                      <span class="activePrice">${{parseFloat(item.price_real / 100)}}</span>
                      <template v-if="item.price_real != item.price">
                        <span class="catalogPrice">${{parseFloat(item.price / 100)}}</span>
                        <span class="discountSign">
                          <span>{{((parseFloat(item.price / 100) - parseFloat(item.price_real / 100)) * 100 / parseFloat(item.price / 100)).toFixed(0)}}%off</span>
                          <span class="triangle"></span>
                        </span>
                      </template>
                      <div class="numCart">
                        <Numbox v-model="item.num" class="inputNum" @change="addCartItem(item)"></Numbox>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footCont">
        <div class="totalMoney">
          <div class="totalTitle">total:</div>
          <div class="totalMoneyNum">
            <div class="realPrice">${{totalRealPrice}}</div>
            <div class="oldPrice">${{totalOldPrice}}</div>
          </div>
        </div>
        <div class="addCartBtn" @click="addCart">Add to Cart</div>
      </div>
    </div>
    <scroll-top :bottom="120"></scroll-top>
  </div>
</template>
<script>
  import itemService from '@/services/ItemService.js'
  import cartService from '@/services/CartService'
  import scroll from '@/mixins/mixin-scroll'

  export default {
    name: 'lightningdeals',
    components: {
      CountTime: () => import('@/components/count-time.vue'),
      Numbox: () => import('@/components/numbox.vue')
    },
    mixins: [scroll],
    data() {
      return {
        goodsData: [
          {
            id: 12653,
            showProps: ['2.1MP High Definition, 1920X1080P@30fps', '1/2.8” CMOS', '2.8mm Fixed Lens', '1 Matrix IR LED up to 100ft', '3D DNR, DWDR, BLC, VCA', 'IP66. DC 12V, Po'],
            price: '',
            price_real: '',
            off: '',
            num: 0,
            showTag: '',
            relationId: '12629,12630,10362,10279',
            relationList: []
          },
          {
            id: 12656,
            showProps: ['1080P Wi-Fi Video Doorbell', 'Full HD 180° panoramic', 'Day/night view with built-in IR', 'Record to NVR in 1080P', 'Two-way audio', 'No extra wires; replaces doorbell and connects to existing chimes'],
            price: '',
            price_real: '',
            off: '',
            num: 0,
            showTag: '',
            relationId: '10213,10222,10237',
            relationList: []
          },
          {
            id: 12652,
            showProps: ['3 MP High-Performance CMOS，up to 1080P resolution', 'True Day/Night', 'OSD Menu, DNR, SMART IR', 'True WDR, up to 120dB', 'EXIR technology, up to 60 ft IR distance', 'IP66 weatherproof'],
            price: '',
            price_real: '',
            off: '',
            num: 0,
            showTag: '',
            relationId: '',
            relationList: []
          },
          {
            id: 12655,
            showProps: ['Completely Surface Mounted', 'Grade 1. Tamper Resistant', 'Static Strength 1,500 lbs. Dynamic Strength 70 ft-lbs', 'Endurance 1,000,000 Cycles. Horizontal Adjustment', 'Dual Voltage 12 or 24 VDC', '5 Years Warranty'],
            price: '',
            price_real: '',
            off: '',
            num: 0,
            showTag: '',
            relationId: '12654,11776,10234,10232',
            relationList: []
          },
          {
            id: 12654,
            showProps: ['Dual voltage 12 or 24 VDC. Completely Surface Mounted. Endurance 500,000 Cycles', 'Grade 1. One 1/8" Spacer Plate Included', 'Decorative Cover for Sleek New Look', 'Tamper Resistant. Non-handed', 'Static Strength 1,500 lbs. Dynamic Strength 70 ft-lbs', '10 Years Warranty'],
            price: '',
            price_real: '',
            off: '',
            num: 0,
            showTag: '',
            relationId: '12655,11776,10234,10232',
            relationList: []
          }
        ],
        goodsList: [],
        cartList: [],
        cartIdList: [],
        totalRealPrice: 0,
        totalOldPrice: 0,
        loading: true
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.getData();
      });
    },
    methods: {
      getData() {
        let params = {
          ids: ''
        };
        this.goodsData.forEach((i, index) => {
          if (params.ids === '') {
            params.ids = i.id;
          } else {
            params.ids += ',' + i.id;
          }
        });
        itemService.getActivityItemList(params).then((data) => {
          data.datalist.forEach((t, index) => {
            t.addCartFlag = true;
            t.addCartLoading = false;
            this.goodsData.forEach(v => {
              v.num = 1;
              if (t.id === v.id) this.goodsList.push(Object.assign({}, v, t))
            });
          });
          this.goodsList.sort((a, b) => {
            return params.ids.indexOf(a.id) - params.ids.indexOf(b.id);
          });
          this.loading = false;
          this.getRelationData();
        });
      },
      getRelationData() {
        this.goodsData.forEach((i) => {
          let params = {
            ids: i.relationId
          };
          itemService.getActivityItemList(params).then((data) => {
            data.datalist.forEach((t, index) => {
              t.addCartFlag = true;
              t.addCartLoading = false;
              t.addRelationCartFlag = false;
              t.num = 1;
            });
            this.goodsList.forEach((item) => {
              if (i.id === item.id) {
                item.relationList = data.datalist;
              }
            });
          });
        });
      },
      addCart() {
        this.loading = true;
        this.cartList.forEach((item, cIndex) => {
          itemService.getItemDetail(item.id).then((data) => {
            data.data.item.item_struct_props.forEach((v, i) => {
              if (v.sku) {
                cartService.putCartPlus(item, v).then((data) => {
                  item.addCartFlag = false;
                  item.addCartLoading = false;
                  item.addRelationCartFlag = true;
                  if (cIndex === this.cartList.length - 1) {
                    this.loading = false;
                    this.$router.push({path: '/cart'});
                  }
                }, (msg) => {
                  item.addCartLoading = false;
                  this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
              }
            });
          }, (msg) => {
            item.addCartLoading = false;
            this.$ltsMessage.show({type: 'error', message: msg.errorMessage});
          });
        });
      },
      addCartItem(item) {
        if (item.addCartFlag) {
          item.addCartFlag = !item.addCartFlag;
        }
        let oneItem = {
          id: item.id,
          price: item.price,
          priceReal: item.price_real,
          num: item.num
        };
        if (this.cartList.length === 0) {
          this.cartList.push(oneItem);
          this.cartIdList.push(item.id);
        } else {
          this.cartList.every((i, index) => {
            if (i.id === oneItem.id) {
              i.num = oneItem.num;
              return false;
            } else if (index === this.cartList.length - 1) {
              this.cartList.push(oneItem);
              this.cartIdList.push(item.id);
            } else {
              return true;
            }
          });
        }
        this.countTotal();
      },
      deleteCartItem(item) {
        item.addCartFlag = !item.addCartFlag;
        this.cartList.every((i, index) => {
          if (i.id === item.id) {
            item.num = 1;
            if (item.relationList && item.relationList.length !== 0) {
              this.cartList.splice(index, 1);
              this.cartIdList.splice(index, 1);
              let oneDeleteArr = item.relationId.split(',');
              oneDeleteArr.every((oneItem, oneIndex) => {
                let i = this.cartIdList.indexOf(parseInt(oneItem));
                if (i > -1) {
                  this.cartList.splice(i, 1);
                  this.cartIdList.splice(i, 1);
                  return true;
                } else {
                  return true;
                }
              });
              item.relationList.every((i) => {
                if (!i.addCartFlag) {
                  i.addCartFlag = !i.addCartFlag;
                  return true;
                }
              });
            } else {
              this.cartList.splice(index, 1);
              this.cartIdList.splice(index, 1);
              return false;
            }
          } else {
            return true;
          }
        });
        this.countTotal();
      },
      countTotal() {
        this.totalRealPrice = this.totalOldPrice = 0;
        this.cartList.forEach((i) => {
          this.totalRealPrice += i.priceReal * i.num;
          this.totalOldPrice += i.price * i.num;
        });
        this.totalRealPrice = (this.totalRealPrice / 100).toFixed(2);
        this.totalOldPrice = (this.totalOldPrice / 100).toFixed(2);
      },
      countStatus(statusStarted, statusFinished, iIndex) {
        this.$set(this.goodsList[iIndex], 'timeFinish', statusStarted && !statusFinished)
      },
      goLogin() {
        this.$router.push({path: '/login'});
      },
      goDetail(id) {
        this.$router.push({name: 'product-detail', query: {id: id}})
      }
    }
  }
</script>
<style lang="scss">
  .lightningdeals {
    *{
      margin: 0;
      padding: 0;
    }
    background: rgba(245, 245, 245, 1);
    .bg {
      display: block;
      width: 100%;
    }
    .main {
      position: relative;
      width: 100%;
      padding: 0 0 120px 0;
      .toTopBtn {
        position: fixed;
        right: 118px;
        bottom: 110px;
        width: 36px;
        cursor: pointer;
        img {
          display: block;
          width: 100%;
        }
      }
      .header {
        height: 60px;
        line-height: 60px;
        .leftBtn, .rightBtn {
          float: left;
          width: 50%;
          text-align: center;
          background-color: rgba(65, 65, 65, 1);
          opacity: 0.4;
          color: #fff;
          cursor: pointer;
          font-size: 24px;
        }
        .activeBtn {
          background: rgba(202, 53, 61, 1);
          opacity: 1;
        }
      }
      .mixGoods {
        margin-bottom: 20px;
      }
      .oneGoods {
        padding: 20px 0 30px;
        overflow: hidden;
        background-color: #fff;
        -webkit-display: flex;
        display: flex;
        -webkit-align-items: center;
        align-items: center;
        -webkit-justify-content: center;
        justify-content: center;
        .checkBox {
          float: left;
          width: 38px;
          height: 38px;
          border: 1px solid rgba(0,0,0,0.3);
          margin-left: 15px;
        }
        .noCheckBox {
          float: left;
          width: 38px;
          height: 38px;
          background-color: rgba(0,0,0,0.1);
          border: 1px solid rgba(0,0,0,0.3);
          margin-left: 15px;
        }
        .checkBoxImg {
          width: 38px;
          margin-left: 15px;
        }
        .imgCon {
          float: left;
          width: 190px;
          height: 190px;
          margin-left: 40px;
          background-size: 100% 100%;
          background-position: 50%;
          background-repeat: no-repeat;
          position: relative;
        }
        .textCon {
          float: left;
          width: 60%;
          margin-left: 40px;
          color: #555;
          .goodsName {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 15px;
            .goodsLogo {
              position: relative;
              display: inline-block;
              height: 24px;
              line-height: 24px;
              background: #d1002c;
              margin-right: 6px;
              padding: 0 4px;
              color: #fff;
            }
          }
          .goodsProps {
            font-size: 16px;
            .oneProps {

            }
            .propsName, .propsKey {
              display: inline-block;
              line-height: 26px;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .propsName {
              width: 90%;
              padding-left: 15px;
              li {
                list-style: disc;
              }
            }
            .propsKey {
              width: 300px;
            }
          }
        }
        .priceCon {
          float: left;
          margin: 0;
          position: relative;
          .signLogin {
            display: block;
            border: 1px solid #ff3b41;
            width: 148px;
            height: 26px;
            line-height: 22px;
            font-weight: 700;
            color: #ff3b41;
            background: #fff;
            cursor: pointer;
            margin-top: 30px;
            font-size: 14px;
          }
          .signLogin:hover {
            color: #fff;
            background: #ff3b41;
          }
          .priceShow {
            position: relative;
            height: 70px;
            -webkit-display: flex;
            display: flex;
            -webkit-align-items: center;
            align-items: center;
            -webkit-justify-content: center;
            justify-content: center;
          }
          .numCart {
            display: inline-block;
          }
          .activePrice {
            font-size: 26px;
            font-weight: bold;
            color: #D1002C;
          }
          .catalogPrice {
            font-size: 20px;
            color: #999;
            padding: 0 20px;
            text-decoration: line-through;
          }
          .discountSign {
            position: relative;
            height: 24px;
            line-height: 18px;
            font-size: 16px;
            color: #fff;
            background: #D1002C;
            padding: 4px 14px 4px 6px;
            font-weight: bold;
            margin-right: 15px;
            .triangle {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 0;
              height: 0;
              border-top: 12px solid transparent;
              border-right: 8px solid #fff;
              border-bottom: 12px solid transparent;
            }
          }
          .el-input-number {
            width: 148px;
            margin-top: 16px;
          }
          .addCart {
            margin-left: 10px;
            background-color: rgba(255, 139, 11, 1);
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
          }
          .addCartSuccess {
            position: relative;
            top: 15px;
            display: inline-block;
            margin-left: 10px;
            width: 109px;
            height: 40px;
            background-color: #3A9C1B;
            border-radius: 5px;
            text-align: center;
            img {
              display: block;
              margin: 5px auto;
            }
          }
        }
      }
      .relationGoods {
        position: relative;
        background-color: #E0E1E5;
        margin: 16px;
        overflow: hidden;
        padding: 0px 20px;
        max-height: 0;
        -webkit-transition: all 0.8s;
        -moz-transition: all 0.8s;
        -o-transition: all 0.8s;
        transition: all 0.8s;
        .relationCover {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: rgba(0,0,0,0.24);
          z-index: 100;
        }
        .relationText {
          position: relative;
          top: 16px;
          color: rgba(0, 0, 0, 0.8);
          font-size: 18px;
          margin-bottom: 32px;
        }
        .jumpCart {
          position: absolute;
          top: 276px;
          right: 16px;
          margin-left: 5px;
          background-color: #ff8b0b;
          color: #fff;
          border-radius: 5px;
          cursor: pointer;
        }
        .relationTriangle {
          position: absolute;
          top: -8px;
          left: 130px;
          border-left: 30px solid #E0E1E5;
          border-bottom: 30px solid transparent;
          transform: rotate(45deg);
        }
        .relationCon {
          padding-bottom: 36px;
        }
      }
      .relationGoodsRun {
        max-height: 980px;
        overflow: visible;
      }
      .oneRelation {
        padding: 20px 0;
        overflow: hidden;
        background-color: #fff;
        -webkit-display: flex;
        display: flex;
        -webkit-align-items: center;
        align-items: center;
        -webkit-justify-content: center;
        justify-content: center;
        .checkBox {
          float: left;
          width: 38px;
          height: 38px;
          border: 1px solid rgba(0,0,0,0.3);
        }
        .checkBoxImg {
          width: 38px;
        }
        .imgCon {
          float: left;
          width: 160px;
          height: 160px;
          margin-left: 12px;
          background-size: 100% 100%;
          background-position: 50%;
          background-repeat: no-repeat;
          position: relative;
        }
        .textCon {
          float: left;
          width: 60%;
          margin-left: 40px;
          color: #555;
          .goodsName {
            font-size: 20px;
            font-weight: bold;
            margin-top: 24px;
            .goodsLogo {
              position: relative;
              display: inline-block;
              height: 24px;
              line-height: 24px;
              background: #d1002c;
              margin-right: 6px;
              padding: 0 4px;
              color: #fff;
            }
          }
          .goodsProps {
            font-size: 16px;
            .oneProps {

            }
            .propsName, .propsKey {
              display: inline-block;
              line-height: 24px;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .propsName {
              width: 90%;
              padding-left: 15px;
              li {
                list-style: disc;
              }
            }
            .propsKey {
              width: 300px;
            }
          }
        }
        .priceCon {
          float: left;
          margin: 0;
          position: relative;
          .signLogin {
            display: block;
            border: 1px solid #ff3b41;
            width: 148px;
            height: 26px;
            line-height: 22px;
            font-weight: 700;
            color: #ff3b41;
            background: #fff;
            cursor: pointer;
            margin: 0 0 16px 70px;
            font-size: 14px;
          }
          .signLogin:hover {
            color: #fff;
            background: #ff3b41;
          }
          .priceShow {
            position: relative;
            height: 70px;
            -webkit-display: flex;
            display: flex;
            -webkit-align-items: center;
            align-items: center;
            -webkit-justify-content: center;
            justify-content: center;
          }
          .numCart {
            display: inline-block;
            margin-left: 20px;
          }
          .activePrice {
            font-size: 26px;
            font-weight: bold;
            color: #D1002C;
          }
          .catalogPrice {
            font-size: 20px;
            color: #999;
            padding: 0 20px;
            text-decoration: line-through;
          }
          .discountSign {
            position: relative;
            height: 24px;
            line-height: 18px;
            font-size: 16px;
            color: #fff;
            background: #D1002C;
            padding: 4px 14px 4px 6px;
            font-weight: bold;
            .triangle {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 0;
              height: 0;
              border-top: 12px solid transparent;
              border-right: 8px solid #fff;
              border-bottom: 12px solid transparent;
            }
          }
          .el-input-number {
            width: 148px;
            margin-top: 16px;
          }
          .addCart {
            margin-left: 10px;
            background-color: rgba(255, 139, 11, 1);
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
          }
          .addCartSuccess {
            position: relative;
            top: 15px;
            display: inline-block;
            margin-left: 10px;
            width: 109px;
            height: 40px;
            background-color: #3A9C1B;
            border-radius: 5px;
            text-align: center;
            img {
              display: block;
              margin: 5px auto;
            }
          }
        }
      }
      .footCont {
        position: fixed;
        bottom: 0;
        z-index: 150;
        width: 100%;
        height: 88px;
        background-color: #fff;
        .totalMoney {
          float: left;
          width: 60%;
          height: 100%;
          -webkit-display: flex;
          display: flex;
          -webkit-align-items: center;
          align-items: center;
          -webkit-justify-content: center;
          justify-content: center;
          .totalTitle {
            float: left;
            width: 60%;
            height: 100%;
            text-align: right;
            color: #555;
            font-size: 22px;
            line-height: 88px;
            margin-right: 25px;
          }
          .totalMoneyNum {
            .realPrice {
              font-size: 26px;
              color: #D10A2C;
              font-weight: bold;
            }
            .oldPrice {
              font-size: 18px;
              color: rgba(0,0,0,0.4);
              text-decoration: line-through;
            }
          }
        }
        .addCartBtn {
          float: left;
          width: 40%;
          height: 100%;
          background-color: #D10A2C;
          text-align: center;
          line-height: 88px;
          font-size: 26px;
          font-weight: bold;
          color: #fff;
        }
      }
    }
  }
</style>
