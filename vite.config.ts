import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.config'
import stylelint from 'vite-plugin-stylelint'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [vue(), crx({ manifest }), stylelint({ cache: true }), eslint({ cache: false })],
  server: {
    port: 5173,
    hmr: {
      clientPort: 5173,
    },
    proxy: {
      '/proxy': {
        target: 'http://stg-m.keiba.rakuten.co.jp',
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'sass:map';
          @import '@packages/popup/styles/helpers';
        `,
      },
    },
  },
})
