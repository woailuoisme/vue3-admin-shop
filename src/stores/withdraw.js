import WithdrawService from '../api/withdraw.service'
import TopUpRecordService from '@/api/topup.record'

export default {
  namespaced: true,
  state: {
    withdraw: [],
    meta: {},
    initWithdrawMeta: {
      per_page: 10,
      last_page: 1,
      current_page: 1,
      total: 7,
      from: 1,
      to: 7,
    },
  },
  mutations: {
    SET_ORDER(state, payload) {
      state.withdraw = payload
    },
    SET_META(state, payload) {
      state.meta = payload
    },
    UPDATE_WITHDRAW(state, payload) {
      const index = state.withdraw.findIndex((p) => p.id === payload.id)
      Object.assign(state.withdraw[index], payload)
    },
  },
  actions: {
    async loadAllWithdraws({ commit }, payload) {
      const res = await WithdrawService.list(payload)
      if (res.data.data) {
        commit('SET_ORDER', res.data.data.items)
        commit('SET_META', res.data.data.meta)
      }
    },

    async confirmedWithdraw({ commit }, payload) {
      const res = await WithdrawService.confirmedWithdraw(payload)
      if (res.data.data) {
        commit('UPDATE_WITHDRAW', res.data.data)
      }
    },
  },
  getters: {
    getWithdraws(state) {
      return state.withdraw
    },
    hasData(state) {
      return !!state.withdraw.length
    },
    getMeta(state) {
      return { ...state.meta }
    },
    isDisplayPagination(state) {
      return !!(state.meta && state.meta.last_page && state.meta.last_page > 1)
    },
    findByWithdrawId: (state) => (id) => {
      return state.withdraw.find((withdraw) => withdraw.id === id)
    },
  },
}
