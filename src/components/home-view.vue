<template>
  <div class="content">
    <router-view></router-view>
    <nav-bar></nav-bar>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    NavBar: () => import("~com/nav-bar.vue")
  }
})
export default class HomeView extends Vue {}
</script>
