<template>
  <picker :show="true" :select-data="pickData1"></picker>
</template>
<script>
export default {
  name: 'date-picker',
  data() {
    return {
      pickData1: {
        columns: 1, // picker的列数
        default: [
          // 默认显示哪一个字段
          {
            text: 2002,
            value: 2002
          }
        ],
        // 第一列的数据结构
        pData1: [
          {
            text: 1999,
            value: 1999
          },
          {
            text: 2001,
            value: 2001
          },
          {
            text: 2002,
            value: 2002
          },
          {
            text: 2003,
            value: 2003
          },
          {
            text: 2004,
            value: 2004
          },
          {
            text: 2005,
            value: 2005
          }
        ]
      }
    }
  }
}
</script>
<style lang="css" scoped>

</style>
