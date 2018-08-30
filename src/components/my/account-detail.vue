<template>
  <div class="content" v-loading="loading">
    <head-bar>
      Account Details
      <!--<span class="iconfont icon-icon-bainji" slot="right"></span>-->
    </head-bar>
    <div class="avatar">
      <div  class="avatar-img" :style="{backgroundImage: 'url(' + engineerInfo.user.url + ')'}"></div>
      <span>Hello {{engineerInfo.user.name}}, good day！</span>
    </div>
    <!--<div class="avatar" v-if="personalInfo.url != ''">-->
      <!--<img class="avatar-img" :src='personalInfo.url' alt="" >-->
      <!--<span>Profile</span>-->
    <!--</div>-->
    <div class="cell-list">
      <div class="cell-item item-blk">Email
        <div class="pull-right">
         {{personalInfo.email}}
        </div>
      </div>
      <div class="cell-item item-blk">Name
        <div class="pull-right">
          {{personalInfo.name}}
        </div>
      </div>
      <div class="cell-item item-blk">Contact Number
        <div class="pull-right">
          {{personalInfo.contactNum}}
        </div>
      </div>
      <div class="cell-item item-blk">Company Name
        <div class="pull-right">
          {{engineerInfo.user.name}}
        </div>
      </div>
      <div class="cell-item item-blk">Business Number
        <div class="pull-right">
          {{personalInfo.bussinessNum}}
        </div>
      </div>
    </div>
    <router-link to="address" class="cell-list">
      <div class="cell-item item-blk">Manage My Address
        <div class="pull-right">
         <span class="iconfont icon-jiantou arrow-right  item-blk"></span>
        </div>
      </div>
    </router-link>
    <router-link to="about-us" class="cell-list">
      <div class="cell-item item-blk">About Us
        <div class="pull-right ">
         <span class="iconfont icon-jiantou arrow-right item-blk"></span>
        </div>
      </div>
    </router-link>
    <div class="logout-btn" @click="myLogout">
      <button class="btn">
        Log Out
      </button>
    </div>
  </div>
</template>
<script>
import Promise from 'Promise'
import { mapActions } from 'vuex'
import checkService from '@/services/CheckService'
import personalService from '@/services/PersonalService'
export default {
  name: 'account-detail',
  data() {
    return {
      personalData: {},
      storeInfo: {},
      engineerInfo: {
        user: {
          url: '',
          name: ''
        },
        acc_books: {},
        level1: 0
      },
      personalInfo: {
        email: '',
        name: '',
        contactNum: '',
        contactName: '',
        bussinessNum: '',
        address: '',
        url: ''
      },
      loading: true
    }
  },
  computed: {
    avatarImg() {
      return this.personalInfo.url === '' ? require('../../assets/avatar-default.png') : this.personalInfo.url
    }
  },
  methods: {
    ...mapActions(['loginOut', 'testAction']),
    myLogout() {
      this.$dispatch('loginOut').then(
        () => {
          this.$router.push('/')
        },
        msg => {
          this.$toast.show({ type: 'error', message: msg.error_message })
        }
      )
    },
    getUserMessage() {
      this.loading = true
      Promise.when([checkService.checkInfo(), personalService.getUserMessage()]).then(
        (engineer, person) => {
          engineer = engineer.data
          this.engineerInfo = engineer
          this.engineerInfo.level1 = engineer.vip
          this.engineerInfo.user.url = this.defaultAvatar
          if (engineer.user.ext) {
            this.engineerInfo.user.url = engineer.user.ext
          }
          person = person.data
          this.personalData = person.user_d_o
          this.storeInfo = person.shop_d_o
          this.personalInfo.email = this.personalData.email
          this.personalInfo.name = this.storeInfo.contact
          this.personalInfo.account = this.personalData.account
          this.personalInfo.contactNum = person.partner_d_o.contact_mobile
          this.personalInfo.contactName = this.storeInfo.shop_name
          this.personalInfo.bussinessNum = person.partner_d_o.contact_phone
          this.personalInfo.address = this.storeInfo.address
          this.personalInfo.url = this.personalData.ext
          this.loading = false
        },
        msg => {
          this.loading = false
          this.$toast.show({ type: 'error', message: msg.error_message })
        }
      )
    }
  },
  mounted() {
    this.getUserMessage()
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
.avatar {
  height: 120px;
  line-height: 100px;
  width: 100%;
  background-color: #fff;
  padding: 10px 20px;
  .avatar-img {
    display: inline-block;
    border-radius: 39px;
    vertical-align: middle;
    width: 78px;
    height: 78px;
    margin-right: 24px;
    background-size: contain;
  }
}
.logout-btn {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 30px 20px;
}
.item-blk {
  color: black !important;
}
.cell-item {
  border-bottom: 1px solid $line-color;
  &:last-of-type {
    border: 0;
  }
  .iconfont {
    color: $line-color;
  }
}
</style>
