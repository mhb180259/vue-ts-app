const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const resolve = (dir) => path.join(__dirname, dir);


const devWebpackConfig = merge(baseWebpackConfig, {

})


module.exports = devWebpackConfig;
