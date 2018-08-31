import {axios} from "@/utils";


// 此文件中的接口可以单独调用,例如用户登录，删除等接口调用
export default {
  userLogin(params: object): any {
    return axios.get("user/installer/login", {params});
  },
  searchItem(params: object): any {
    return axios.get("installer/item/get_item_with_aggregate", {params});
  },
  categoryList(params: object): any {
    return axios.get("installer/category/get_carrier_category_list", {params});
  },
}