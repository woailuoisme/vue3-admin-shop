/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue"
// import {createApp} from 'vue'
import { createApp } from "vue/dist/vue.esm-bundler"
// data table scss style
import "@/styles/style.css"
import "@/styles/theme.scss"

// import mock from '@/data/mock'

// Plugins
import { registerPlugins } from "@/plugins"
import { registerLayouts } from "@/layout/register"

const app = createApp(App)

registerPlugins(app)
registerLayouts(app)

app.mount("#app")
if (import.meta.env.MODE === "dev") {
  console.log("env.MODE: ", import.meta.env.MODE)
  console.log("env.BASE_URL: ", import.meta.env.BASE_URL)
  console.log("env.PROD: ", import.meta.env.PROD)
  console.log("env.DEV: ", import.meta.env.DEV)
  console.log("env.SSR: ", import.meta.env.SSR)
  // console.log(app.$vuetify.display);
  console.log(app.version)
  console.log(import.meta.env.VITE_BASE_URL)
  console.log(import.meta.env.VITE_BASE_URL_ADMIN)
  // toggle browse plugin
  app.config.devtools = true
  console.log(" app.config.devtools: ", app.config.devtools)
}

export default app
