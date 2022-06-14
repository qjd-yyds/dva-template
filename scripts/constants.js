const path = require('path');
const PROJECT_ROOT = path.resolve(__dirname, '..');
// 路径相关变量
const PATHS = {
  resolve: _path => path.resolve(PROJECT_ROOT, _path),
  PROJECT_ROOT,
  PROJECT_SRC: path.resolve(PROJECT_ROOT, 'src'),
  PROJECT_PUBLIC: path.resolve(PROJECT_ROOT, 'public'),
  PROJECT_ENTRY: path.resolve(PROJECT_ROOT, 'src/index.js'),
  PROJECT_OUTPUT: path.resolve(PROJECT_ROOT, 'dist'),
  PROJECT_HTML: path.resolve(PROJECT_ROOT, 'public/index.html')
};
// 环境变量
const isDev = process.env.NODE_ENV !== 'production';

const SERVER_HOST = 'http://localhost'
const SERVER_PROT = 9000
module.exports = {
  PATHS,
  isDev,
  SERVER_HOST,
  SERVER_PROT
};
