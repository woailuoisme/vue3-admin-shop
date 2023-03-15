import { defineStore } from "pinia"
import router from "@/router"

export default defineStore("config", {
  // Default Config State
  state: () => ({
    text: "",
    color: "",
    timeout: "",
  }),
  actions: {
    showSuccessSnack(text) {
      this.text = text
      this.color = "success"
      this.timeout = 1
    },
    showInfoSnack(text) {
      this.text = text
      this.color = "success"
      this.timeout = 1
    },
    showErrorSnack(text) {
      this.text = text
      this.color = "success"
      this.timeout = 1
    },
  },
})
