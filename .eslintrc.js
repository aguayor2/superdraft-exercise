module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'google'
  ],
  'parserOptions': {
    'ecmaVersion': 12
  },
  'rules': {
    'indent': ['error', 2],
    'semi': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'space-before-function-paren': ['error', 'always'],
    'comma-dangle': ['error', 'never']
  }
}
