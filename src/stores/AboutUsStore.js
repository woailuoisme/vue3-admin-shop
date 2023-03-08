import AboutUsService from '../api/about.service'
import Toast from '../utils/toast'

import { defineStore } from 'pinia'

/** Config Store */
export default defineStore('about', {
  // Default Config State
  state: () => ({
    abouts: [],
    aboutInfo: {},
    loading: false,
    editedIndex: -1,
    editedItem: {
      id: -1,
      order: '',
      image: null,
    },
    defaultItem: {
      id: -1,
      order: '',
      image: null,
    },
  }),
  // Getters
  getters: {
    total(state) {
      return state.abouts.length
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
    findById: state => id => {
      return state.abouts.find(p => p.id === id)
    },
    findIndexById: state => id => {
      return state.abouts.findIndex(p => p.id === id)
    },
    hasData(state) {
      return !!state.abouts.length
    },
    getAbouts(state) {
      return state.abouts
    },
    getAbout(state) {
      return { ...state.aboutInfo }
    },
    getMeta(state) {
      return { ...state.meta }
    },
  },
  // Actions
  actions: {
    setEditedIndex(id) {
      this.editedIndex = this.managers.findIndex(user => user.id === id)
    },
    resetEdited() {
      this.editedIndex = -1
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    findAndSetItem(item) {
      this.editedIndex = this.managers.findIndex(user => user.id === item.id)
      this.editedItem = Object.assign({}, item)
    },

    async loadAllAbouts(payload) {
      const res = await AboutUsService.list(payload)
      if (res.data.data) {
        this.abouts = res.data.data
      }
    },

    async loadAbout(userId) {
      const res = await AboutUsService.show(userId)
      this.aboutInfo = res.data.data
      Toast.success(res.data.message)
    },

    async createAbout(payload) {
      const res = await AboutUsService.create(payload)
      const about = res.data.data
      this.abouts.unshift(about)
      return true
    },

    async updateAbout(payload) {
      const res = await AboutUsService.update(payload)
      const about = res.data.data
      const index = this.abouts.findIndex(p => p.id === about.id)
      Object.assign(this.abouts[index], about)
    },

    async deleteAbout(aboutId) {
      const res = await AboutUsService.delete(aboutId)
      if (res.data.success) {
        const index = this.abouts.findIndex(p => p.id === aboutId)
        this.abouts.splice(index, 1)
      } else {
        Toast.error(res.data.message)
      }
    },
  },
})
