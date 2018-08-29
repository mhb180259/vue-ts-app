import {Url} from "@/config";
import * as types from './types';

export const getDataAction = (context: any, {type = "", params = {}}) => {
  context.commit(types.CHECKOUT_REQUEST);
  const Server: any = Url;
  Server[type](params)
    .then((res: any) => {
      context.commit(types.CHECKOUT_SUCCESS, {data: res.data, type})
    })
    .catch((err: object) => {
      context.commit(types.CHECKOUT_FAILURE);
    })
};