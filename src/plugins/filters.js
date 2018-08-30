// import moment from "moment";
import store from "../store";

export function toFixed(value, n) {
  if (!value) return;
  return Number(value).toFixed(n);
}

export function moneyFormat(v) {
  v = v || 0;
  return (v / 100).toFixed(2);
}

// export function timestamp2str(val) {
//   if (!val) return "";
//   return moment(val).format("MM/DD/YYYY HH:mm:ss");
// }

export function orderStatus(v) {
  v = v + "";
  const map = { "0": "Unpaid", "1": "Open", "2": "Received", "7": "Completed", "9": "Closed" };
  return map[v] ? map[v] : "All";
}

export function vipPrice(price, item) {
  let option = [];
  price = price || 0;
  if (item && item.price_define_do && item.price_define_do.discount_map) {
    option = item.price_define_do.discount_map;
  }
  let vip = store.getters.vip;
  for (let level in option) {
    if (parseInt(level) === vip) {
      return price * option[level];
    } else {
      return price;
    }
  }
}

export function prettyProduct(product) {
  // 转化商品标签
  let json = product.item_props ? JSON.parse(product.item_props[0].prop_value) : product.x_selectedPropMap;
  let array = [];
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      const element = json[key];
      array.push(element);
    }
  }
  return { img: product.full_url, desc: product.item_name, labels: array, id: product.id };
}
