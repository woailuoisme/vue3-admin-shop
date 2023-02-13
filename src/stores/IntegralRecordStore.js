import IntegralRecordService from '../api/integral.record.service'

export default {
  namespaced: true,
  state: {
    integralRecords: [],
    meta: {},
    initProductMeta: {
      per_page: 10,
      last_page: 1,
      current_page: 1,
      total: 7,
      from: 1,
      to: 7,
    },
  },
  mutations: {
    SET_INTEGRAL_RECORD(state, payload) {
      state.integralRecords = payload
    },
    SET_META(state, payload) {
      state.meta = payload
    },
  },
  actions: {
    async loadAllRecords({ commit }, payload) {
      const res = await IntegralRecordService.list(payload)
      if (res.data.data) {
        commit('SET_INTEGRAL_RECORD', res.data.data.items)
        commit('SET_META', res.data.data.meta)
      }
    },
  },
  getters: {
    hasData(state) {
      return !!state.integralRecords.length
    },
    getOrders(state) {
      return state.integralRecords
    },
    getMeta(state) {
      return { ...state.meta }
    },
    isDisplayPagination(state) {
      return !!(state.meta && state.meta.last_page && state.meta.last_page > 1)
    },
    findByOrderId: (state) => (id) => {
      return state.integralRecords.find((order) => order.id === id)
    },
  },
}
