import TopUpRecordService from '../api/topup.record'
export default {
  namespaced: true,
  state: {
    record: [],
    meta: {},
    initMeta: {
      per_page: 10,
      last_page: 1,
      current_page: 1,
      total: 7,
      from: 1,
      to: 7,
    },
    singleRecord: {},
  },
  mutations: {
    SET_RECORD(state, payload) {
      state.record = payload
    },
    SET_META(state, payload) {
      state.meta = payload
    },
    SET_SINGLE_RECORD(state, payload) {
      state.singleRecord = payload
    },

    UPDATE_RECORD(state, payload) {
      const index = state.record.findIndex((p) => p.id === payload.id)
      Object.assign(state.record[index], payload)
    },
  },
  actions: {
    async loadAllRecords({ commit }, payload) {
      const res = await TopUpRecordService.list(payload)
      if (res.data.data) {
        commit('SET_RECORD', res.data.data.items)
        commit('SET_META', res.data.data.meta)
      }
    },

    async loadSingleRecord({ commit }, payload) {
      const res = await TopUpRecordService.show(payload)
      if (res.data.data) {
        commit('SET_SINGLE_RECORD', res.data.data)
      }
    },

    async confirmedTopUp({ commit }, payload) {
      const res = await TopUpRecordService.confirmedTopUp(payload)
      if (res.data.data) {
        commit('UPDATE_RECORD', res.data.data)
      }
    },
  },
  getters: {
    hasData(state) {
      return !!state.record.length
    },
    getTopUp(state) {
      return state.record
    },
    getMeta(state) {
      return { ...state.meta }
    },
    isDisplayPagination(state) {
      return !!(state.meta && state.meta.last_page && state.meta.last_page > 1)
    },
    findByAmountId: (state) => (id) => {
      return state.record.find((record) => record.id === id)
    },
  },
}
