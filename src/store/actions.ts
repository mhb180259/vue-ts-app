import {dataUrl, getUrl} from "@/config";
import {request} from "@/utils";
import * as types from './types';



const getDataAction = {
  getData(context: any, {type = "", params = {}}) {
    return request(context, dataUrl, types.CHECKOUT_SUCCESS, type, params);
  }
};

const getUserActions = {
  userLogin(context: any, {type = "userLogin", params = {}}) {
    return request(context, getUrl, types.SET_USER_INFO, type, params);
  }
};

const getCacheActions = {
  searchItem(context: any, {type = "", params = {}}) {
    return request(context, getUrl, types.SEARCH_ITEM_PRODUCT, "searchItem", params);
  },
  getCategoryList(context: any, {type = "categoryList", params = {}}) {
    return request(context, getUrl, types.GET_CATEGORY_LIST, type, params);
  },
  putCateId(context: any, {type = "", params = {}}) {
    if (!(<any>params).id) return;
    context.commit(types.CATEGORY_ID, {data: params})
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