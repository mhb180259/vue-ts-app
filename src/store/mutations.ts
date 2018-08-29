import * as types from './types';

const mutations = {
  [types.CHECKOUT_SUCCESS](state: any, {data = {}, type = ""}) {
    state[type] = data;
    state.loading = false;
  },
  [types.CHECKOUT_REQUEST](state: any) {
    state.loading = true;
  },
  [types.CHECKOUT_FAILURE](state: any) {
    state.loading = false;
  },
};

export default mutations