import { defineConfig, loadEnv } from "vite"

import { setupVitePlugins, getSrcPath, getRootPath } from "./build"

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
    define: { "process.env": {} },
    resolve: {
      alias: {
        "~": rootPath,
        "@": srcPath,
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    optimizeDeps: {
      include: ["axios", "vue", "vue-router", "pinia", "@vueuse/core", "vee-validate", "apexcharts"],
      exclude: ["vuetify"],
    },
    build: {
      reportCompressedSize: false,
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false,
      },
    },
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
