<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {namespace} from 'vuex-class';
const Module = namespace("cache");

@Component
export default class App extends Vue {
  @Module.Action getCategoryList: any;
  private async created() {
    this.getCategoryList({});
  }
}
</script>

