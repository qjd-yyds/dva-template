const path = require('path');
const ROOT = path.resolve(__dirname, '..');
module.exports = {
  resolve: (_path) => path.resolve(ROOT, _path),
  ROOT,
  SRC: path.resolve(ROOT, 'src'),
  PUBLIC: path.resolve(ROOT, 'public'),
  ENTRY: path.resolve(ROOT, 'src/index.js'),
  OUTPUT: path.resolve(ROOT, 'dist'),
  HTML: path.resolve(ROOT, 'public/index.html')
};
