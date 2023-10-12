/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['@packages/eslint-config'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
}
