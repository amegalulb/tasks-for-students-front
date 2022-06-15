module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 0,
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'no-param-reassign': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/no-unresolved': 'error',
    'react/no-unstable-nested-components': [
      'error',
      { allowAsProps: true },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.d.ts', '.ts', '.tsx'],
      },
    },
  },
};
