<template>
  <div class="content-login fix-keyboard">
    <head-bar :customBack="toBack">Sign in</head-bar>
    <div class="main" v-loading.submit="loading">
      <div class="logo">
        <img class="logo-icon" src="../../assets/logo.jpg" alt="">
      </div>
      <input-group ref="vaccount" :required="true" placeholder="Please enter email" v-model="account.login_user">
        Account
      </input-group>
      <input-group ref="vpassword" :required="true" placeholder="Please enter password" type="password"
                   v-model="account.password">Password
      </input-group>
      <div class="login-btn">
        <button class="btn" @click="login">
          Sign in
        </button>
      </div>
      <div class="others">
        <router-link to="forgotPassword" class="pull-left">
          Forgot password
        </router-link>
        <router-link to="register" class="pull-right">
          Sign up
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import md5 from 'md5';
const Module = namespace("user");

@Component({
  components: {
    HeadBar: () => import("~com/head-bar.vue"),
    InputGroup: () => import("~com/input-group.vue")
  }
})
export default class Login extends Vue {

  @Module.Action userLogin: any;
  @Module.State loading: any;
  private account = {
    login_user: '',
    password: ''
  };

  private checkValid() {
    let flag = true;
    if (!(<any>this.$refs.vaccount).check()) {
      flag = false
    }
    if (!(<any>this.$refs.vaccount).check()) {
      flag = false
    }
    return flag
  }

  private toBack() {
    this.$router.push({name: 'home'})
  }

  private async login() {
    if (!this.checkValid()) {
      return
    }
    (<any>window).is_debug_msg = false;
    if (
      this.account.login_user === 'taohua@huntlee.cn' ||
      this.account.login_user === 'qinxiaozhuan@gmail.com' ||
      this.account.login_user === 'liuyufeng@huntlee.cn'
    ) {
      (<any>window).is_debug_msg = true
    }
    const params = {
      account: this.account.login_user,
      password: md5(this.account.password),
      source: 'PC',
      oms_password: null
    };
    await this.userLogin({params: params});
    // let redirect = (<any>this.$route.query).redirect;
    // redirect = redirect ? JSON.parse(redirect) : {path: '/'};
    // if (this.$route.path !== redirect.path) {
    //   this.$router.replace(redirect)
    // }
  }

  private mounted() {
    if (process.env.NODE_ENV === 'production') {
      // 以下为正式代码
      let oldAccount = (<any>Object)._clone({});
      this.account.login_user = oldAccount.login_user
      this.account.password = oldAccount.password
    } else {
      // 以下为测试使用
      this.account.login_user = 'liuyufeng@huntlee.cn';
      this.account.password = 'Manniu123'
    }
  }
}
</script>
<style lang="less" scoped>
.content-login {
  background-color: #fff;
}

.logo {
  // margin-top: 88px;
  width: 750px;
  line-height: 310px;
  text-align: center;
  .logo-icon {
    display: inline-block;
    vertical-align: middle;
    height: 108px;
    width: 300px;
  }
}

.login-btn {
  margin: 48px 20px 24px;
}

.others {
  margin: 24px 56px 0 56px;
  font-size: 28px;
  .pull-left {
    color: #585858;
  }
  .pull-right {
    color: #ff3b41;
    font-weight: bold;
  }
}
</style>
