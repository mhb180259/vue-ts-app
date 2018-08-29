<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
    {{listData && listData.data.aggregate_cate_prop_list[0].name}} <br/>
    <div v-if="loading">loading</div>
    <button @click="handleAction">点击</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';

@Component
export default class Home extends Vue {
  public $alert: any;
  @State('getHomeBars') private listData: any;
  @State('loading') private loading: any;
  @Action('getDataAction') private getListAction: any;

  private handleAction(): void {
    // this.$alert.show({ message: 'SUCCESS2', type: 'error' });
    this.getListAction({type: "getHomeBars"});
  }
}
</script>
