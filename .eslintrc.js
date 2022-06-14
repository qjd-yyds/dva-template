const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['prettier', 'eslint:recommended', 'plugin:promise/recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'promise'],
  rules: {
    'promise/always-return': OFF,
    'react/react-in-jsx-scope': OFF
  }
};
