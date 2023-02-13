import UserBackendService from '../api/user.backend.service'
import Toast from '../utils/toast'

export default {
  namespaced: true,
  state: {
    managers: [],
    meta: {},
    initManagerMeta: {
      per_page: 10,
      last_page: 1,
      current_page: 1,
      total: 10,
      from: 1,
      to: 10,
    },
    managerInfo: {},
  },
  mutations: {
    SET_MANAGERS(state, payload) {
      state.managers = payload
    },
    SET_META(state, payload) {
      state.meta = payload
    },
    SET_MANAGER(state, payload) {
      state.managerInfo = payload
    },
    DELETE_MANAGER(state, payload) {
      const index = state.managers.findIndex((p) => p.id === payload)
      state.managers.splice(index, 1)
    },
    CREATE_MANAGER(state, payload) {
      // state.carousels.push(payload)
      state.managers.unshift(payload)
    },
    UPDATE_MANAGER(state, payload) {
      const index = state.managers.findIndex((p) => p.id === payload.id)
      Object.assign(state.managers[index], payload)
    },

    RESET_MANAGER(state) {
      state.managerInfo = {}
    },
  },
  actions: {
    async loadAllUsers({ commit }, payload) {
      const res = await UserBackendService.list(payload)
      if (res.data.data) {
        commit('SET_MANAGERS', res.data.data.items)
        commit('SET_META', res.data.data.meta)
      }
    },

    async loadUser({ commit }, userId) {
      const res = await UserBackendService.show(userId)
      const user = res.data.data
      commit('SET_MANAGER', user)
    },

    async createUser({ commit }, payload) {
      const res = await UserBackendService.create(payload)
      const user = res.data.data

      commit('CREATE_MANAGER', user)
      return true
    },

    async updateUser({ commit }, payload) {
      const res = await UserBackendService.update(payload)
      const user = res.data.data
      commit('UPDATE_MANAGER', user, { root: true })
    },

    async deleteUser({ commit }, userId) {
      const res = await UserBackendService.delete(userId)
      if (res.data.success) {
        commit('DELETE_MANAGER', userId)
      } else {
        Toast.error(res.data.message)
      }
    },
  },
  getters: {
    hasData(state) {
      return !!state.managers.length
    },
    getUsers(state) {
      return [...state.managers]
    },
    getUser(state) {
      return { ...state.managerInfo }
    },
    findById: (state) => (id) => {
      return state.managers.find((user) => user.id === id)
    },
    getMeta(state) {
      return { ...state.meta }
    },
    isDisplayPagination(state) {
      return !!(state.meta && state.meta.last_page && state.meta.last_page > 1)
    },
  },
}
