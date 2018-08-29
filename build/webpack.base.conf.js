const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: "static",
        ignore: ['.*']
      }
    ])
  ]
};
