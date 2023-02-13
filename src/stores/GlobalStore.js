import { defineStore } from 'pinia'

/** Global Store */
export default defineStore('global', {
  // Default Global State
  state: () => ({
    loading: false,
    progress: null,
    message: '',
  }),
  // Getters
  getters: {
    /** Loading overlay visibility */
    isLoading: (state) => state.loading,
    /** Loadig progress value */
    getProgress: (state) => {
      state.loading = true
      return state.progress
    },
    /** Snackbar Text */
    getMessage: (state) => state.message,
  },
  // Actions
  actions: {
    /** Show loading Overlay */
    setLoading(display) {
      this.loading = display
      if (!display) {
        // Reset Progress value
        this.progress = null
      }
    },
    /** Update progress value */
    setProgress(progress) {
      // update progress value
      this.progress = progress
      // display loading overlay
      this.loading = true
    },
    /** Show snackbar message */
    setMessage(message) {
      // put snackbar text
      this.message = message
    },
  },
  /*
    persist: {
      key: import.meta.env.VITE_APP_WEBSTORAGE_NAMESPACE || 'vuetify',
      storage: window.localStorage,
    },
    */
})
