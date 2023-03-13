// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { dirname, resolve } from 'node:path'
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'
import ViteComponents from 'unplugin-vue-components/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig(async (command, mode) => {

  const config= {
    base: mode === 'dev' || mode === 'prod' ? '/admin' : '/', // fix dev and prod nginx assets resources url 404
    esbuild: {
      drop: mode !== 'dev' ? ['console', 'debugger'] : [],
    },
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      VueSetupExtend(),
      Components({
        resolvers: [IconsResolver()],
      }),
      Icons({ autoInstall: true }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: ['vue', 'vue-router', '@vueuse/core', 'vue-i18n', 'pinia', 'vee-validate'],
        vueTemplate: true,
      }),
      ViteComponents({
        resolvers: [VuetifyResolver()],
      }),
      VueI18nPlugin({
        runtimeOnly: false,
        // provide a path to the folder where you'll store translation data (see below)
        include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
        autoImport: true,
        styles: {
          configFile: 'src/styles/settings.scss',
        },
      }),
      Pages({}),
      Layouts(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: loadEnv(mode, process.cwd()).VITE_APP_NAME,
          },
        },
      }),
    ],
    define: { 'process.env': {} },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
    optimizeDeps: {
      include: [
        'axios',
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        'vee-validate',
        'loadash',
        'apexcharts',
        'tinymce',
        'tinymce',
      ],
      exclude:['vuetify']
    },
    server: {
      host: '0.0.0.0',
      port: 4000,
      cors: true,
      open: true, // 在服务器启动时自动在浏览器中打开应用程序
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        // "/admin": {
        //   target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/admin/, ""),
        // },
      },
    },
  }
  return config
})
