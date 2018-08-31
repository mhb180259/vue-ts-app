import Vue from 'vue';
import Vuex from 'vuex';
import {dataState, userState, cacheState} from './states';
import {dataMutations, userMutations, cacheMutations} from './mutations';
import {getDataAction, getUserActions, getCacheActions} from './actions';
import {dataGetters, userGetters} from './getters';

Vue.use(Vuex);

const moduleData = {
  namespaced: true,
  state: dataState,
  mutations: dataMutations,
  actions: getDataAction,
  getters: dataGetters
};

const moduleUser = {
  namespaced: true,
  state: userState,
  mutations: userMutations,
  actions: getUserActions,
  getters: userGetters
};

const moduleCache = {
  namespaced: true,
  state: cacheState,
  mutations: cacheMutations,
  actions: getCacheActions
};


export default new Vuex.Store({
  modules: {
    data: moduleData,
    user: moduleUser,
    cache: moduleCache
  }
})
