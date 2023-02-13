import TopUpAmountService from '../api/topup.amount.service'
import Toast from '@/utils/toast'

export default {
  namespaced: true,
  state: {
    amount: [],
    singleTopUp: {},
  },
  mutations: {
    SET_AMOUNT(state, payload) {
      state.amount = payload
    },
    SET_SINGLE_AMOUNT(state, payload) {
      state.singleTopUp = payload
    },

    DELETE_AMOUNT(state, payload) {
      const index = state.amount.findIndex((p) => p.id === payload)
      state.amount.splice(index, 1)
    },
    CREATE_AMOUNT(state, payload) {
      state.amount.unshift(payload)
    },
    UPDATE_AMOUNT(state, payload) {
      const index = state.amount.findIndex((p) => p.id === payload.id)
      Object.assign(state.amount[index], payload)
    },
  },
  actions: {
    async loadAllAmount({ commit }, payload) {
      const res = await TopUpAmountService.list(payload)
      console.log(res)
      if (res.data) {
        commit('SET_AMOUNT', res.data)
      }
    },

    async loadSingleAmount({ commit }, payload) {
      const res = await TopUpAmountService.show(payload)
      if (res.data) {
        commit('SET_SINGLE_AMOUNT', res.data)
      }
    },

    async createAmount({ commit }, payload) {
      const res = await TopUpAmountService.store(payload)
      const amount = res.data

      commit('CREATE_AMOUNT', amount)
      // Toast.success(res.message)
      return true
    },

    async updateAmount({ commit }, payload) {
      const res = await TopUpAmountService.update(payload)
      console.log(res)
      const amount = res.data
      debugger
      if (res.success) {
        commit('UPDATE_AMOUNT', amount)
      } else {
        Toast.error(res.message)
      }
    },

    async deleteAmount({ commit }, topUpId) {
      const res = await TopUpAmountService.delete(topUpId)
      if (res.success) {
        commit('DELETE_AMOUNT', topUpId)
      } else {
        Toast.error(res.message)
      }
    },
  },
  getters: {
    hasData(state) {
      return !!state.amount.length
    },
    getAmount(state) {
      return state.amount
    },
    findByAmountId: (state) => (id) => {
      return state.amount.find((amount) => amount.id === id)
    },
  },
}
