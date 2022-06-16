const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { PATHS, SERVER_HOST, SERVER_PROT } = require('../constants');
module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: {
      directory: PATHS.PROJECT_PUBLIC
    },
    bonjour: {
      type: 'http',
      protocol: 'udp'
    },
    client: {
      // 编译报错或者警告，全屏覆盖
      overlay: {
        errors: true,
        warnings: false
      },
      logging: 'info',
      reconnect: 3,
      // errors: true,
      // warnings: false,
      progress: true
    },
    liveReload: false,
    host: '0.0.0.0',
    hot: true,
    compress: true, // 启动zip
    open: {
      target: [`${SERVER_HOST}:${SERVER_PROT}`]
    },
    // 代理
    proxy: {
      '/api': 'http://localhost:3000'
    },
    port: SERVER_PROT
  },
  stats: 'errors-only',
  devtool: 'eval-source-map'
});
