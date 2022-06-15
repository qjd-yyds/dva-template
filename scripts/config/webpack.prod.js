const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: 4,
        test: /\.m?js(\?.*)?$/i,
        terserOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log']
          }
        }
      }),
      '...'
    ],
    removeAvailableModules: false, // 不检测已经出现在所有父级模块中的模块
    splitChunks: {
      cacheGroups: {
        vendor: {
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight(item => item);
            const allChunksNames = chunks.map(item => item.name).join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        },
        utils: {
          name: 'utils',
          chunks: 'all',
          test: /[\\/]utils[\\/]/,
          minSize: 1,
          minChunks: 1
        }
      },
      minChunks: 1, // 引入的模块至少被2个模块使用过
      chunks: 'all' // 全部模块
    }
  }
});
