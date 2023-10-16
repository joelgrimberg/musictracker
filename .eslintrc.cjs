module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'no-only-tests'],
  rules: {
    'no-only-tests/no-only-tests': [
      'error',
      {
        block: ['test', 'it', 'assert'],
        focus: ['only', 'skip'],
      },
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
