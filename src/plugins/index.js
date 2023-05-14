import { loadFonts } from "./webfontloader"
import pinia from "@/stores"
import vuetify from "./vuetify"
import router from "../router"
import i18n from "./i18n"

import VueApexCharts from "vue3-apexcharts"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
const toastOptions = {
  transition: "Vue-Toastification__fade",
  maxToasts: 5,
  newestOnTop: true,
}

import PerfectScrollbar from "vue3-perfect-scrollbar"
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"

import { registerComponents } from "@/plugins/thirdComponents"

import { vMaska } from "maska"
export function registerPlugins(app) {
  loadFonts()
  app.use(vuetify).use(router).use(pinia).use(i18n).use(VueApexCharts).use(PerfectScrollbar).use(Toast, toastOptions)
  app.directive("v-mask", vMaska)
  registerComponents(app)
}
