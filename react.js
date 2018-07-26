module.exports = {
  'extends': [
    './index.js',
    'plugin:react/recommended',
  ],
  'parserOptions': {
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'env': {
    'browser': true,
    'node': true,
    'es6': true,
  }
}
