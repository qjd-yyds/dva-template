const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

const { PATHS, SERVER_HOST, SERVER_PROT, isDev } = require('../constants');
const getCssLoaders = importLoaders => {
  return [
    'style-loader',
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
module.exports = {
  entry: PATHS.PROJECT_ENTRY,
  output: {
    asyncChunks: true,
    filename: `js/[name]${isDev ? '' : '.[contenthash]'}.js`, // 根据内容生成hash
    clean: true,
    path: PATHS.PROJECT_OUTPUT
  },
  module: {
    rules: [
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
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        generator: {
          filename: 'fonts/[name].[contenthash:8].[ext]'
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
  plugins: [
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
      clearConsole: true,
      compilationSuccessInfo: {
        messages: [`应用已经就绪，运行在${SERVER_HOST}:${SERVER_PROT}`],
        notes: ['编译成功，请在浏览器中访问']
      }
    })
  ]
};
