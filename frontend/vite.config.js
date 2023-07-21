import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createRequire } from 'module'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 导入 webpack
import webpack from 'webpack'

export default defineConfig({

  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dirs: ['src/store', 'src/api'],
    }),
    Components({
      dirs: ['src/components', 'src/views',]
    })
  ],

  // configureWebpack 放到最外层
  configureWebpack: {
    plugins: [
      // Inside configureWebpack
      new webpack.ProvidePlugin({
        require: 'imports-loader?require=false'
      })
    ]
  }
})