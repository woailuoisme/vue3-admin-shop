import WithdrawService from '../api/withdraw.service'
import { defineStore } from 'pinia'

/** Config Store */
export default defineStore('withdraw', {
  // Default Config State
  state: () => ({
    withdraw: [],
    meta: {},
    loading: false,
    editedIndex: -1,
    editedItem: {
      id: -1,
      integral: 0,
      amount: 0,
    },
    defaultItem: {
      id: -1,
      integral: 0,
      amount: 0,
    },
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
  // Actions
  actions: {
    setEditedIndex(id) {
      this.editedIndex = this.managers.findIndex((user) => user.id === id)
    },
    resetEdited() {
      this.editedIndex = -1
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    findAndSetItem(item) {
      this.editedIndex = this.managers.findIndex((user) => user.id === item.id)
      this.editedItem = Object.assign({}, item)
    },
    async loadAllWithdraws(payload) {
      const res = await WithdrawService.list(payload)
      if (res.data.data) {
        this.withdraw = res.data.data.items
        this.meta = res.data.data.meta
      }
    },

    async confirmedWithdraw(payload) {
      const res = await WithdrawService.confirmedWithdraw(payload)
      if (res.data.data) {
        const index = this.withdraw.findIndex((p) => p.id === payload.id)
        Object.assign(this.withdraw[index], res.data.data.items)
      }
    },
  },
})
