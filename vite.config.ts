import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // base:'/neriol-accounting-fe/dist/', //部署到github时需要配置
  plugins: [vue()]
})
