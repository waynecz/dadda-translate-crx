// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: ['Chrome >= 61']
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: ['html', 'react'],
  // add your custom rules here
  rules: {
    // allow async-await
    'space-before-function-paren': 'off',
    'generator-star-spacing': 'off',
    'no-unused-vars': 'off',
    'no-new': 'off',
    'no-undef': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
