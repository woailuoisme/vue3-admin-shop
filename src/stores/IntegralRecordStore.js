import IntegralRecordService from '../api/integral.record.service'
import { defineStore } from 'pinia/dist/pinia'

export default defineStore('integral-record', {
  // Default Config State
  state: () => ({
    integralRecords: [],
    meta: {},
  }),
  // Getters
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
  // Actions
  actions: {
    async loadAllRecords(payload) {
      const res = await IntegralRecordService.list(payload)
      if (res.data.data) {
        this.integralRecords = res.data.data.items
        this.meta = res.data.data.meta
      }
    },
  },
})
