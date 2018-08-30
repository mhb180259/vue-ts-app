<template>
  <div class="input-group">
    <div class="input-label"><span class="required" v-if="required">*</span>
      <slot></slot>
    </div>
    <div class="input-field" :class="{'errorInfo': error}">
      <textarea v-if="type === 'textarea'" cols="3" rows="10" :placeholder="placeholder" :value="value"
                @input="handleInput($event.target.value)" @focus="onFocus" @blur="onBlur"
                :class="{'error': error}"></textarea>
      <template v-if="type === 'select'">
        <input readonly :type="type" :placeholder="placeholder" :value="value" @input="handleInput($event.target.value)"
               @click="showPicker" :class="{'error': error}">
        <span class="select-icon iconfont icon-paixujiantouxia"></span>
      </template>
      <template v-if="type === 'date'">
        <input readonly type="text" :placeholder="placeholder" :value="value"
               @input="onBlur($event);handleInput($event.target.value)" @click="showDate" :class="{'error': error}">
        <span class="select-icon iconfont icon-paixujiantouxia"></span>
      </template>
      <div class="picture" v-if="type === 'picture'" @click="addImage">
        <img v-if="value !== ''" :src="value" alt="">
        <span v-else class="iconfont icon-xiangji"></span>
      </div>
      <input v-if="type === 'text' || type === 'password' || type === 'number'" :type="type" :placeholder="placeholder"
             :value="value" @input="handleInput($event.target.value)" @focus="onFocus" @blur="onBlur"
             :class="{'error': error}">
    </div>
  </div>
</template>
<script lang="es6">
// import uploadPic from "@/plugs/uploadPic";

export default {
  name: "input-group",
  props: {
    pickData: Object,
    required: { type: Boolean, default: false },
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: "text"
    },
    rule: String,
    value: String
  },
  data() {
    return {
      error: false,
      isFixNeedFocus: 0
    };
  },
  methods: {
    check(value) {
      value = value || this.value;
      if (!this.required && (value === null || value === "")) return true;
      let flag = true;
      if (this.required && (value === null || value === "")) flag = false;
      if (flag) {
        flag = this.rule ? this.$checkType.check(this.rule, value) : true;
      }
      if (!flag) {
        this.error = true;
      } else {
        this.error = false;
      }
      return flag;
    },
    onBlur(event) {
      if (!this.check(event.target.value)) {
        // this.error = true
      } else {
        this.$emit("onBlur", event.target.value);
      }
    },
    onFocus(event) {
      let target = event.target;
      if (!target) return;
      this.error = false;
      setTimeout(() => {
        if (target.scrollIntoViewIfNeeded) {
          target.scrollIntoViewIfNeeded(false);
        } else {
          target.scrollIntoView(false);
        }
        target.value = target.value;
      }, 250);
    },
    // onBlur() {
    //   this.isFixNeedFocus = 0
    // },
    // getCursortPosition(ctrl) {
    //   // IE Support
    //   var CaretPos = 0
    //   if (document.selection) {
    //     ctrl.focus()
    //     var Sel = document.selection.createRange()
    //     Sel.moveStart('character', -ctrl.value.length)
    //     CaretPos = Sel.text.length
    //   } else if (ctrl.selectionStart || ctrl.selectionStart === '0') {
    //     CaretPos = ctrl.selectionStart
    //   }
    //   return CaretPos
    // },
    // setCaretPosition(ctrl, pos) {
    //   try {
    //     if (ctrl.setSelectionRange) {
    //       ctrl.focus()
    //       ctrl.setSelectionRange(pos, pos)
    //     } else if (ctrl.createTextRange) {
    //       var range = ctrl.createTextRange()
    //       range.collapse(true)
    //       range.moveEnd('character', pos)
    //       range.moveStart('character', pos)
    //       range.select()
    //     }
    //   } catch (e) {}
    // },
    // fixtouchstartFocus(event) {
    //   let self = this
    //   var u = window.navigator.userAgent || ''
    //   u = u.toLowerCase()
    //   var platType = {
    //     android: u.indexOf('android') > -1,
    //     ios: u.indexOf('iphone') > -1 || u.indexOf('ipad') > -1
    //   }
    //   // 第一次进来才需要调整
    //   if (this.isFixNeedFocus === 0) {
    //     setTimeout(() => {
    //       let target = event.target
    //       target.scrollIntoView(false)
    //       if (target.scrollIntoViewIfNeeded) {
    //         target.scrollIntoViewIfNeeded(false)
    //       }
    //       if (platType.ios) {
    //         self.setCaretPosition(target, target.value.length)
    //       }
    //     }, 200)
    //   }
    //   this.isFixNeedFocus = this.isFixNeedFocus + 1
    // },
    addImage() {
      // uploadPic(url => {
      //   this.$emit("input", url);
      // });
    },
    handleInput(val) {
      this.$emit("input", val);
    },
    showPicker() {
      const self = this;
      this.$picker.show({
        selectData: this.pickData,
        callback: function(data) {
          this.show = false;
          if (data.select1) {
            self.$emit("input", data.select1.value);
            self.$emit("change", data.select1);
          }
        }
      });
    },
    showDate() {
      const self = this;
      this.$date.show({
        callback: function(data) {
          this.show = false;
          self.check(data);
          self.$emit("input", data);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../style/variables.less';

.required {
  color: @primary-color;
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
    .picture {
      width: 100%;
      height: 300px;
      border: 1px solid #ccc;
      border-radius: 40px;
      .iconfont {
        color: #585858;
        display: inline-block;
        position: absolute;
        top: 120px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 60px;
      }
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    input {
      width: 100%;
      height: 80px;
      border: 1px solid #ccc;
      border-radius: 40px;
      padding: 36px;
      outline: none;
    }
    input.error,
    textarea.error {
      border: 1px solid @primary-color;
    }
    .select-icon {
      position: absolute;
      top: 18px;
      right: 30px;
      color: #585858;
    }
    textarea {
      height: 200px;
      width: 100%;
      padding: 24px 34px;
      border: 1px solid #ccc;
      border-radius: 30px;
      font-size: 28px;
      outline: none;
    }
    textarea::-webkit-input-placeholder {
      color: #ccc;
    }
    textarea:focus,
    input:focus {
      // outline: red;
      // box-shadow: #eee 10px 10px 15px;
      border: 1px solid #616161;
      // border: 1px solid red;
    }
    input::-webkit-input-placeholder {
      color: #ccc;
    }
  }
}
</style>
