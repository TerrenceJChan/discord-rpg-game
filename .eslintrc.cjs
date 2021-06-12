module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'quote-props': ['error', 'as-needed'],
    'comma-dangle': ['error', 'always-multiline'],
  },
  overrides: [{
    files: '*.spec.js',
    plugins: [
      'mocha',
      'chai-friendly',
    ],
    extends: [
      'plugin:mocha/recommended',
      'plugin:chai-friendly/recommended',
    ],
  }],
};
