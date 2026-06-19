import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import prettier from 'eslint-config-prettier'

export default defineConfig(
  {
    ignores: [
      'dist/**',
      'artifacts/**',
      'node_modules/**',
      '.yarn/**',
      'coverage/**',
      'public/**',
      '_locales/**',
      '**/*.d.ts',
    ],
  },

  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
  },

  {
    languageOptions: {
      globals: {
        chrome: 'readonly',
      },
    },
    rules: {
      // TODO(you): tune these to taste. See block in chat for the choice point.
      'vue/multi-word-component-names': 'off',
      'vue/first-attribute-linebreak': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  prettier,
)
