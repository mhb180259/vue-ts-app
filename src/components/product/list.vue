<template>
  <div class="content">
    <header-search @search="redoQuery" v-model="search.itemName"></header-search>
    <div class="sort">
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
    </div>
    <div class="filter">
      <div class="filter-item ellipsis">On Sale</div>
      <div class="filter-item ellipsis" v-for="n in props.length < 3 ? props.length : 3" :class="{selected: indexSingleSelect === n}" @click="showSizes(n)" :key="n">{{props[n-1].name}}
        <span class="iconfont icon-tabshouqi"></span>
      </div>
      <!-- <div class="filter-item ellipsis" :class="{selected: indexSingleSelect === 2}" @click="showSizes(2)">PIXELS
        <span class="iconfont icon-tabshouqi"></span>
      </div>
      <div class="filter-item ellipsis" :class="{selected: indexSingleSelect === 3}" @click="showSizes(3)">FOCALLENGTH
        <span class="iconfont icon-tabshouqi"></span>
      </div> -->
    </div>
    <MutilSizesSelect :is-show.sync="showMutilSelect" :list="props" @determine="determine"></MutilSizesSelect>
    <div class="main" v-infinite-scroll="loadNext" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <SingleSizesSelect :is-show.sync="showSingleSelect" :index="indexSingleSelect" :list="sizesSingleSelect" @determine="determineSingle"></SingleSizesSelect>
      <div class="empty" v-show="products.length === 0">
        <img src="../../assets/empty_product.png" alt="">
        <p>No relevant items are found.</p>
      </div>
      <img class="image" v-show="image" :src="image" alt="">
      <product-column-2 :products="products">
      </product-column-2>
      <loadMore :load="canLoad"></loadMore>
      <scroll-top></scroll-top>
    </div>
  </div>
</template>
<script>
import ItemService from '@/services/ItemService'
export default {
  name: 'list',
  components: {
    SingleSizesSelect: () => import('./list/single-sizes-select'),
    MutilSizesSelect: () => import('./list/mutil-sizes-select.vue')
  },
  data() {
    return {
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
      image: '',
      search: {
        condition: [],
        text: '',
        page: 1,
        pageSize: 10,
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
      ItemService.searchItem(this.search, this.tags).then(
        data => {
          this.products = this.products.concat(data.data.item_d_o_list)
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
    if (this.$route.query.itemName) {
      this.search.itemName = this.$route.query.itemName
    }
    if (params.tags) {
      this.tags = params.tags || []
    }
    if (params.image) {
      this.image = params.image
    }
    // 设置search
    for (let key in this.search) {
      if (params[key] !== undefined) {
        this.$set(this.search, key, params[key])
      }
    }
    this.query()
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
.image {
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
// .list-main {
//   position: absolute;
//   top: 220px;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   overflow: scroll;
// }
</style>
