<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import NavBar from '@/components/nav-bar.vue';

@Component
export default class HomeView extends Vue {}
</script>
