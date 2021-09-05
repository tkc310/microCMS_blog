module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/order': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    // SSGのため除外
    'react/no-danger': 0,
    // 自動で読み込まれるため除外
    'react/react-in-jsx-scope': 0,
    'prettier/prettier': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true, // devDependenciesのimportを許可
        optionalDependencies: false,
      },
    ],
    'react/jsx-props-no-spreading': 0,
    // アクセシビリティはwarningにしておく
    'jsx-a11y/anchor-is-valid': 1,
    'no-use-before-define': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
