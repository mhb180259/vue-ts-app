<template>
  <div class="content">
    <head-bar>{{title}}</head-bar>
    <!-- <header-search @search="redoQuery" v-model="search.itemName"></header-search> -->
    <!-- <div class="sort">
      <div class="sort-item" :class="{selected: search.orderBy === ''}" @click="setOrderBy('')">Relevance</div>
      <div class="sort-item" :class="{selected: search.orderBy.indexOf('cdate') > -1}" @click="setOrderBy('cdate')">Added Time
        <div class="sort-icon">
          <span class="iconfont icon-paixujiantoushang" :class="{black: search.orderBy === 'cdate desc'}"></span>
          <span class="iconfont icon-paixujiantouxia" :class="{black: search.orderBy === 'cdate asc'}"></span>
        </div>
      </div>
      <div class="sort-item" :class="{selected: search.orderBy.indexOf('price') > -1}" @click="setOrderBy('price')">Price
        <div class="sort-icon">
          <span class="iconfont icon-paixujiantoushang" :class="{black: search.orderBy === 'price desc'}"></span>
          <span class="iconfont icon-paixujiantouxia" :class="{black: search.orderBy === 'price asc'}"></span>
        </div>
      </div>
      <div class="sort-item" @click="showMutilAttr">Filter
        <span class="iconfont icon-shaixuan"></span>
      </div>
    </div> -->
    <!-- <div class="filter">
      <div class="filter-item ellipsis">On Sale</div>
      <div class="filter-item ellipsis" v-for="n in props.length < 3 ? props.length : 3" :class="{selected: indexSingleSelect === n}" @click="showSizes(n)" :key="n">{{props[n-1].name}}
        <span class="iconfont icon-tabshouqi"></span>
      </div>
    </div>
    <MutilSizesSelect :is-show.sync="showMutilSelect" :list="props" @determine="determine"></MutilSizesSelect> -->
    <div class="main" v-loading="loading">
      <!-- <SingleSizesSelect :is-show.sync="showSingleSelect" :index="indexSingleSelect" :list="sizesSingleSelect" @determine="determineSingle"></SingleSizesSelect> -->
      <img class="activity-bar" v-lazy="barImage" alt="">
      <div class="selectBtn" v-if="key == 'july' && products.length != 0">
        <div :class="{leftBtn: true, activeBtn: activeFlag == 'ip'}" @click="selectJulyGoods('ip')">IP Solution</div>
        <div :class="{rightBtn: true, activeBtn: activeFlag == 'hd'}" @click="selectJulyGoods('hd')">HD-TVI Solution</div>
      </div>
      <div class="empty" v-show="products.length === 0">
        <img src="../../assets/empty_product.png" alt="">
        <p>No relevant items are found.</p>
      </div>
      <product-column-2 :products="products">
      </product-column-2>
      <!-- <loadMore :load="canLoad" @loadMore="loadNext" v-show="products.length !== 0"></loadMore> -->
      <scroll-top></scroll-top>
    </div>
  </div>
</template>
<script>
import ItemService from '@/services/ItemService'
import appConfigServer from '@/services/AppConfigServer'
export default {
  name: 'activity',
  components: {
    SingleSizesSelect: () => import('./list/single-sizes-select'),
    MutilSizesSelect: () => import('./list/mutil-sizes-select.vue')
  },
  data() {
    return {
      barImage: '',
      title: '',
      activityType: '',
      key: '',
      julyIpData: [],
      julyHdData: [],
      activeFlag: 'ip',
      ids: '',
      showSingleSelect: false,
      showMutilSelect: false,
      sizesSingleSelect: [],
      sizesMutilSelect: {},
      indexSingleSelect: 0,
      products: [],
      props: [],
      propName: '',
      tags: [],
      loading: true,
      search: {
        condition: [],
        text: '',
        page: 1,
        pageSize: 1000,
        totalPage: 1,
        cateId: '',
        itemName: '',
        brand: '',
        puserId: '',
        attribute_1: '',
        discountType: '',
        allStatus: '',
        sin: '',
        propValues: [],
        orderBy: ''
      },
      canLoad: true
    }
  },
  methods: {
    loadNext() {
      if (this.loading) return
      if (this.canLoad) {
        this.search.page++
        this.query()
      }
    },
    determine(selected) {
      this.products = []
      this.props = selected
      this.setPropValues()
      this.query()
    },
    determineSingle(selected) {
      this.products = []
      for (let prop of this.props) {
        if (prop.name === this.propName) {
          prop.value = selected
          break
        }
      }

      this.setPropValues()
      this.query()
    },
    setPropValues() {
      this.search.condition = []
      this.props.forEach(prop => {
        prop.value.forEach(item => {
          if (item.selected) {
            this.search.condition.push(`${prop.name}:${item.name}`)
          }
        })
      })
    },
    queryPropSelected(name, value) {
      for (let prop of this.props) {
        if (prop.name === name) {
          for (let item of prop.value) {
            if (value === item.name) {
              return item.selected
            }
          }
        }
      }
      return false
    },
    redoQuery() {
      this.page = 1
      this.pageSize = 10
      this.products = []
      this.query()
    },
    query() {
      this.loading = true
      if (this.activityType === '' || !this.activityType) {
        ItemService.searchItem(this.search, this.tags).then(
          data => {
            this.products = this.products.concat(data.data.item_d_o_list)
            // 根据sortid排序
            const sortid = (this.$route.query.sortid && this.$route.query.sortid.split('-')) || []
            if (sortid.length > 0) {
              this.products.sort((a, b) => {
                let aIndex = sortid.indexOf(a.id.toString())
                let bIndex = sortid.indexOf(b.id.toString())
                // 如果a,b在sortid中不存在，设置索引为较大值，将其放在最后
                if (aIndex === -1) {
                  aIndex = 9999
                }
                if (bIndex === -1) {
                  bIndex = 9999
                }
                return sortid.indexOf(a.id.toString()) - sortid.indexOf(b.id.toString())
              })
            }
            if (this.products.length >= data.data.total) {
              this.canLoad = false
            }
            let props = data.data.aggregate_cate_prop_list
            this.props = props.map(prop => ({
              name: prop.name,
              value: prop.value.map(item => ({ name: item, selected: this.queryPropSelected(prop.name, item) }))
            }))
            this.loading = false
          },
          msg => {
            this.loading = false
            this.$toast.show({ type: 'error', message: msg.error_message })
          }
        )
      } else if (this.activityType && this.activityType === 'fixedGoods') {
        if (this.key === 'july') {
          this.getJulyIpData();
        } else {
          let params = {
            ids: this.ids
          };
          ItemService.getActivityItemList(params).then(
            data => {
              this.products = this.products.concat(data.datalist);
              this.loading = false
            },
            msg => {
              this.loading = false
              this.$toast.show({ type: 'error', message: msg.error_message })
            }
          )
        }
      }
    },
    getJulyIpData() {
      let params = {
        ids: this.ids.split(',').slice(0, 10).join(',')
      };
      ItemService.getActivityItemList(params).then(
        data => {
          this.julyIpData = this.julyIpData.concat(data.datalist);
          this.products = this.julyIpData;
          this.loading = false;
          this.getJulyHdData();
        },
        msg => {
          this.loading = false
          this.$toast.show({ type: 'error', message: msg.error_message })
        }
      )
    },
    getJulyHdData() {
      let params = {
        ids: this.ids.split(',').slice(10).join(',')
      };
      ItemService.getActivityItemList(params).then(
        data => {
          this.julyHdData = this.julyHdData.concat(data.datalist);
          this.loading = false
        },
        msg => {
          this.loading = false
          this.$toast.show({ type: 'error', message: msg.error_message })
        }
      )
    },
    selectJulyGoods(i) {
      this.activeFlag = i;
      if (i === 'ip') {
        this.products = this.julyIpData;
      } else if (i === 'hd') {
        this.products = this.julyHdData;
      }
    },
    setOrderBy(method) {
      this.products = []
      let orderBy = this.search.orderBy
      if (method === '') {
        this.search.orderBy = ''
      } else if (orderBy.indexOf(method) > -1 && orderBy.indexOf('desc') > -1) {
        this.search.orderBy = method + ' asc'
      } else {
        this.search.orderBy = method + ' desc'
      }
      this.query()
    },
    showMutilAttr() {
      this.showSingleSelect = false
      this.showMutilSelect = true
    },
    showSizes(index) {
      this.indexSingleSelect = index
      this.propName = this.props[index - 1].name
      this.sizesSingleSelect = this.props[index - 1].value
      this.showSingleSelect = true
    }
  },
  beforeMount() {
    let params = this.$route.query
    let setData = () => {
      // 设置活动标题
      this.title = params.name
      // 设置活动bar
      this.barImage = window._imgFormat(params.image, 'large')
      // 设置tags
      this.tags = typeof params.tags === 'string' ? [params.tags] : params.tags
      // 设置search
      for (let key in this.search) {
        if (params[key]) {
          this.$set(this.search, key, params[key])
        }
      }
      // by:maisi 设置活动类型，目的是为了掉不同的接口，现有活动大多都是调固定IP的那个接口，所以这里区别一下。
      // 标识位统一一下，‘fixedGoods’
      this.activityType = params.activityType;
      this.key = params.key;
      this.ids = params.sortid;
      this.query()
    }
    if (params.activityId) {
      appConfigServer.getAppConfig().then(info => {
        for (let item of info.data.bars) {
          if (item.key.toString() === params.activityId) {
            params = item
            setData()
          }
        }
      })
    } else {
      setData()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
.activity-bar {
  width: 100%;
  height: auto;
}
.sort {
  line-height: 56px;
  background-color: #fff;
  font-size: 0;
  display: flex;
}
.sort-item {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;
  display: inline-block;
  padding: 0 20px;
  font-size: 28px;
  &.selected {
    color: #ff3b41;
    .sort-icon {
      color: #ff3b41;
    }
  }
}
span.iconfont.icon-shaixuan {
  font-size: 32px;
}
.sort-icon {
  display: inline-block;
  vertical-align: top;
  color: #999;
  .black {
    color: #999;
  }
  .icon-paixujiantoushang {
    position: absolute;
  }
  .icon-paixujiantouxia {
    position: absolute;
  }
}
.filter {
  padding: 10px 20px;
  font-size: 0;
}
.main {
  position: relative;
}
.filter-item {
  display: inline-block;
  font-size: 22px;
  line-height: 2;
  width: 168px;
  text-align: center;
  margin-right: 12px;
  position: relative;
  background-color: #fff;
  .iconfont {
    font-size: 16px;
  }
  &.selected {
    color: $primary-color;
    .iconfont::before {
      content: '\e650';
    }
  }
  &:last-of-type {
    margin-right: 0;
  }
}
.selectBtn {
  height: 60px;
  line-height: 60px;
  .leftBtn, .rightBtn {
    float: left;
    width: 50%;
    text-align: center;
    background-color: rgba(65,65,65,1);
    opacity: 0.4;
    color: #fff;
    cursor: pointer;
    font-size: 24px;
  }
  .activeBtn {
    background: rgba(202,53,61,1);
    opacity: 1;
  }
}
// .list-main {
//   position: absolute;
//   top: 220px;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   overflow: scroll;
// }
</style>
