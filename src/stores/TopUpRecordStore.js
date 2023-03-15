import TopUpRecordService from "../api/topup.record"
import { defineStore } from "pinia/dist/pinia"

export default defineStore("top-up-record", {
  // Default Config State
  state: () => ({
    records: [],
    meta: {},
    record: {},
  }),
  // Getters
  getters: {
    total(state) {
      return state.meta.total ?? 0
    },
    isNew(state) {
      return state.editedIndex === -1
    },
    getEditedItem(state) {
      return state.editedItem
    },
    getEditedIndex(state) {
      return state.editedIndex
    },

    findById: (state) => (id) => {
      return state.products.find((p) => p.id === id)
    },
    findIndexById: (state) => (id) => {
      return state.products.findIndex((p) => p.id === id)
    },
    hasData(state) {
      return !!state.records.length
    },
    getRecords(state) {
      return state.records
    },
    getMeta(state) {
      return { ...state.meta }
    },
    isDisplayPagination(state) {
      return !!(state.meta && state.meta.last_page && state.meta.last_page > 1)
    },
    findByAmountId: (state) => (id) => {
      return state.records.find((record) => record.id === id)
    },

    getMapReconds: (state) => (id) => {
      let product = state.products.find((product) => product.id === id)
      let mapProductList = []
      Object.keys(product).map((key, index) => {
        let fb = {}
        if (key === "id") {
          fb.key = key
          fb.label = "ID"
          fb.value = product["id"]
          mapProductList.push(fb)
        }
      })
      return mapProductList
    },
  },
  // Actions
  actions: {
    async loadAllRecords(payload) {
      const res = await TopUpRecordService.list(payload)
      if (res.data.data) {
        this.records = res.data.data.items
        this.meta = res.data.data.meta
      }
    },

    async loadSingleRecord(payload) {
      const res = await TopUpRecordService.show(payload)
      if (res.data.data) {
        this.record = res.data.data
      }
    },

    async confirmedTopUp(payload) {
      const res = await TopUpRecordService.confirmedTopUp(payload)
      if (res.data.data) {
        const index = this.records.findIndex((p) => p.id === payload.id)
        Object.assign(this.records[index], res.data.data)
      }
    },
  },
})
