import MembershipService from '../api/membership.service'
import Toast from '../utils/toast'

export default {
  namespaced: true,
  state: {
    memberships: [],
    meta: {},

    membershipInfo: {},
  },

  mutations: {
    SET_MEMBERSHIPS(state, payload) {
      state.memberships = payload
    },

    SET_META(state, payload) {
      state.meta = payload
    },

    SET_MEMBERSHIP(state, payload) {
      state.membershipInfo = payload
    },

    DELETE_MEMBERSHIP(state, payload) {
      const index = state.memberships.findIndex(p => p.id === payload)
      state.memberships.splice(index, 1)
    },
    RESET_MEMBERSHIP(state) {
      state.membershipInfo = {}
    },
  },
  actions: {
    async loadAllMemberships({ commit }, payload) {
      const res = await MembershipService.list(payload)
      if (res.data.data) {
        commit('SET_MEMBERSHIPS', res.data.data.items)
        commit('SET_META', res.data.data.meta)
      }
    },

    clearMembership({ commit }) {
      commit('RESET_MEMBERSHIP')
    },

    async loadMembership({ commit }, membershipId) {
      const res = await MembershipService.show(membershipId)
      const membership = res.data.data
      commit('SET_MEMBERSHIP', membership)
      Toast.success(res.data.message)
    },

    async createMembership({ commit }, payload) {
      const res = await MembershipService.create(payload)
      const membership = res.data.data

      commit('SET_MEMBERSHIP', membership)
      Toast.success(res.data.message)
      return true
    },

    async updateMembership({ commit }, payload) {
      const res = await MembershipService.update(payload)
      const membership = res.data.data
      commit('membership/SET_MEMBERSHIP', membership, { root: true })
      Toast.success(res.data.message)
    },

    async deleteMembership({ commit }, membershipId) {
      const res = await MembershipService.delete(membershipId)
      if (res.data.success) {
        commit('DELETE_MEMBERSHIP', membershipId)
        Toast.success(res.data.message)
      } else {
        Toast.error(res.data.message)
      }
    },
  },
  getters: {
    hasData(state) {
      return !!state.memberships.length
    },
    getMemberships(state) {
      return [...state.memberships]
    },
    getMembership(state) {
      return { ...state.membershipInfo }
    },
    findByOrderId: state => id => {
      return state.memberships.find(membership => membership.id === id)
    },
    getMeta(state) {
      return { ...state.meta }
    },
    isDisplayPagination(state) {
      return !!(state.meta && state.meta.last_page && state.meta.last_page > 1)
    },
  },
}
