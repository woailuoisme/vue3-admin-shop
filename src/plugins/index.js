/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'

import VueApexCharts from 'vue3-apexcharts'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'vue-toastification/dist/index.css'

NProgress.configure({
  showSpinner: false, // Show progress
  // ease:'ease',speed:500,minimum:0.3
})

import Toast from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import vueDropzone from 'vue2-dropzone-vue3'
import VueCountdown from '@chenfengyuan/vue-countdown'
import Draggable from 'vuedraggable'

import i18n from './i18n'

function setup() {
  const defaults = {
    rowsPerPageMessage: '每一页',
    emptyMessage: '暂无数据',
    headerTextDirection: 'center',
    bodyTextDirection: 'center',
    alternating: false,
    buttonsPagination: true,
    // tableClassName: 'customize-table',
    tableClassName: 'customize-table',
    rowsItems: () => [10, 20, 50, 100],
  }
  for (const [key, value] of Object.entries(defaults)) {
    Vue3EasyDataTable.props[key].default = value
  }
}

export function registerPlugins(app) {
  loadFonts()
  app.use(vuetify).use(router).use(pinia).use(i18n).use(NProgress).use(VueApexCharts).use(Toast, {
    transition: 'Vue-Toastification__fade',
    maxToasts: 10,
    newestOnTop: true,
  })
  setup()
  app.component('EasyDataTable', Vue3EasyDataTable)
  app.component('Draggable', Draggable)
  app.component('VueDatePicker', VueDatePicker)
  app.component('VueDropzone', vueDropzone)
  app.component(VueCountdown.name, VueCountdown)
}
