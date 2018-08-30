import Vue from 'vue';
import Vuex from 'vuex';
import {dataState, userState} from './states';
import {dataMutations, userMutations} from './mutations';
import {getDataAction, getUserActions} from './actions';
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


export default new Vuex.Store({
  modules: {
    data: moduleData,
    user: moduleUser
  }
})
