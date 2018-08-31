<template>
  <div class="no-ready content">
    <head-bar>Note</head-bar>
    <div class="main">
      <div class="iconfont icon-tishi"></div>
      <p class="text">This promotion is only valid on LTS Mall PC platform. Start saving on your computers!</p>
      <div class="button"><button @click="back">Home Page</button></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'no-ready',
    methods: {
      back () {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="scss">
  .no-ready .main{
    padding: 195px 24px;
    .iconfont,.text{
      text-align: center;
    }
    .iconfont{
      font-size: 100px;
      color:#FAB43B;
    }
    p{
      font-size: 28px;
      margin-top: 36px;
      line-height: 1.5;
      color:#585858;
    }
    .button{
      text-align: center;
      button{
        margin: 146px auto;
        font-size: 28px;
        font-weight: bold;
        width:220px;
        height:80px;
        border-radius: 40px;
        color:#fff;
        background: #FF3B41;
        line-height: 42px;
      }
    }
  }
</style>
