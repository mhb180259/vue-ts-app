import {dataUrl} from '@/config';

const urlObj: any = {};
Object.keys(dataUrl).forEach((key) => {
  urlObj[key] = null
});
// 共同的state，判断loading状态
const commonState = {
  loading: false
};


// 存储商品列表等常用数据
const dataState = {
  ...commonState,
  ...urlObj
};

// 存储关于用户信息
const userState = {
  ...commonState,
  auth: true,
  email: "",
  account: "",
  status: "",
  couponNum: 0
};

const cacheState = {
  ...commonState,
  categoryList: [],
  cartCount: 0,
  searchCateId: -1,
  itemProduct: []
};

export {
  dataState,
  userState,
  cacheState
};
