import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

import { svgstore } from './src/vite_plugins/svgstore'

// https://vitejs.dev/config/
export default defineConfig({
  // base:'/neriol-accounting-fe/dist/', //部署到github时需要配置
  plugins: [
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
      transformOn: true,
      mergeProps: true,
    }),
    vue(),
    svgstore(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  server:{
    proxy:{
      '/api/v1':{
        target:'http://neriol.cn:3000/'
      }
    }
  }
})
