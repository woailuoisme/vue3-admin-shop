import UserService from '../api/user.service'
import Toast from '../utils/toast'

import { defineStore } from 'pinia'
import { format } from 'date-fns'

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
    loading: false,
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: '',
      email: '',
      password: null,
      avatar: null,
      avatarFile: [],
      role: '',
    },
    defaultItem: {
      id: 0,
      name: '',
      email: '',
      password: null,
      avatar: null,
      avatarFile: [],
      role: '',
    },
  }),
  // Getters
  getters: {
    total(state) {
      return state.meta.total ?? 0
    },
    isNew(state) {
      return state.editedIndex === -1
    },
    getEditedItem(state) {
      return state.editedItem
    },
    getEditedIndex(state) {
      return state.editedIndex
    },

    findById: (state) => (id) => {
      return state.managers.find((user) => user.id === id)
    },
    findIndexById: (state) => (id) => {
      return state.managers.findIndex((user) => user.id === id)
    },
    hasData(state) {
      return !!state.users.length
    },
    getUsers(state) {
      return [...state.users]
    },
    getUser(state) {
      return { ...state.userInfo }
    },
    findByOrderId: (state) => (id) => {
      return state.users.find((user) => user.id === id)
    },
    getMeta(state) {
      return { ...state.meta }
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

    // async createUser(payload) {
    //   const res = await UserService.create(payload)
    //   this.user = res.data.data
    //   Toast.success(res.data.message)
    //   return true
    // },
    //
    // async updateUser(payload) {
    //   const res = await UserService.update(payload)
    //   this.user = res.data.data
    //   Toast.success(res.data.message)
    // },

    async toggleLottery(payload) {
      const res = await UserService.toggleLottery(payload)
      if (res.data.data) {
        const user = res.data.data
        const index = this.users.findIndex((p) => p.id === payload.id)
        this.users[index] = Object.assign({}, user)
        Toast.success(res.data.message)
      }
    },

    async downloadExcel() {
      try {
        const res = await UserService.downloadExcel()
        let blob = new Blob([res.data], { type: 'application/xlsx' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        let now = format(new Date(), 'yyyy-MM-dd_HH_mm_ss')
        link.download = `user_excel_${now}.xlsx`
        link.click()
      } catch (e) {
        console.log(e)
      }
    },

    // async deleteUser(userId) {
    //   const res = await UserService.delete(userId)
    //   if (res.data.success) {
    //     const index = state.users.findIndex((p) => p.id === userId)
    //     this.users.splice(index, 1)
    //     Toast.success(res.data.message)
    //   } else {
    //     Toast.error(res.data.message)
    //   }
    // },
  },
})
