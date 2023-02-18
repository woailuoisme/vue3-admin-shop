// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'
import {dirname, resolve} from 'node:path'

// Utilities
import {defineConfig} from 'vite'
import {fileURLToPath, URL} from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import {loadEnv} from 'vite'

// https://vitejs.dev/config/
export default defineConfig((command, mode) => {
  return {
    plugins: [
      vue({
        template: {transformAssetUrls},
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
    ],
    build: {
      outDir: './dist',
    },
    define: {'process.env': {}},
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
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
