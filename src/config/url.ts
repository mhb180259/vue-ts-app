import {axios} from "@/utils";

export default {
  getHomeBars(params: object): any {
    return axios.get("./static/appconfig.json");
  },
  getHomeProducts(params: object): any {
    return axios.get("/gateway/indexarea/get_index");
  }
}