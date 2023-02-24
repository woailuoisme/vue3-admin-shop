import CarouselService from '../api/carousel.service'
import Toast from '../utils/toast'

import { defineStore } from 'pinia'

export default defineStore('carousel', {
  state: () => ({
    carousels: [],
    meta: {},
    carouselInfo: {},
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
      return !!state.carousels.length
    },
    getCarousels(state) {
      return [...state.carousels]
    },
    getCarousel(state) {
      return { ...state.carouselInfo }
    },
    findByOrderId: (state) => (id) => {
      return state.carousels.find((carousel) => carousel.id === id)
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
