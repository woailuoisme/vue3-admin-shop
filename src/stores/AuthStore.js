import { defineStore } from 'pinia'
import AuthService from '../api/auth.service'
import toast from '../utils/toast'
export default defineStore('auth', {
  state: () => ({
    user: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : {},
  }),
  getters: {
    getUser(state) {
      return state.user
    },
    token(state) {
      return state.user && state.user.token ? state.user.token : ''
    },
    role(state) {
      return state.user && state.user.role ? state.user.role : ''
    },
    isAuthed(state) {
      return Object.keys(state.user).length > 0
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
        this.user = {}
        toast.success('用户登出成功')
        return true
      }
      return false
    },

    resetUser() {
      window.localStorage.removeItem('user')
    },
  },
})
