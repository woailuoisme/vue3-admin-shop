/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import {loadFonts} from './webfontloader'
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'

import VueApexCharts from 'vue3-apexcharts'
import NProgress from 'nprogress' // 引入nprogress插件
import 'nprogress/nprogress.css' // 这个nprogress样式必须引入
import 'vue-toastification/dist/index.css'

NProgress.configure({
  showSpinner: false, // Show progress
  // ease:'ease',speed:500,minimum:0.3
})

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";


import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import vueDropzone from 'vue2-dropzone-vue3'


import i18n from './i18n'

export function registerPlugins(app) {
  // loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(i18n)
    .use(NProgress)
    .use(VueApexCharts)
    .use(Toast, {
      transition: "Vue-Toastification__fade",
      maxToasts: 20,
      newestOnTop: true
    })
  app.component('EasyDataTable', Vue3EasyDataTable);
  app.component('VueDatePicker', VueDatePicker);
  app.component('VueDropzone', vueDropzone);
}
