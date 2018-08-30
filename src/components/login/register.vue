<template>
  <div class="content">
    <head-bar>Sign Up</head-bar>
    <div class="main">
      <div class="register-form">
        <input-group ref="vemail" v-model="signupForm.email" placeholder="Please enter email address" :required="true" rule="email" @onBlur="onBlur">E-mail</input-group>
        <input-group ref="vfisrtName" v-model="signupForm.fisrtName" placeholder="Please enter first name" :required="true">Frist Name</input-group>
        <input-group ref="vlastName" v-model="signupForm.lastName" placeholder="Please enter last name" :required="true">Last Name</input-group>
        <input-group ref="vcompanyName" v-model="signupForm.companyName" placeholder="Please enter company name" :required="true">Company Name</input-group>
        <input-group ref="vphone" v-model="signupForm.phone" placeholder="Please enter bussiness phone" :required="true" type="number" rule="mobile">Bussiness Phone</input-group>
        <input-group ref="vmobile" v-model="signupForm.mobile" placeholder="Please enter mobile phone" type="number" rule="mobile">Mobile Phone</input-group>
        <input-group ref="vaddress" v-model="signupForm.address" placeholder="Please enter zip code" :required="true" rule="zipCode" type="number">Zip Code</input-group>
        <input-group ref="vBusiness" v-model="signupForm.Business" placeholder="Select" type="select" :pick-data="pickData" :required="true">Type of business</input-group>
        <input-group ref="vdetail" placeholder="Please enter address" type="textarea" v-model="signupForm.detail" :required="true">Shipping Address</input-group>
        <input-group ref="vcity" placeholder="Please enter city" v-model="signupForm.city" :required="true">City</input-group>
        <input-group ref="vstate" placeholder="Please enter state" :value="signupForm.state" @change="changeState" type="select" :pick-data="stateData" :required="true">State</input-group>
        <input-group v-model="signupForm.url" placeholder="Select" type="picture" :require="true">Reseller Certificate</input-group>
        <div class="register-btn">
          <button class="btn" @click = "creatAccount">
            Create An Account
          </button>
        </div>
        <div class="register-footer">
          Sign-up now for exclusive discounts and news
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import accountService from '@/services/AccountService.js'
import userSerivce from '@/services/UserService'
export default {
  name: 'register',
  data() {
    return {
      stateData: {
        column: 1,
        default: [{ value: '100101', text: 'Alabama' }],
        pData1: [
          { value: '100101', text: 'Alabama' },
          { value: '110101', text: 'Alaska' },
          { value: '120101', text: 'Arizona' },
          { value: '130101', text: 'Arkansas' },
          { value: '140101', text: 'California' },
          { value: '150101', text: 'Colorado' },
          { value: '160101', text: 'Connecticut' },
          { value: '170101', text: 'Delaware' },
          { value: '180101', text: 'Florida' },
          { value: '190101', text: 'Georgia' },
          { value: '200101', text: 'Hawaii' },
          { value: '210101', text: 'Idaho' },
          { value: '220101', text: 'Illinois' },
          { value: '230101', text: 'Indiana' },
          { value: '240101', text: 'Iowa' },
          { value: '250101', text: 'Kansas' },
          { value: '260101', text: 'Kentucky' },
          { value: '270101', text: 'Louisiana' },
          { value: '280101', text: 'Maine' },
          { value: '290101', text: 'Maryland' },
          { value: '300101', text: 'Massachusetts' },
          { value: '310101', text: 'Michigan' },
          { value: '320101', text: 'Minnesota' },
          { value: '330101', text: 'Mississippi' },
          { value: '340101', text: 'Missouri' },
          { value: '350101', text: 'Montana' },
          { value: '360101', text: 'Nebraska' },
          { value: '370101', text: 'Nevada' },
          { value: '380101', text: 'New Hampshire' },
          { value: '390101', text: 'New Jersey' },
          { value: '400101', text: 'New Mexico' },
          { value: '410101', text: 'New York' },
          { value: '420101', text: 'North Carolina' },
          { value: '430101', text: 'North Dakota' },
          { value: '440101', text: 'Ohio' },
          { value: '450101', text: 'Oklahoma' },
          { value: '460101', text: 'Oregon' },
          { value: '470101', text: 'Pennsylvania' },
          { value: '480101', text: 'Rhode Island' },
          { value: '490101', text: 'South Carolina' },
          { value: '500101', text: 'South Dakota' },
          { value: '510101', text: 'Tennessee' },
          { value: '520101', text: 'Texas' },
          { value: '530101', text: 'Utah' },
          { value: '540101', text: 'Vermont' },
          { value: '550101', text: 'Virginia' },
          { value: '560101', text: 'Washington' },
          { value: '570101', text: 'West Virginia' },
          { value: '580101', text: 'Wisconsin' },
          { value: '590101', text: 'Wyoming' },
          { value: '600101', text: 'Washington DC' }
        ]
      },
      pickData: {
        column: 1,
        default: [{ text: 'Installer', value: 'Installer' }],
        pData1: [
          { text: 'Installer', value: 'Installer' },
          { text: 'Wholesale', value: 'Wholesale' },
          { text: 'Distributor', value: 'Distributor' },
          { text: 'Integrator', value: 'Integrator' },
          { text: 'Retailer', value: 'Retailer' },
          { text: 'Online Store', value: 'Online Store' },
          { text: 'Others', value: 'Others' }
        ]
      },
      signupForm: {
        pic: '',
        companyName: '',
        fisrtName: '',
        lastName: '',
        email: '',
        phone: '',
        mobile: '',
        address: '',
        FTI: '',
        Business: '',
        url: '',
        detail: '',
        city: '',
        state: '',
        lc_code: ''
      }
    }
  },
  methods: {
    changeState(item) {
      this.signupForm.lc_code = item.value
      this.signupForm.state = item.text
    },
    onBlur(v) {
      if (!v) return
      userSerivce.checkEmail(v).then(
        resp => {
          if (!resp.success) {
            this.$toast.show({ type: 'message', message: 'Existing E-mail' })
          }
        },
        () => {
          this.$toast.show({ type: 'message', message: 'Existing E-mail' })
        }
      )
    },
    checkValid() {
      let flag = true
      if (!this.$refs.vemail.check()) {
        flag = false
      }
      if (!this.$refs.vfisrtName.check()) {
        flag = false
      }
      if (!this.$refs.vlastName.check()) {
        flag = false
      }
      if (!this.$refs.vcompanyName.check()) {
        flag = false
      }
      if (!this.$refs.vphone.check()) {
        flag = false
      }
      if (!this.$refs.vmobile.check()) {
        flag = false
      }
      if (!this.$refs.vaddress.check()) {
        flag = false
      }
      if (!this.$refs.vBusiness.check()) {
        flag = false
      }
      if (!this.$refs.vdetail.check()) {
        flag = false
      }
      if (!this.$refs.vcity.check()) {
        flag = false
      }
      if (!this.$refs.vstate.check()) {
        flag = false
      }
      if (!this.signupForm.url) {
        this.$toast.show({ type: 'error', message: 'Please upload Reseller Certificate!' });
        flag = false
      }
      return flag
    },
    creatAccount() {
      if (!this.checkValid()) {
        return
      }
      let params = {
        businessPhone: '1-' + this.signupForm.phone,
        zipCode: this.signupForm.address,
        // taxId: this.signupForm.FTI,
        typeOfBusiness: this.signupForm.Business,
        city: this.signupForm.city,
        lc_code: [this.signupForm.lc_code],
        urls: this.signupForm.url ? [this.signupForm.url] : []
      }
      let obj = {
        email: this.signupForm.email,
        contractName: this.signupForm.fisrtName + '-' + this.signupForm.lastName,
        companyName: this.signupForm.companyName,
        type: 3,
        from: 'PC_WEB',
        address: this.signupForm.detail,
        ext: params
      }
      if (this.signupForm.mobile) {
        obj.mobile = '1-' + this.signupForm.mobile
      }
      accountService.creatAccount(obj).then(
        data => {
          this.showAlert()
          // this.$router.push('/login')
        },
        msg => {
          this.$toast.show({ type: 'error', message: msg.error_message })
        }
      )
    },
    showAlert() {
      const self = this
      this.$alert.show({
        message: 'Your initial password will be sent via email upon account approval.',
        confirm: function() {
          self.$alert.hide()
          self.$router.push({ name: 'home' })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
.content {
  background-color: #fff;
}
.register-form {
  margin-top: 24px;
}

.register-btn {
  margin: 40px 20px 0 20px;
}
.register-footer {
  padding: 20px;
  text-align: center;
  font-size: 24px;
  color: $sub-color;
}
</style>
