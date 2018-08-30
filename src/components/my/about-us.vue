<template>
  <div class="content">
    <head-bar>About Us</head-bar>
    <div class="main">
      <div class="icon">
        <img src="../../assets/icon.png" alt="">
        <div>Version: 1.0.5</div>
      </div>
    </div>
    <div class="footer">
      Copyright © 2018 LT Security Inc., All Rights Reserved
    </div>
  </div>
</template>
<script>
export default {
  name: 'about-us',
  data() {
    return {}
  }
}
</script>
<style lang="css" scoped>
.content {
  color: #585858;
}
.main {
  text-align: center;
}
.icon {
  display: inline-block;
  margin-top: 246px;
}
.footer {
  font-size: 20px;
  text-align: center;
  line-height: 80px;
}
</style>
