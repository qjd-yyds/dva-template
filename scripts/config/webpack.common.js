const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PATHS, SERVER_HOST, SERVER_PROT, isDev } = require('../constants');
const WebpackBar = require('webpackbar');
// 处理css
const getCssLoaders = importLoaders => {
  return [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: false,
        sourceMap: isDev,
        importLoaders
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: isDev
      }
    }
  ];
};
// 处理plugins
const getPlugins = () => {
  const { transformer, formatter } = require('../resolveLoaderError');
  const plugins = [
    new HtmlWebpackPlugin({
      template: PATHS.PROJECT_HTML,
      filename: 'index.html',
      cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: isDev
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true
          }
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here ${SERVER_HOST}:${SERVER_PROT}`],
        notes: ['Some additional notes to be displayed upon successful compilation']
      },
      additionalTransformers: [transformer],
      additionalFormatters: [formatter]
    }),
    new WebpackBar({
      color: 'green'
    })
  ];
  if (!isDev) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: '[id].css'
      })
    );
  }
  return plugins;
};
module.exports = {
  entry: PATHS.PROJECT_ENTRY,
  output: {
    asyncChunks: true,
    filename: `js/[name]${isDev ? '' : '.[contenthash]'}.js`, // 根据内容生成hash
    clean: true,
    path: PATHS.PROJECT_OUTPUT,
    pathinfo: false // 禁止输出的bundle中带有路径
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: PATHS.PROJECT_SRC,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 4
            }
          },
          'babel-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: getCssLoaders(1)
      },
      {
        test: /\.less$/i,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        generator: {
          filename: 'images/[name].[contenthash:8].[ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024 // 超过50kb不转 base64
          }
        },
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        generator: {
          filename: 'fonts/[name].[contenthash:8].[ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 超过10kb不转 base64
          }
        },
        type: 'asset/resource'
      },
      // 数据
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader']
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader']
      },
      // 自定义json
      {
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse
        }
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse
        }
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse
        }
      }
    ]
  },
  plugins: getPlugins(),
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': PATHS.PROJECT_SRC,
      '~': PATHS.PROJECT_SRC
    },
    modules: ['node_modules']
  },
  cache: isDev && {
    type: 'filesystem'
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'async', // 有效值为`all`，`async`和`initial`
      minSize: 20000, // 生成 chunk 的最小体积（≈ 20kb)
      minRemainingSize: 0, // 确保拆分后剩余的最小 chunk 体积超过限制来避免大小为零的模块
      minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
      maxAsyncRequests: 30, // 最大的按需(异步)加载次数
      maxInitialRequests: 30, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件）
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
