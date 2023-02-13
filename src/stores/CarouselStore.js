import CarouselService from '../api/carousel.service'
import Toast from '../utils/toast'

import {defineStore} from 'pinia'

/** Config Store */
export default defineStore('carousel', {
  // Default Config State
  state: () => ({
    carousels: [],
    meta: {},
    initCarouselMeta: {
      per_page: 10,
      last_page: 1,
      current_page: 1,
      total: 10,
      from: 1,
      to: 10,
    },
    carouselInfo: {},
  }),
  // Getters
  getters: {
    hasData(state) {
      return !!state.carousels.length
    },
    getCarousels(state) {
      return [...state.carousels]
    },
    getCarousel(state) {
      return {...state.carouselInfo}
    },
    findByOrderId: (state) => (id) => {
      return state.carousels.find((carousel) => carousel.id === id)
    },
    getMeta(state) {
      return {...state.meta}
    },
    isDisplayPagination(state) {
      return !!(state.meta && state.meta.last_page && state.meta.last_page > 1)
    },
  },
  // Actions
  actions: {
    async loadAllCarousels(payload) {
      const res = await CarouselService.list(payload)
      if (res.data.data) {
        this.carousels = res.data.data.items
        this.meta = res.data.data.meta
      }
    },

    async loadCarousel(carouselId) {
      const res = await CarouselService.show(carouselId)
      this.carouselInfo = res.data.data
      Toast.success(res.data.message)
    },

    async createCarousel(payload) {
      const res = await CarouselService.store(payload)
      const carousel = res.data.data
      this.carousels.unshift(payload)
      Toast.success(res.data.message)
      return true
    },

    async updateCarousel(payload) {
      const res = await CarouselService.update(payload)
      const carousel = res.data.data
      const index = state.carousels.findIndex((p) => p.id === carousel.id)
      Object.assign(state.carousels[index], carousel)
      Toast.success(res.data.message)
    },

    async deleteCarousel(carouselId) {
      const res = await CarouselService.delete(carouselId)
      if (res.data.success) {
        const index = state.carousels.findIndex((p) => p.id === carouselId)
        this.carousels.splice(index, 1)
        Toast.success(res.data.message)
      } else {
        Toast.error(res.data.message)
      }
    },
  },
})



