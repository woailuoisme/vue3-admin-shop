import { defineStore } from 'pinia'

/** Config State */
// const ConfigState = {
//     /** Dark Theme mode */
//     _themeDark,
//     /** Language */
//     _locale
// };

/** Config Store */
export default defineStore('config', {
  // Default Config State
  state: () => ({
    themeDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
    locale: (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language,
  }),
  // Getters
  getters: {
    themeDark: (state) => state.themeDark,
    locale: (state) => state.locale,
  },
  // Actions
  actions: {
    /** Toggle Dark/Light mode */
    toggleTheme() {
      this.themeDark = !this.themeDark
    },
    /** Set Locale. */
    setLocale(locale) {
      this.locale = locale
    },
  },
  // Data persistence destination
  persist: {
    key: import.meta.env.VITE_APP_WEBSTORAGE_NAMESPACE || 'vuetify',
    storage: window.sessionStorage,
  },
})
