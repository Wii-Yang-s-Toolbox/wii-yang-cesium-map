import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    cesium({ cesiumBaseUrl: '/cesium/' }),
    AutoImport({
      resolvers: [AntDesignVueResolver()],
      dts: './types/auto-imports.d.ts',
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
      dts: './types/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@types': fileURLToPath(new URL('./types', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 5000,
    open: false,
    proxy: {
      '/tdt': {
        target: 'https://wii-yang.cn',
        changeOrigin: true,
      },
    },
  },
})
