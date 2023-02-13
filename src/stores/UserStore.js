import UserService from '../api/user.service'
import Toast from '../utils/toast'
import ProductService from '@/api/product.service'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
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
  },
  mutations: {
    SET_USERS(state, payload) {
      state.users = payload
    },
    SET_META(state, payload) {
      state.meta = payload
    },
    SET_USER(state, payload) {
      state.userInfo = payload
    },
    DELETE_USER(state, payload) {
      const index = state.users.findIndex((p) => p.id === payload)
      state.users.splice(index, 1)
    },
    RESET_USER(state) {
      state.carouselInfo = {}
    },
  },
  actions: {
    async loadAllUsers({ commit }, payload) {
      const res = await UserService.list(payload)
      if (res.data.data) {
        commit('SET_USERS', res.data.data.items)
        commit('SET_META', res.data.data.meta)
      }
    },

    async loadUser({ commit }, userId) {
      const res = await UserService.show(userId)
      const user = res.data.data
      commit('SET_USER', user)
      Toast.success(res.data.message)
    },

    async createUser({ commit }, payload) {
      const res = await UserService.create(payload)
      const user = res.data.data

      commit('SET_USER', user)
      Toast.success(res.data.message)
      return true
    },

    async updateUser({ commit }, payload) {
      const res = await UserService.update(payload)
      const user = res.data.data
      commit('SET_USER', user, { root: true })
      Toast.success(res.data.message)
    },

    async toggleLottery({ commit }, payload) {
      const res = await UserService.downloadExcel(payload)
      if (res.data.data) {
        const user = res.data.data
        commit('SET_USER', user)
        Toast.success(res.data.message)
      }
    },

    async downloadExcel({ commit }, payload) {
      try {
        const res = await UserService.downloadExcel(payload)
        let blob = new Blob([res.data], { type: 'application/xlsx' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        let now = moment().format('YYYY_MM_DD_HH_mm_ss')
        link.download = `user_excel_${now}.xlsx`
        link.click()
      } catch (e) {
        console.log(e)
      }
    },

    async deleteUser({ commit }, userId) {
      const res = await UserService.delete(userId)
      if (res.data.success) {
        commit('DELETE_USER', userId)
        Toast.success(res.data.message)
      } else {
        Toast.error(res.data.message)
      }
    },
  },
  getters: {
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
}
