import AboutUsService from '../api/about.service'
import Toast from '../utils/toast'

export default {
  namespaced: true,
  state: {
    abouts: [],
    aboutInfo: {},
  },
  mutations: {
    SET_ABOUTS(state, payload) {
      state.abouts = payload
    },
    SET_ABOUT(state, payload) {
      state.aboutInfo = payload
    },
    DELETE_ABOUT(state, payload) {
      const index = state.abouts.findIndex((p) => p.id === payload)
      state.abouts.splice(index, 1)
    },

    CREATE_CAROUSEL(state, payload) {
      // state.carousels.push(payload)
      state.abouts.unshift(payload)
    },

    UPDATE_CAROUSEL(state, payload) {
      const index = state.abouts.findIndex((p) => p.id === payload.id)
      Object.assign(state.abouts[index], payload)
    },

    RESET_ABOUT(state) {
      state.aboutInfo = {}
    },
  },
  actions: {
    async loadAllAbouts({ commit }, payload) {
      const res = await AboutUsService.list(payload)
      if (res.data.data) {
        commit('SET_ABOUTS', res.data.data)
      }
    },

    async loadAbout({ commit }, userId) {
      const res = await AboutUsService.show(userId)
      const user = res.data.data
      commit('SET_ABOUT', user)
      Toast.success(res.data.message)
    },

    async createAbout({ commit }, payload) {
      const res = await AboutUsService.create(payload)
      const user = res.data.data
      commit('CREATE_CAROUSEL', user)
      return true
    },

    async updateAbout({ commit }, payload) {
      const res = await AboutUsService.update(payload)
      const about = res.data.data
      commit('UPDATE_CAROUSEL', about)
    },

    async deleteAbout({ commit }, aboutId) {
      const res = await AboutUsService.delete(aboutId)
      if (res.data.success) {
        commit('DELETE_ABOUT', aboutId)
      } else {
        Toast.error(res.data.message)
      }
    },
  },
  getters: {
    hasData(state) {
      return !!state.abouts.length
    },
    getAbouts(state) {
      return state.abouts
    },
    getAbout(state) {
      return { ...state.aboutInfo }
    },
    getMeta(state) {
      return { ...state.meta }
    },
  },
}
