import Vue from 'vue';
import Vuex from 'vuex';
import state from './states';
import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  mutations,
  getters,
  state
})
