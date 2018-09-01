import axios from "axios";

// axios配置，做请求与响应拦截
axios.defaults.baseURL = "/gateway/";

axios.interceptors.request.use(
  (config: any) => {
    if (/static/.test(config.url)) {
      config.baseURL = "";
    }
    return config;
  },
  error => {}
);

axios.interceptors.response.use(
  response => {
    let res;
    if (response.data === undefined) {
      res = response.request.responseText;
    } else {
      res = response.data;
    }
    return res
    // 根据返回的code值来做不同的处理（和后端约定）
    // if (res.code === "000000") {
    //   return res.data;
    // } else if (res.code === "000001") {
    //   // 用户未登录处理
    // } else {
    //
    // }
  },
  err => {
    // 接口报错，404
  }
);

export default axios;
