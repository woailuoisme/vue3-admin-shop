import TopUpAmountService from '../api/topup.amount.service'
import Toast from '@/utils/toast'
import { defineStore } from 'pinia/dist/pinia'

export default defineStore('top-up-amount', {
  // Default Config State
  state: () => ({
    amounts: [],
    amount: {},
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
      return state?.amounts.length ?? 0
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
      return state.amounts.find((p) => p.id === id)
    },
    findIndexById: (state) => (id) => {
      return state.amounts.findIndex((p) => p.id === id)
    },
    hasData(state) {
      return !!state.amounts.length
    },
    getAmount(state) {
      return state.amounts
    },
    findByAmountId: (state) => (id) => {
      return state.amounts.find((amount) => amount.id === id)
    },
  },
  // Actions
  actions: {
    setEditedIndex(id) {
      this.editedIndex = this.amounts.findIndex((user) => user.id === id)
    },
    resetEdited() {
      this.editedIndex = -1
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    findAndSetItem(item) {
      this.editedIndex = this.amounts.findIndex((user) => user.id === item.id)
      this.editedItem = Object.assign({}, item)
    },

    async loadAllAmount(payload) {
      const res = await TopUpAmountService.list(payload)
      console.log(res)
      if (res.data.success) {
        this.amounts = res.data.data
      }
    },

    async loadSingleAmount(payload) {
      const res = await TopUpAmountService.show(payload)
      if (res.data.success) {
        this.amount = res.data.data
      }
    },

    async createAmount(payload) {
      const res = await TopUpAmountService.store(payload)
      const amount = res.data.data
      this.amounts.unshift(amount)
    },

    async updateAmount(payload) {
      const res = await TopUpAmountService.update(payload)
      const amount = res.data.data
      debugger
      if (res.data.success) {
        const index = this.amounts.findIndex((p) => p.id === payload.id)
        Object.assign(this.amounts[index], amount)
        Toast.success(res.data.message)
      } else {
        Toast.error(res.data.message)
      }
    },

    async deleteAmount(topUpId) {
      const res = await TopUpAmountService.delete(topUpId)
      if (res.data.success) {
        const index = this.amount.findIndex((p) => p.id === topUpId)
        this.amounts.splice(index, 1)
        Toast.success(res.data.message)
      } else {
        Toast.error(res.data.message)
      }
    },
  },
})
