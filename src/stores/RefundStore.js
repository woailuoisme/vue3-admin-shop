import RefundService from "../api/refund.service"
import { defineStore } from "pinia/dist/pinia"

export default defineStore("refund", {
  // Default Config State
  state: () => ({
    refunds: [],
    refund: null,
    meta: {},
    loading: false,
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
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
  actions: {
    setEditedIndex(id) {
      this.editedIndex = this.refunds.findIndex((user) => user.id === id)
    },
    resetEdited() {
      this.editedIndex = -1
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    findAndSetItem(item) {
      this.editedIndex = this.refunds.findIndex((i) => i.id === item.id)
      this.editedItem = Object.assign({}, item)
    },
    async loadAllRefunds(payload) {
      const res = await RefundService.list(payload.page, payload.perPage, payload.search)
      if (res.data.data) {
        this.refunds = res.data.data.items
        this.meta = res.data.data.meta
      }
    },
    async confirmedRefund(payload) {
      const res = await RefundService.confirmedRefund(payload)
      if (res.data.data) {
        const index = this.refunds.findIndex((p) => p.id === payload.id)
        Object.assign(this.refunds[index], res.data.data)
      }
    },
  },
})
