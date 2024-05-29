import { fileURLToPath } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

export default defineConfig({
  plugins: [
    Vue(),
    UnoCSS(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  server: {
    port: 8080,

    // https: true,
    proxy: {
      '/api': {
        target: 'https://dev.nexthuman.cn',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        headers: {
          referer: 'https://dev.nexthuman.cn',
        },
      },
      // '/assets': {
      //   target: 'http://192.168.124.7:5173',
      //   changeOrigin: true,
      //   rewrite: path => path.replace(/^\/assets/, ''),
      // },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
