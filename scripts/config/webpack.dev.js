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
      overlay: {
        errors: true,
        warnings: false
      },
      reconnect: 3,
      // errors: true,
      // warnings: false,
      progress: true
    },
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
  devtool: 'eval-source-map'
});
