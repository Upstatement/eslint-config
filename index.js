const prettier = require('@upstatement/prettier-config');

module.exports = {
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier'],
  env: { es6: true },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': ['error', prettier],
    'no-var': 'error'
  }
}
