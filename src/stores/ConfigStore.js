import { defineStore } from 'pinia'
import router from '@/router'

let path = router.currentRoute.value.path

export default defineStore('config', {
  // Default Config State
  state: () => ({
    themeDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
    locale: (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language,
    appName: import.meta.env.VITE_APP_NAME,
    // isShowHeader: path !== '/login' || path !== '/' || path !== '/404' || path !== '/403' || path !== '/500'
    isShowHeader: path !== '/login' || path !== '/',
  }),
  // Getters
  getters: {
    // themeDark: (state) => state.themeDark,
    // locale: (state) => state.locale,
  },
  // Actions
  actions: {
    toggleTheme() {
      this.themeDark = !this.themeDark
    },
    setLocale(locale) {
      this.locale = locale
    },
  },
  // Data persistence destination
  // persist: {
  //   key: import.meta.env.VITE_APP_WEBSTORAGE_NAMESPACE || 'vuetify',
  //   storage: window.sessionStorage,
  // },
})
