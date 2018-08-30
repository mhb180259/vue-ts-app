import * as types from './types';
import cache from "store2";

// 共同的mutations，判断loading状态
const commonMutations = {
  [types.CHECKOUT_REQUEST](state: any) {
    state.loading = true;
  },
  [types.CHECKOUT_FAILURE](state: any) {
    state.loading = false;
  },
};

const dataMutations = {
  ...commonMutations,
  [types.CHECKOUT_SUCCESS](state: any, {data = {}, type = ""}) {
    state[type] = data;
    state.loading = false;
  },
};


const userMutations = {
  ...commonMutations,
  [types.SET_USER_INFO](state: any, {data = {}, type = ""}) {
    state.loading = false;
    if ((<any>data).success) {
      cache("user", (<any>data).data);
    } else {
      data = cache("user");
    }
    state.auth = true;
    state.email = (<any>data).email;
    state.account = (<any>data).account;
    state.status = (<any>data).status;
  },
};

export {
  dataMutations,
  userMutations
}