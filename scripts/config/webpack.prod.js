const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'eval',
  optimization: {
    removeAvailableModules: false // 不检测已经出现在所有父级模块中的模块
  }
});
