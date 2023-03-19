import { defineConfig, loadEnv } from "vite"

import { setupVitePlugins, getSrcPath, getRootPath } from "./build"
import { format } from "date-fns"
import { fileURLToPath } from "node:url"

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const viteEnv = loadEnv(mode, process.cwd())
  const rootPath = getRootPath()
  const srcPath = getSrcPath()
  console.log(rootPath, srcPath)
  return {
    base: mode === "dev" || mode === "prod" ? "/admin/" : "/", // fix dev and prod nginx assets resources url 404
    esbuild: {
      drop: mode !== "dev" || mode !== "local" ? ["console", "debugger"] : [],
    },
    plugins: setupVitePlugins(mode),
    define: {
      __PROJECT_BUILD_TIME__: JSON.stringify(format(new Date(), "yyyy-MM-dd HH:mm:ss")),
    },
    resolve: {
      alias: {
        "~": rootPath,
        "@": srcPath,
        // '@core': fileURLToPath(new URL('./src/@core', import.meta.url)),
        // '@layouts': fileURLToPath(new URL('./src/@layouts', import.meta.url)),
        // '@configured-variables': fileURLToPath(new URL('./src/styles/variables/_template.scss', import.meta.url)),
        // '@axios': fileURLToPath(new URL('./src/plugins/axios', import.meta.url)),
        // 'apexcharts': fileURLToPath(new URL('node_modules/apexcharts-clevision', import.meta.url)),
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    optimizeDeps: {
      include: ["axios", "vue", "vue-router", "pinia", "@vueuse/core", "vee-validate", "apexcharts", "vditor", "wangeditor", "xgplayer"],
      exclude: ["vuetify"],
    },
    // build: {
    //   reportCompressedSize: false,
    //   sourcemap: false,
    //   commonjsOptions: {
    //     ignoreTryCatch: false,
    //   },
    // },
    // configureWebpack: {
    //   devtool: 'source-map'
    // },
    server: {
      host: "0.0.0.0",
      port: 4000,
      cors: true,
      open: true, //
      proxy: {
        "/api": {
          target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  }
})
