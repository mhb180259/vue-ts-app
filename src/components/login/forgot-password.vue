<template>
  <div class="content fix-keyboard">
    <head-bar :customBack="toBack">Retrieve the Password</head-bar>
    <div class="main">
      <input-group placeholder="Please enter email" v-model="resetForm.email">Email</input-group>
      <div class="input-group">
        <div class="input-label">Verification code</div>
        <div class="input-field">
          <input type="text" placeholder="Please enter verification Code" v-model="resetForm.code">
          <div class="code-btn">
            <button v-if="sendStatus===1" @click="getCode" class="btn">Send</button>
            <button v-else-if = "sendStatus===2" class="btn">{{countdown + 's'}}</button>
            <button v-else class="btn" @click="getCode">Send again</button>
          </div>
        </div>
      </div>
      <input-group placeholder="Please enter password" type="password" v-model="resetForm.pass">New password</input-group>
      <input-group placeholder="Please enter password again" type="password" v-model="resetForm.checkPass">Confirm password</input-group>
      <div class="login-btn">
        <button class="btn" @click="submitFrom">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import accountService from '@/services/AccountService.js'
import validatorConfig from '@/config/ValidatorConfig.js'
// sendStatus 1 未发送 2 正在发送 3再次发送

function validmail(val) {
  if (!val) return
  let bool = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(val)
  return bool
}

export default {
  name: 'forgotPassword',
  data() {
    return {
      sendStatus: 1,
      countdown: 60,
      checkedMail: '',
      resetForm: {
        email: '',
        code: '',
        pass: '',
        checkPass: ''
      }
    }
  },
  computed: {},
  methods: {
    login() {
      this.$dispatch('userLogin', this.account).then(
        v => {
          let redirect = this.$route.query.redirect
          redirect = redirect ? JSON.parse(redirect) : { path: '/' }
          if (this.$route.path !== redirect.path) {
            this.$router.replace(redirect)
          }
        },
        msg => {
          this.$toast.show({ type: 'error', message: msg.error_message })
        }
      )
    },
    toBack() {
      this.$router.go(-1)
    },
    submitFrom() {
      if (this.sendStatus === 1) {
        return
      }
      if (!this.checkedMail || this.checkedMail !== this.resetForm.email) {
        return
      }
      if (!this.resetForm.pass) {
        return
      }
      if (this.resetForm.pass !== this.resetForm.checkPass) {
        this.$toast.show({ type: 'error', message: 'Two passwords do not match!' })
        return
      }

      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
      if (!reg.test(this.resetForm.pass)) {
        this.$toast.show({ type: 'error', message: 'The password must contain uppercase characters,lowercase characters and numbers!' })
        return
      }
      accountService.resetPass(this.resetForm).then(
        data => {
          this.$router.replace({ name: 'login' })
        },
        msg => {
          this.$toast.show({ type: 'error', message: msg.error_message })
        }
      )
    },
    getCode() {
      if (!validmail(this.resetForm.email)) {
        this.$toast.show({ type: 'error', message: 'mail invalid' })
        return
      }
      let oldStatus = this.sendStatus * 1
      this.sendStatus = 2
      accountService.getResetCode(this.resetForm.email).then(
        data => {
          this.checkedMail = this.resetForm.email + ''
          this.countDown()
        },
        msg => {
          console.log('dddd')
          this.sendStatus = oldStatus
          this.$toast.show({ type: 'error', message: msg.error_message })
        }
      )
    },
    countDown() {
      let self = this
      self.countdown = 60
      let clock = setInterval(() => {
        if (self.countdown > 1) {
          self.countdown--
        } else {
          clearInterval(clock)
          self.sendStatus = 3
        }
      }, 1000)
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.code-btn {
  float: right;
  display: inline-block;
  .btn {
    display: inline-block;
    width: 160px;
  }
}
.input-group {
  padding: 0 20px;
  .input-label {
    font-size: 32px;
    padding-left: 36px;
  }
  .input-field {
    padding: 12px 0;
    position: relative;
    input {
      width: 492px;
      height: 80px;
      border: 1px solid #ccc;
      border-radius: 40px;
      padding: 36px;
      outline: none;
    }
    input:focus {
      outline: none;
    }
    input::-webkit-input-placeholder {
      color: #ccc;
    }
    // button {
    //   font-size: 32px;
    //   width: 20%;
    //   height: 80px;
    //   border: 1px solid #ccc;
    //   border-radius: 40px;
    //   padding: 36px;
    //   outline: none;
    //   background: #3b98ff;
    //   display: table-cell;
    //   vertical-align: middle;
    // }
  }
}

.content {
  background-color: #fff;
}
.logo {
  margin-top: 88px;
  height: 410px;
  width: 750px;
  line-height: 410px;
  text-align: center;
  .logo-icon {
    display: inline-block;
    vertical-align: middle;
    line-height: 90px;
    height: 90px;
    width: 250px;
  }
}
.login-btn {
  margin: 48px 20px;
}
.others {
  margin: 48px 56px 0 56px;
  font-size: 28px;
  .pull-left {
    color: #ccc;
  }
  .pull-right {
    font-weight: bold;
  }
}
</style>
