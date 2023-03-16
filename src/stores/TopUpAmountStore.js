import { topUpAmountService } from "@/api"
import { defineStore } from "pinia"
import Toast from "@/utils/toast"
import i18n from "@/plugins/i18n"
const { t } = i18n.global
const { list, store, show, update, remove } = topUpAmountService()
export default defineStore("top-up-amount", {
  state: () => ({
    amounts: [],
    meta: {},
    amount: {},
    loading: false,
    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      id: -1,
      integral: 0,
      amount: 0,
    },
  }),
  getters: {
    total(state) {
      return state?.amounts.length ?? 0
    },
    isHideFooter(state) {
      return state.meta === undefined || Object.keys(state.meta).length === 0
    },
    isNew(state) {
      return state.editedIndex === -1
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
  },
  actions: {
    setEditedIndex(id) {
      this.editedIndex = this.amounts.findIndex((m) => m.id === id)
    },
    resetEdited() {
      this.editedIndex = -1
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    findAndSetItem(item) {
      this.editedIndex = this.amounts.findIndex((m) => m.id === item.id)
      this.editedItem = Object.assign({}, item)
    },

    async loadAllAmount(payload) {
      const res = await list(payload)
      if (res.data.success) {
        this.amounts = res.data.data
        Toast.success(t("response.success"))
      }
    },

    async loadAmount(payload) {
      const res = await show(payload)
      if (res.data.success) {
        this.amount = res.data?.data
        Toast.success(t("response.success"))
      }
    },

    async createAmount(payload) {
      const res = await store(payload)
      const amount = res.data?.data
      this.amounts.unshift(amount)
      Toast.success(t("response.success"))
    },

    async updateAmount(payload) {
      const res = await update(payload)
      const amount = res.data?.data
      if (res.data.success) {
        const index = this.amounts.findIndex((p) => p.id === payload.id)
        Object.assign(this.amounts[index], amount)
        Toast.success(t("response.success"))
      } else {
        Toast.error(t("response.failed"))
      }
    },

    async deleteAmount(topUpId) {
      const res = await remove(topUpId)
      if (res.data.success) {
        const index = this.amounts.findIndex((p) => p.id === topUpId)
        this.amounts.splice(index, 1)
        Toast.success(t("response.success"))
      } else {
        Toast.error(t("response.failed"))
      }
    },
  },
})
