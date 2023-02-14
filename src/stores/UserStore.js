import UserService from '../api/user.service'
import Toast from '../utils/toast'
import moment from 'moment'

import {defineStore} from 'pinia'

/** Config Store */
export default defineStore('user', {
  // Default Config State
  state: () => ({
    users: [],
    meta: {},
    initUserMeta: {
      per_page: 10,
      last_page: 1,
      current_page: 1,
      total: 10,
      from: 1,
      to: 10,
    },
    userInfo: {},
  }),
  // Getters
  getters: {
    hasData(state) {
      return !!state.users.length
    },
    getUsers(state) {
      return [...state.users]
    },
    getUser(state) {
      return {...state.userInfo}
    },
    findByOrderId: (state) => (id) => {
      return state.users.find((user) => user.id === id)
    },
    getMeta(state) {
      return {...state.meta}
    },
    isDisplayPagination(state) {
      return !!(state.meta && state.meta.last_page && state.meta.last_page > 1)
    },
  },
  // Actions
  actions: {
    async loadAllUsers(payload) {
      const res = await UserService.list(payload)
      if (res.data.data) {
        this.users = res.data.data.items
        this.meta = res.data.data.meta
      }
    },

    async loadUser(userId) {
      const res = await UserService.show(userId)
      this.user = res.data.data
      Toast.success(res.data.message)
    },

    async createUser(payload) {
      const res = await UserService.create(payload)
      this.user = res.data.data
      Toast.success(res.data.message)
      return true
    },

    async updateUser(payload) {
      const res = await UserService.update(payload)
      this.user = res.data.data
      Toast.success(res.data.message)
    },

    async toggleLottery(payload) {
      const res = await UserService.downloadExcel(payload)
      if (res.data.data) {
        this.user = res.data.data
        Toast.success(res.data.message)
      }
    },

    async downloadExcel(payload) {
      try {
        const res = await UserService.downloadExcel(payload)
        let blob = new Blob([res.data], {type: 'application/xlsx'})
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        let now = moment().format('YYYY_MM_DD_HH_mm_ss')
        link.download = `user_excel_${now}.xlsx`
        link.click()
      } catch (e) {
        console.log(e)
      }
    },

    async deleteUser(userId) {
      const res = await UserService.delete(userId)
      if (res.data.success) {
        const index = state.users.findIndex((p) => p.id === userId)
        this.users.splice(index, 1)
        Toast.success(res.data.message)
      } else {
        Toast.error(res.data.message)
      }
    },
  },

})


