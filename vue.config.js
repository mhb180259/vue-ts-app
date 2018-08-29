const webpackDevConf = require("./build/webpack.dev.conf.js");
const webpackProdConf = require("./build/webpeck.prod.conf.js");

const path = require("path");
const resolve = dir => {
  return path.join(__dirname, dir);
};
const TRAGET_URL = "http://47.96.141.89:18085";

module.exports = {
  devServer: {
    proxy: {
      "/gateway": {
        target: TRAGET_URL,
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("~img", resolve("src/assets/img/"))
      .set("~com", resolve("src/components/commons/"));
  },
  configureWebpack: config => {
    return process.env.NODE_ENV !== "production" ? webpackDevConf : webpackProdConf;
  },
  css: {
    loaderOptions: {
      less: {
        data: `@import "@/style/variables.less";`,
      }
    }
  }
};
