import { defineConfig, loadEnv } from "vite"
import { setupVitePlugins, getSrcPath, getRootPath } from "./build"
// import { fileURLToPath } from "node:url"
import dayjs from "dayjs"

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
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
      __PROJECT_BUILD_TIME__: JSON.stringify(dayjs().format("YYYY-MM-DD HH:mm:ss")),
    },
    resolve: {
      alias: {
        "~": rootPath,
        "@": srcPath,
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    optimizeDeps: {
      include: ["axios", "vue", "vue-router", "pinia", "@vueuse/core", "vee-validate", "apexcharts", "vditor", "wangeditor", "xgplayer"],
      exclude: ["vuetify"],
    },
    server: {
      host: "0.0.0.0",
      port: 4000,
      cors: true,
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
