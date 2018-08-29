<template>
  <picker :select-data="pickData" :show="show" @confirm="confirm" @cancel="close"></picker>
</template>
<script>
// import picker from './picker'
export default {
  name: 'date',
  components: { picker: require('./picker.vue').default },
  props: {
    show: Boolean,
    callback: {
      type: Function
    },
    closeFn: {
      type: Function
    }
  },
  data() {
    return {
      pickData: {
        columns: 2,
        default: [{ text: '2018', value: '2018' }, { text: '1', value: '1' }],
        pData1: [
          { text: '2018', value: '2018' },
          { text: '2019', value: '2019' },
          { text: '2020', value: '2020' },
          { text: '2021', value: '2021' },
          { text: '2022', value: '2022' },
          { text: '2023', value: '2023' },
          { text: '2024', value: '2024' },
          { text: '2025', value: '2025' },
          { text: '2026', value: '2026' },
          { text: '2027', value: '2027' },
          { text: '2028', value: '2028' }
        ],
        pData2: [
          { text: '1', value: '1' },
          { text: '2', value: '2' },
          { text: '3', value: '3' },
          { text: '4', value: '4' },
          { text: '5', value: '5' },
          { text: '6', value: '6' },
          { text: '7', value: '7' },
          { text: '8', value: '8' },
          { text: '9', value: '9' },
          { text: '10', value: '10' },
          { text: '11', value: '11' },
          { text: '12', value: '12' }
        ]
      }
    }
  },
  methods: {
    close() {
      this.closeFn()
    },
    confirm(selects) {
      this.callback(selects.select1.value + '-' + selects.select2.value)
    }
  }
}
</script>
<style lang="css" scoped>

</style>
