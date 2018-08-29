import {axios} from "@/utils";

export default {
  getHomeBars(params: object): any {
    return axios.get("./static/appconfig.json");
  }
}