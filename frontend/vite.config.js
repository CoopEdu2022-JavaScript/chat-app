import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createRequire } from 'module'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 导入 webpack
import webpack from 'webpack'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
export default defineConfig({

  plugins: [
    vue({
      template: { transformAssetUrls }
    }),

    quasar({
      sassVariables: 'src/quasar-variables.sass'
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dirs: ['src/store', 'src/api'],
    }),
    Components({
      dirs: ['src/components', 'src/views',]
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
    cors: true
  },
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
