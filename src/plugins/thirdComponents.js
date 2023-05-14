import Vue3EasyDataTable from "vue3-easy-data-table"
import "vue3-easy-data-table/dist/style.css"

import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

import Draggable from "vuedraggable"
import VOtpInput from "vue3-otp-input"
import { FilepondPlugin } from "@/plugins/filepond"

// function setup() {
//   const defaults = {
//     rowsPerPageMessage: "每页",
//     emptyMessage: "暂无数据",
//     headerTextDirection: "center",
//     bodyTextDirection: "center",
//     alternating: false,
//     // themeColor:"#f48225",
//     buttonsPagination: true,
//     // tableClassName: 'customize-table',
//     tableClassName: "customize-table",
//     rowsItems: () => [10, 20, 50, 100],
//   }
//   for (const [key, value] of Object.entries(defaults)) {
//     Vue3EasyDataTable.props[key].default = value
//   }
// }

import PulseLoader from "vue-spinner/src/PulseLoader.vue"
// use
// <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>

export function registerComponents(app) {
  // setup()
  app.component("OtpInput", VOtpInput)
  app.component("FilePond", FilepondPlugin)
  app.component("EasyDataTable", Vue3EasyDataTable)
  app.component("Draggable", Draggable)
  app.component("VueDatePicker", VueDatePicker)
  app.component("PulseLoader", PulseLoader)
}
