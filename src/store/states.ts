import {Url} from '@/config';

const urlObj: any = {};
Object.keys(Url).forEach((key) => {
  urlObj[key] = null
});

const state = {
  loading: false,
  ...urlObj
};

export default state
