import Vue3EasyDataTable from "vue3-easy-data-table"
import "vue3-easy-data-table/dist/style.css"

import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

import Draggable from "vuedraggable"
import VOtpInput from "vue3-otp-input"
import { FilepondPlugin } from "@/plugins/filepond"
import PulseLoader from "vue-spinner/src/PulseLoader.vue"

export function registerComponents(app) {
  // setup()
  app.component("OtpInput", VOtpInput)
  app.component("FilePond", FilepondPlugin)
  app.component("EasyDataTable", Vue3EasyDataTable)
  app.component("Draggable", Draggable)
  app.component("VueDatePicker", VueDatePicker)
  app.component("PulseLoader", PulseLoader)
}
