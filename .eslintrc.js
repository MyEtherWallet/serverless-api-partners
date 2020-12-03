module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true
  },
  "ignorePatterns": ["node_modules", "dist"],
  extends: [
    'eslint:recommended',
    'plugin:security/recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-else-return': ['error', { allowElseIf: true }],
    'arrow-parens': 'off',
    'generator-star-spacing': 'off',
    semi: 'off',
    'prefer-const': 'error',
    'no-var': 'error',
    'security/detect-new-buffer': 'off',
    'security/detect-object-injection': 'off',
    'require-atomic-updates': 'off',
    'no-prototype-builtins': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2020
  },
  plugins: ['security']
};