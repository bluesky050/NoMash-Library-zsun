import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // 1. 导入 Node.js 的 path 模块

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/NoMash-Library-zsun/', // 这是我们为 GitHub Pages 添加的路径

  // 2. 添加 resolve.alias 配置来定义 '@'
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})