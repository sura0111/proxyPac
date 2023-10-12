/** @type import('eslint').Linter.Config */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    useHead: true,
    ref: true,
    computed: true,
    defineProps: true,
    defineEmit: true,
    defineStore: true,
    PropType: true,
    defineComponent: true,
    onBeforeRouteUpdate: true,
    useRoute: true,
    useRouter: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'standard-with-typescript',
    'plugin:prettier-vue/recommended',
    'plugin:json/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue', '.json', '.html'],
    parser: '@typescript-eslint/parser',
  },
  overrides: [
    {
      files: ['*.html'],
      parser: '@html-eslint/parser',
      extends: ['plugin:@html-eslint/recommended'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ],
  plugins: ['vue', '@typescript-eslint', '@html-eslint'],
  rules: {
    'prettier-vue/prettier': 'error',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    'vue/first-attribute-linebreak': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
  },
}
