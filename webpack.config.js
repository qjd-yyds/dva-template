const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

const { ENTRY, PUBLIC, OUTPUT, HTML } = require('./scripts/paths');
const PORT = 9000;
const LOCAL = 'http://localhost';
const LOCAL_HOST = `${LOCAL}:${PORT}`;

module.exports = {
  entry: ENTRY,
  mode: 'development', // 'production'
  output: {
    asyncChunks: true,
    filename: '[name].[contenthash].bundle.js', // 根据内容生成hash
    clean: true,
    path: OUTPUT
  },
  devServer: {
    static: {
      directory: PUBLIC
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
    compress: true,
    open: {
      target: [LOCAL_HOST]
    },
    // 代理
    proxy: {
      '/api': 'http://localhost:3000'
    },
    port: PORT
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
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
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: HTML
    }),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
      compilationSuccessInfo: {
        messages: [`应用已经就绪，运行在${LOCAL_HOST}`],
        notes: ['编译成功，请在浏览器中访问']
      }
    })
  ]
};
