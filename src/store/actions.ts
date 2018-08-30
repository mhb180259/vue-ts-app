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

export {
  getDataAction,
  getUserActions
}