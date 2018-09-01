import {axios} from "@/utils";


// 此文件中的接口数据都是存储在vuex的state中起到缓冲作用以提高响应速度
export default {
  getHomeBars(params: object): any {
    return axios.get("/static/appconfig.json");
  },
  getHomeProducts(params: object): any {
    return axios.get("indexarea/get_index");
  },
  getUserDetails(params: object): any {
    return axios.get("installer/installer_acct/query_shop_acct");
  },
  getUserHistory(params: object): any {
    return axios.get("/installer/item/user_order_history", {params});
  }
}