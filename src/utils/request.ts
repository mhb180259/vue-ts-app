/**
 * API参数介绍:
 * context: store上下文
 * Server: 接口URL配置对象，其中每一个action携带的type与对象中的键相匹配
 * mutation: 需要commit的mutation名
 * type: actions携带的type，方便传给mutation判断
 * params: 请求接口携带的参数
 * */


import * as types from "@/store/types";

const request = (context: any, Server: any, mutation: any, type: any, params: any) => {
  context.commit(types.CHECKOUT_REQUEST);
  return Server[type](params).then((res: any) => {
    context.commit(types.HIDE_LOADING, {data: res, type}); // 隐藏loading
    context.commit(mutation, {data: res, type}); // 发送数据
    return Promise.resolve(res); // 将数据返回到组件内部以便使用
  })
};

export default request;