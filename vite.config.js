// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { dirname, resolve } from 'node:path'
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'
import ViteComponents from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig((command, mode) => {
  return {
    esbuild: {
      drop: mode !== 'dev' ? ['console', 'debugger'] : [],
    },
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: ['vue', 'vue-router', '@vueuse/core', 'vue-i18n', 'pinia','vee-validate'],
        vueTemplate: true,
      }),
      ViteComponents({
        dts: true,
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
          }
        }
      }),
    ],
    build: {
      outDir: './dist',
    },
    define: { 'process.env': {} },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
    optimizeDeps: {
      exclude: ['vuetify'],
      entries: [
        './src/**/*.vue',
      ],
    },
    server: {
      host: '0.0.0.0',
      port: 4000,
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
