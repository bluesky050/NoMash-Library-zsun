import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 在这里设置部署到 GitHub Pages 的基础路径
  base: '/NoMash-Library-zsun/' 
})
