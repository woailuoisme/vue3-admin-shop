import RefundService from '../api/refund.service'

export default {
  namespaced: true,
  state: {
    refunds: [],
    refund: null,
    meta: {},
    initRefundMeta: {
      per_page: 10,
      last_page: 1,
      current_page: 1,
      total: 7,
      from: 1,
      to: 7,
    },
  },
  mutations: {
    SET_REFUNDS(state, payload) {
      state.refunds = payload
    },

    SET_REFUND(state, payload) {
      state.refund = payload
    },

    SET_META(state, payload) {
      state.meta = payload
    },

    UPDATE_REFUND(state, payload) {
      const index = state.refunds.findIndex((p) => p.id === payload.id)
      Object.assign(state.refunds[index], payload)
    },
  },
  actions: {
    async loadAllRefunds({ commit }, payload) {
      const res = await RefundService.list(payload.page, payload.perPage, payload.search)
      if (res.data.data) {
        commit('SET_REFUNDS', res.data.data.items)
        commit('SET_META', res.data.data.meta)
      }
    },
    async confirmedRefund({ commit }, payload) {
      const res = await RefundService.confirmedRefund(payload)
      if (res.data.data) {
        commit('SET_REFUND', res.data.data)
        commit('UPDATE_REFUND', res.data.data)
      }
    },
  },
  getters: {
    getRefunds(state) {
      return state.refunds
    },
    hasData(state) {
      return !!state.refunds.length
    },
    getMeta(state) {
      return { ...state.meta }
    },
    isDisplayPagination(state) {
      return !!(state.meta && state.meta.last_page && state.meta.last_page > 1)
    },
    findByRefundNum: (state) => (id) => {
      return state.refunds.find((refund) => refund.id === id)
    },
  },
}
