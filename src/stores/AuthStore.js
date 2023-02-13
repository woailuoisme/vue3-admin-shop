import { defineStore } from 'pinia'
import AuthService from '../api/auth.service'
import toast from '../utils/toast'

/** Config Store */
export default defineStore('auth', {
  // Default Config State
  state: () => ({
    user: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : {},
  }),
  // Getters
  getters: {
    // themeDark: () => this._themeDark,
    getUser() {
      return this.user
    },
    token() {
      return this.user && this.user.token ? this.user.token : ''
    },
    role() {
      return this.user && this.user.role ? this.user.role : ''
    },
    isAuthed() {
      return !!this.user.value
    },
  },
  // Actions
  actions: {
    async login(loginInfo) {
      let response = await AuthService.login(loginInfo)
      if (response.data.success) {
        let user = response.data.data
        this.user = user
        window.localStorage.user = JSON.stringify(user)
        toast.success('用户登录成功')
        return true
      }
      toast.success('用户名或密码有误')
      return false
    },

    async logout() {
      let response = await AuthService.logout()
      if (response.data.success) {
        window.localStorage.removeItem('user')
        toast.success('用户登出成功')
        return true
      }
      return false
    },

    resetUser() {
      window.localStorage.removeItem('user')
    },
  },
  // Data persistence destination
  //     persist: {
  //         key: import.meta.env.VITE_APP_WEBSTORAGE_NAMESPACE || 'vuetify',
  //         storage: window.sessionStorage,
  //     },
})
