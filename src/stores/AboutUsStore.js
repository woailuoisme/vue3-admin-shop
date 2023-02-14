import AboutUsService from '../api/about.service'
import Toast from '../utils/toast'

import {defineStore} from 'pinia'

/** Config Store */
export default defineStore('about', {
  // Default Config State
  state: () => ({
    abouts: [],
    aboutInfo: {},
  }),
  // Getters
  getters: {
    hasData(state) {
      return !!state.abouts.length
    },
    getAbouts(state) {
      return state.abouts
    },
    getAbout(state) {
      return {...state.aboutInfo}
    },
    getMeta(state) {
      return {...state.meta}
    },
  },
  // Actions
  actions: {
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
      const index = state.abouts.findIndex((p) => p.id === about.id)
      Object.assign(state.abouts[index], about)
    },

    async deleteAbout(aboutId) {
      const res = await AboutUsService.delete(aboutId)
      if (res.data.success) {
        const index = state.abouts.findIndex((p) => p.id === aboutId)
        this.abouts.splice(index, 1)
      } else {
        Toast.error(res.data.message)
      }
    },
  },

})



