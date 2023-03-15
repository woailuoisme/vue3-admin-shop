import { defineStore } from "pinia"
import router from "@/router"

export default defineStore("config", {
  // Default Config State
  state: () => ({
    themeDark: window.matchMedia("(prefers-color-scheme: dark)").matches,
    locale: (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language,
    appName: import.meta.env.VITE_APP_NAME,
    // isShowHeader: path !== '/login' || path !== '/' || path !== '/404' || path !== '/403' || path !== '/500'
    isShowHeader: router.currentRoute.value.path !== "/login",
  }),
  actions: {
    toggleTheme() {
      this.themeDark = !this.themeDark
    },
    setLocale(locale) {
      this.locale = locale
    },
  },
})
