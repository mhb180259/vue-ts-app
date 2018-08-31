<template>
  <div>
    <div class="loading" v-if="loading" v-loading="loading"></div>
    <head-bar>Buy 6 Get 2 Free</head-bar>
    <div class="a-wrap" v-show="!loading">
      <div class="a-img">
        <img ref="imageheader"
             src="http://ltsres-us.oss-us-west-1.aliyuncs.com/misc/3b77e90f83e1a6e55edbccb33c6bb16a.jpeg" alt="">
      </div>
      <div class="p-wrap">
        <ul>
          <li
            v-for="(value, index) in navListArr"
            :class="navIndex==index?'active':''"
            :key="index"
          >{{value}}
            <span v-if="index!==3"></span>
            <span v-if="index!==3"><i></i></span>
          </li>
        </ul>
        <div class="p-list">
          <div class="p-tips" v-if="navIndex != 0">People who bought #{{productType}}# also bought these:</div>
          <div class="product" v-for="item in showData" :key="item.id">
            <div v-if="navIndex == 0">
              <img v-if="selectedItem.id == item.id" src="../../assets/svg/radio-active.svg" alt="">
              <img v-if="selectedItem.id != item.id" src="../../assets/svg/radio.svg" @click="handleClickRedio(item)"
                   alt="">
            </div>
            <div v-else></div>
            <div>
              <img :src="item.image_value" @click="goToDetails(item)" alt="">
            </div>
            <div>
              <div class="p-details" @click="goToDetails(item)">
                <p class="p-title">{{item.item_name}}</p>
                <div>
                  <div class="left">
                    <p v-for="val in item.props.slice(0, 3)" :key="val">{{val}}</p>
                  </div>
                  <div class="right">
                    <p v-for="val in item.props.slice(3)" :key="val">{{val}}</p>
                  </div>
                </div>
              </div>
              <p v-if="navIndex == 0">
                You will get
                <span v-if="item.id == 12510 || item.id == 12512">{{Math.floor(item.num/6)*2}}</span>
                <span v-if="item.id == 12514">{{Math.floor(item.num/4)*2}}</span>
                free cameras.
              </p>
              <span class="discount" v-if="navIndex != 0&&item.price_real != item.price">{{item.off}}% off</span>
              <div class="price-num">
                <span class="red-price" v-if="auth">$ {{item.price_real}}</span>
                <span class="red-price" v-if="!auth&&navIndex == 0" @click="signIn">Sign In For Price</span>
                <span class="gray-price" v-if="auth&&item.price_real != item.price">$ {{item.price}}</span>
                <div>
                  <div @click="handleNumChange('dec', item)"></div>
                  <input type="text" v-model="item.num" @input="changeInputNum(item)" @change="changeNum(item)">
                  <div @click="handleNumChange('inc', item)"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-words">
        <span>Disclaimer</span>
        <p>
          LTS Mall exclusive offer.<br/>
          Get it while supply lasts.<br/>
          This offer is not combinable with other discounts or offers.<br/>
          Coupons may not be applied.<br/>
        </p>
      </div>
      <div class="footer-bar" v-if="navIndex == 0">
        <div class="left" @click="handleSelected(true)">Buy It Now</div>
        <div class="right" @click="handleSelected(false)">Select</div>
      </div>
      <div class="footer-bar" v-else>
        <div class="left" @click="goBack">Go Back</div>
        <div class="right" @click="handleNextStep">Confirm & Next Step</div>
      </div>
    </div>
  </div>
</template>
<script>
  import itemService from '@/services/ItemService.js'
  import cartService from '@/services/CartService.js'
  import { activityProduct } from '../../../static/activity-6for2';

  export default {
    name: 'activity-6get2',
    data() {
      return {
        navIndex: 0,
        loading: true,
        cameraData: [],
        recorderData: [], // 第二步条目
        storageData: [],
        accessoriesData: [],
        selectedItem: null, // 选中条目
        checkboxArr: [],
        itemChildren: null, // 选中条目对应的子集
        freeProductId: 12511, // 赠送商品id
        checkedItem: null, // 选中商品条目
        freeCamera: null, // 赠送商品
        showBar: true,
        navListArr: ['Camera', 'Recorder', 'Storage', 'Accessories'],
        camera: activityProduct.camera,
        recorder: activityProduct.recorder,
        storage: activityProduct.storage,
        accessories: activityProduct.accessories
      }
    },
    computed: {
      showData() {
        if (this.navIndex === 0) {
          return this.cameraData
        } else if (this.navIndex === 1) {
          return this.recorderData
        } else if (this.navIndex === 2) {
          return this.storageData
        } else {
          return this.accessoriesData
        }
      },
      productType() {
        if (this.selectedItem) {
          if (this.selectedItem.id === 12510) {
            return 'CMIP7342W-28M'
          } else if (this.selectedItem.id === 12512) {
            return 'CMIP3342W-28M'
          } else {
            return 'CMHT2722-28'
          }
        } else {
          return ''
        }
      }
    },
    mounted() {
      Promise.all([this.getCamera(), this.loadImage()]).then(suc => {
        this.loading = false
      })
    },
    methods: {
      loadImage() {
        return new Promise(resolve => {
          this.$refs.imageheader.onload = () => {
            resolve('success')
          }
        })
      },
      changeNum(item) {
        item.num = Number(item.num)
        if (item.id === 12510 || item.id === 12512) {
          if (!item.num || item.num < 6) {
            this.showBar = false
            setTimeout(() => {
              this.showBar = true
            }, 500)
            item.num = 6
          }
        } else if (item.id === 12514) {
          if (!item.num || item.num < 4) {
            this.showBar = false
            setTimeout(() => {
              this.showBar = true
            }, 500)
            item.num = 4
          }
        } else {
          if (item.num === 0) {
            this.sliceCheckboxArr(item.id)
          } else {
            let bool = false
            this.checkboxArr.forEach(value => {
              if (value.id === item.id) {
                value.num = item.num
                bool = true
              }
            })
            if (!bool) {
              this.checkboxArr.push(item)
            }
          }
        }
      },
      changeInputNum(item) {
        // 限制输入框数字
        if (item.num >= 10000) {
          item.num = 9999
        }
        if (item.id !== 12510 && item.id !== 12512 && item.id !== 12514) {
          item.num = Number(item.num)
          if (!(item.num >= 0)) {
            item.num = 0
          }
        }
      },
      handleClickRedio(item) {
        // 点击单选调用
        this.selectedItem = item
      },
      getCamera() {
        // 获得首屏条目
        this.cameraData = []
        let params = {
          ids: '12510,12512,12514'
        }
        return itemService.getActivityItemList(params).then((data) => {
          this.handleResData(data.datalist, this.camera, this.cameraData)
          this.cameraData.sort((a, b) => params.ids.indexOf(a.id) - params.ids.indexOf(b.id))
          this.selectedItem = this.cameraData[0]
        })
      },
      getRecorder() {
        // 获取下一步条目
        let params = {
          ids: this.itemChildren.recorderId
        }
        this.recorderData = []
        return itemService.getActivityItemList(params).then((data) => {
          this.handleResData(data.datalist, this.recorder, this.recorderData)
          this.loading = false
        })
      },
      getStorage() {
        this.storageData = []
        let params = {
          ids: this.itemChildren.storageId
        }
        return itemService.getActivityItemList(params).then((data) => {
          this.handleResData(data.datalist, this.storage, this.storageData)
          this.loading = false
        })
      },
      getAccessories() {
        this.accessoriesData = []
        let params = {
          ids: this.itemChildren.accessoriesId
        }
        return itemService.getActivityItemList(params).then((data) => {
          this.handleResData(data.datalist, this.accessories, this.accessoriesData)
          this.loading = false
        })
      },
      handleResData(res, data1, data2) {
        res.forEach(t => {
          data1.forEach(v => {
            if (t.id === v.id) {
              data2.push(Object.assign({}, t, v))
            }
          })
        })
      },
      sliceCheckboxArr(id) {
        let index
        this.checkboxArr.forEach((value, key) => {
          if (value.id === id) {
            index = key
            this.checkboxArr.splice(index, 1)
          }
        })
      },
      commenNumChange(n, item, type) {
        if (type === 'dec') {
          if (item.num > n) {
            item.num--
          }
        } else {
          item.num++
        }
      },
      handleNumChange(type, item) {
        // 点击数量变化调用
        if (item.id === 12510 || item.id === 12512) {
          this.commenNumChange(6, item, type)
        } else if (item.id === 12514) {
          this.commenNumChange(4, item, type)
        } else {
          this.commenNumChange(0, item, type)
          // 当多选数量为0时需要清空选中
          if (item.num === 0) {
            this.sliceCheckboxArr(item.id)
          } else if (item.num === 1) {
            this.checkboxArr.push(item)
          }
        }
      },
      getFreeDetail() {
        // 获取免费赠送商品详情
        return new Promise((resolve, reject) => {
          // 先拿到赠品的数量
          let freeNum
          if (this.freeProductId === 12511 || this.freeProductId === 12513) {
            freeNum = Math.floor(this.selectedItem.num / 6) * 2
          } else {
            freeNum = Math.floor(this.selectedItem.num / 4) * 2
          }
          itemService.getItemDetail(this.freeProductId).then(resp => {
            let item = resp.data.item
            let props = resp.data.item.item_struct_props
            for (let i = 0; i < props.length; i++) {
              if (props[i].sku === true && props[i].storage >= freeNum) {
                this.freeCamera = this.getDetailJson(i, item, props, resp, freeNum)
                return resolve('success')
              }
              if (i === (props.length - 1)) {
                reject(new Error('fail'))
              }
            }
          }, error => {
            this.$toast.show({ type: 'error', message: 'Something wrong!' })
            reject(error)
          })
        })
      },
      getDetailJson(i, item, props, resp, freeNum = 0) {
        return {
          'activity_id': null,
          'attribute': item.attribute,
          'brand': item.brand,
          'category_id': item.category_id,
          'discount': item.discount,
          'discount_type': item.discount_type,
          'id': item.id,
          'item_name': item.item_name.replace('%', '%25'),
          'item_props': [props[i]],
          'maxinum': item.maxinum,
          'mininum': item.mininum,
          'num': !freeNum ? item.num : freeNum,
          'price': item.price * 100,
          'price_real': item.price_real * 100,
          'proxy_distribute_num': item.proxy_distribute_num,
          'puser_id': item.puser_id,
          'spec_unit': item.spec_unit,
          'spu_id': props[i].spu_id,
          'status': item.status,
          'storage': props[i].storage,
          'tag': item.tag,
          'url': item.url,
          'full_url': resp.data.item.full_url,
          'sale_rule': item.sale_rule,
          'price_define_do': item.price_define_do
        }
      },
      getProductDetail(item) {
        // 获取选中商品详情
        return new Promise((resolve, reject) => {
          itemService.getItemDetail(item.id).then(resp => {
            let props = resp.data.item.item_struct_props
            for (let i = 0; i < props.length; i++) {
              if (props[i].sku === true && props[i].storage > item.num) {
                this.checkedItem = this.getDetailJson(i, item, props, resp)
                // 每次拿到正确的结果并将其返回
                return resolve(this.checkedItem)
              }
              if (i === (props.length - 1)) {
                reject(new Error('fail'))
              }
            }
          }, error => {
            this.$toast.show({ type: 'error', message: 'Something wrong!' })
            reject(error)
          })
        })
      },
      handleSelected(type) {
        if (!this.showBar) {
          let num = 6
          if (this.selectedItem.id === 12514) {
            num = 4
          }
          this.$toast.show({type: 'message', message: `To get free cameras, you have to buy at least ${num}.`, time: 3000})
          return
        }
        // 先判断是否登录
        if (!this.auth) {
          this.$router.push({name: 'login', query: {redirect: JSON.stringify({name: 'activity-6get2'})}})
          return
        }
        this.loading = true
        this.itemChildren = this.selectedItem.children
        this.freeProductId = this.selectedItem.id + 1
        Promise.all([this.getProductDetail(this.selectedItem), this.getFreeDetail(this.freeProductId)]).then(success => {
          // 将选中以及赠品加入购物车
          Promise.all([this.putCartPlus(this.checkedItem), this.putCartPlus(this.freeCamera)]).then(suc => {
            console.log('加入购物车成功' + suc)
            this.$toast.show({ type: 'message', message: 'Add cart successfully!' })
            if (type) {
              this.loading = false
              this.$router.push({name: 'cart'})
            }
            if (!type) {
              // 选中后下一步
              this.navIndex = 1
              this.getRecorder()
            }
          }, err => {
            console.log('加入购物车失败' + err)
            this.$toast.show({ type: 'error', message: 'Out of stock!' })
          })
        }, fail => {
          this.loading = false
          console.log('首页数据获取失败' + fail)
          this.$toast.show({type: 'error', message: 'Out of stock!'})
        })
      },
      putCartPlus(item) {
        // 加入购入车时调用
        if (item.price_real !== item.price) {
          item.diy_price = item.price_real
        }
        if (item.item_props) {
          return new Promise((resolve, reject) => {
            cartService.putCartPlus(item, item.item_props[0]).then((data) => {
              resolve(data)
            }, (msg) => {
              reject(msg)
            })
          })
        }
      },
      handleAddCart(arr) {
        let cartProduct = []
        let arrNum = arr.length
        if (arrNum === 0) {
          if (this.navIndex === 4) {
            this.navIndex = 0
            this.loading = false
            this.$router.push({name: 'cart'})
          }
          return
        }
        arr.forEach((item) => {
          this.getProductDetail(item).then((data) => {
            cartProduct.push(data)
            if (cartProduct.length === arrNum) {
              let cartProductFn = cartProduct.map(item => {
                return this.putCartPlus(item)
              })
              Promise.all(cartProductFn).then(suc => {
                console.log('加入购物车成功' + suc)
                this.$toast.show({ type: 'message', message: 'Add cart successfully!' })
                if (this.navIndex === 4) {
                  this.navIndex = 0
                  this.loading = false
                  this.$router.push({name: 'cart'})
                }
              }, err => {
                console.log('加入购物车失败' + err)
                this.$toast.show({ type: 'error', message: 'Out of stock!' })
              })
            }
          }, err => {
            console.log('加入购物车失败' + err)
            this.$toast.show({ type: 'error', message: 'Out of stock!' })
          })
        })
      },
      signIn() {
        this.$router.push({name: 'login', query: {redirect: JSON.stringify({name: 'activity-6get2'})}})
      },
      handleNextStep() {
        if (this.navIndex === 1) {
          this.loading = true
          // 先验证后加入购物车
          this.handleAddCart(this.checkboxArr)
          this.checkboxArr = []
          this.navIndex = 2
          this.getStorage()
        } else if (this.navIndex === 2) {
          this.loading = true
          this.handleAddCart(this.checkboxArr)
          this.checkboxArr = []
          this.navIndex = 3
          this.getAccessories()
        } else if (this.navIndex === 3) {
          this.loading = true
          this.navIndex = 4
          this.handleAddCart(this.checkboxArr)
          this.checkboxArr = []
        }
      },
      goBack() {
        if (this.navIndex > 0) {
          this.navIndex--
        }
      },
      goToDetails(item) {
        if (this.navIndex === 0) {
          return
        }
        this.$router.push({name: 'product-detail', query: {id: item.id}})
      }
    }
  }
</script>
<style lang="scss" scoped>
  .loading {
    position: fixed;
    width: 100%;
    height: 100%;
  }

  .a-wrap {
    background-color: #282b8b;
    padding-bottom: 97px;
  }

  .a-img {
    img {
      width: 100%;
    }
  }

  .p-wrap {
    margin: 0 24px;
    p {
      padding: 0;
      margin: 0;
    }
    > ul {
      display: flex;
      align-items: flex-end;
      color: #434343;
      font-size: 24px;
      li {
        flex: 1;
        height: 52px;
        line-height: 52px;
        text-align: center;
        background-color: #3c79b0;
        position: relative;
        span {
          width: 0;
          height: 0;
          position: absolute;
          border-top: 26px solid transparent;
          border-bottom: 26px solid transparent;
        }
        span:nth-child(1) {
          right: -12px;
          z-index: 2;
          border-left: 15px solid #3c79b0;
        }
        span:nth-child(2) {
          right: -17px;
          z-index: 1;
          border-left: 15px solid #282b8b;
          i {
            width: 5px;
            height: 52px;
            background: #282b8b;
            position: absolute;
            left: -19px;
            top: -26px;
          }
        }
      }
      li:first-child {
        border-radius: 15px 0 0 0;
      }
      li:last-child {
        border-radius: 0 15px 0 0;
      }
      .active {
        color: #fff;
        background-color: #64bcf4;
        span:nth-child(1) {
          border-left-color: #64bcf4;
        }
      }
    }
  }

  .p-list {
    margin-top: -1px;
    .p-tips {
      color: #fff;
      height: 40px;
      font-size: 20px;
      line-height: 45px;
      background: #64bcf4;
      padding-left: 11px;
    }
    .product {
      height: 345px;
      background-color: #fff;
      border: 8px solid #64bcf4;
      display: flex;
      align-items: center;
      p {
        line-height: 1.3;
      }
      > div:nth-child(1) {
        > img {
          width: 38px;
          padding: 11px 0 11px 11px;
        }
        .disable-select {
          width: 26px;
          height: 26px;
          margin-left: 11px;
          background: #f1f1f1;
          border: 1px solid #b5b5b5;
          position: relative;
          top: -7px;
        }
      }
      > div:nth-child(2) {
        width: 205px;
        font-size: 0;
        text-align: center;
        img {
          width: 80%;
        }
      }
      > div:nth-child(3) {
        flex: 1;
        padding-top: 18px;
        .p-details {
          >.p-title {
            width: 420px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            word-wrap: break-word;
            line-height: 1.1;
            font-size: 22px;
          }
          > div:nth-child(2) {
            color: #434343;
            font-size: 18px;
            padding-top: 28px;
            padding-bottom: 40px;
            overflow: hidden;
            display: flex;
            p {
              line-height: 1.5;
            }
            .left {
              width: 200px;
              padding-right: 40px;
              p {
                white-space: nowrap;
              }
            }
            .right {

            }
          }
        }
        > p:nth-child(2) {
          color: #434343;
          float: right;
          padding-right: 15px;
          font-size: 18px;
          padding-bottom: 25px;
        }
        .discount {
          color: #c94253;
          font-size: 22px;
          float: right;
          padding-right: 27px;
          padding-bottom: 15px;
          margin-top: -10px;
        }
        .price-num {
          width: 100%;
          overflow: hidden;
          font-size: 22px;
          > .red-price {
            color: #c94253;
          }
          > .gray-price {
            color: #b5b5b5;
            text-decoration: line-through;
          }
          > div {
            width: 160px;
            height: 40px;
            float: right;
            margin-right: 12px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-image: url("../../assets/svg/selectcount.svg");
            overflow: hidden;
            text-align: center;
            line-height: 40px;
            display: flex;
            input {
              width: 70px;
              outline: none;
              border: none;
              text-align: center;
              background: transparent;
            }
            div {
              width: 47px;
              height: 80px;
              position: relative;
              top: -25px;
              z-index: 2;
            }
          }
        }
      }
    }
  }

  .footer-words {
    font-size: 18px;
    padding-left: 34px;
    padding-top: 37px;
    color: #42bffa;
  }

  .footer-bar {
    width: 100%;
    height: 97px;
    line-height: 97px;
    text-align: center;
    display: flex;
    position: fixed;
    bottom: 0;
    color: #fff;
    font-size: 34px;
    .left {
      width: 251px;
      background-color: #403e3e;
    }
    .right {
      flex: 1;
      background-color: #c94253;
    }
  }
</style>
