module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:import/recommended',
  ],
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
    'no-trailing-spaces': ['error'],
    'eol-last': ['error', 'always'],
    'node/no-process-env': ['error'],
    'import/extensions': ['error', 'always'],
  },
  overrides: [{
    files: '*.spec.js',
    plugins: ['jest'],
    extends: ['plugin:jest/recommended'],
    rules: {
      'node/no-extraneous-import': ['error', {
        allowModules: ['@jest/globals'],
      }],
    },
  }],
};
