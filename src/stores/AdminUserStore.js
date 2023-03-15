import UserBackendService from "../api/user.backend.service"
import Toast from "../utils/toast"
import { defineStore } from "pinia"

/** Config Store */
export default defineStore("admin-user", {
  // Default Config State
  state: () => ({
    managers: [],
    meta: {},
    managerInfo: {},
    loading: false,
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: "",
      email: "",
      password: null,
      avatar: null,
      avatarFile: [],
      role: "",
    },
    defaultItem: {
      id: 0,
      name: "",
      email: "",
      password: null,
      avatar: null,
      avatarFile: [],
      role: "",
    },
  }),
  // Getters
  getters: {
    hasData(state) {
      return !!state.managers.length
    },
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
      return state.managers.find((user) => user.id === id)
    },
    findIndexById: (state) => (id) => {
      return state.managers.findIndex((user) => user.id === id)
    },
    getUsers(state) {
      return [...state.managers]
    },
    getUser(state) {
      return { ...state.managerInfo }
    },
    getMeta(state) {
      return { ...state.meta }
    },
    isDisplayPagination(state) {
      return !!(state.meta && state.meta.last_page && state.meta.last_page > 1)
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
    async loadAllUsers(payload) {
      this.loading = true
      const res = await UserBackendService.list(payload)
      if (res.data.data) {
        this.managers = res.data.data.items
        this.meta = res.data.data.meta
      }
      this.loading = false
    },

    async loadUser(userId) {
      const res = await UserBackendService.show(userId)
      this.managerInfo = res.data.data
    },

    async createUser(payload) {
      const res = await UserBackendService.create(payload)
      const user = res.data.data
      this.managers.unshift(user)
      return true
    },

    async updateUser(payload) {
      this.editedIndex = this.managers.findIndex((p) => p.id === user.id)
      this.editedItem = Object.assign({}, this.managers[this.editedIndex])
      const res = await UserBackendService.update(payload)
      const user = res.data.data
    },

    async deleteUser(userId) {
      this.editedIndex = this.managers.findIndex((p) => p.id === userId)
      const res = await UserBackendService.delete(userId)
      if (res.data.success) {
        this.editedItem = Object.assign({}, this.managers[this.editedIndex])
        this.managers.splice(this.editedIndex, 1)
      } else {
        this.editedIndex = -1
        Toast.error(res.data.message)
      }
    },
  },
})
