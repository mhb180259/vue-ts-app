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

const cacheMutations = {
  ...commonMutations,
  [types.SEARCH_ITEM_PRODUCT](state: any, {data = {}, type = ""}) {
    if (type === "initItem") {
      state.itemProduct = (<any>data).data.item_d_o_list;
    } else {
      state.itemProduct = state.itemProduct.concat((<any>data).data.item_d_o_list);
    }
  },
  [types.CATEGORY_ID](state: any, {data = {}, type = ""}) {
    state.searchCateId = (<any>data).id;
  },
  [types.GET_CATEGORY_LIST](state: any, {data = {}, type = ""}) {
    state.categoryList = (<any>data).datalist;
  },
  [types.CLEAR_ALL_ITEM](state: any, {data = {}, type = ""}) {
    state.itemProduct = [];
  },
};

export {
  dataMutations,
  userMutations,
  cacheMutations
}