import {dataUrl, getUrl} from "@/config";
import * as types from './types';

const getDataAction = {
  getData(context: any, {type = "", params = {}}) {
    context.commit(types.CHECKOUT_REQUEST);
    const Server: any = dataUrl;
    return Server[type](params)
      .then((res: any) => {
        context.commit(types.CHECKOUT_SUCCESS, {data: res, type})
      })
      .catch((err: object) => {
        context.commit(types.CHECKOUT_FAILURE);
      })
  }
};

const getUserActions = {
  userLogin(context: any, {type = "userLogin", params = {}}) {
    context.commit(types.CHECKOUT_REQUEST);
    const Server: any = getUrl;
    return Server[type](params)
      .then((res: any) => {
        context.commit(types.SET_USER_INFO, {data: res, type})
      })
      .catch((err: object) => {
        context.commit(types.CHECKOUT_FAILURE);
      })
  }
};

const getCacheActions = {
  searchItem(context: any, {type = "", params = {}}) {
    context.commit(types.CHECKOUT_REQUEST);
    const Server: any = getUrl;
    return Server["searchItem"](params)
      .then((res: any) => {
        context.commit(types.SEARCH_ITEM_PRODUCT, {data: res, type})
        return Promise.resolve(res);
      })
      .catch((err: object) => {
        context.commit(types.CHECKOUT_FAILURE);
      })
  },
  putCateId(context: any, {type = "", params = {}}) {
    if (!(<any>params).id) return;
    context.commit(types.CATEGORY_ID, {data: params})
  },
  categoryList(context: any, {type = "categoryList", params = {}}) {
    context.commit(types.CHECKOUT_REQUEST);
    const Server: any = getUrl;
    return Server[type](params)
      .then((res: any) => {
        context.commit(types.GET_CATEGORY_LIST, {data: res, type})
      })
      .catch((err: object) => {
        context.commit(types.CHECKOUT_FAILURE);
      })
  },
  clearAllItem(context: any, {type = "", params = {}}) {
    context.commit(types.CLEAR_ALL_ITEM, {})
  },
};

export {
  getDataAction,
  getUserActions,
  getCacheActions
}