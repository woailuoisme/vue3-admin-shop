import ProductCategoryService from '../api/product.categories.service'
import Toast from '../utils/toast'
import { defineStore } from 'pinia'

/** Config Store */
export default defineStore('product-category', {
  // Default Config State
  state: () => ({
    categories: [],
    meta: {},
    editedIndex: -1,
    loading: false,
    editedItem: {
      image: '',
      imageFile: [],
      image_url: '',
      name: '',
      order: 0,
      parent_id: null,
    },
    defaultItem: {
      image: '',
      imageFile: [],
      image_url: '',
      name: '',
      order: 0,
      parent_id: null,
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
    findById: state => id => {
      return state.categories.find(p => p.id === id)
    },
    findIndexById: state => id => {
      return state.categories.findIndex(p => p.id === id)
    },
    hasData(state) {
      return !!state.categories.length
    },
    getCategories(state) {
      return state.categories
    },
    getMeta(state) {
      return { ...state.meta }
    },
    isDisplayPagination(state) {
      return !!(state.meta && state.meta.last_page && state.meta.last_page > 1)
    },
    findByOrderId: state => id => {
      return state.categories.find(categories => categories.id === id)
    },
  },
  // Actions
  actions: {
    setEditedIndex(id) {
      this.editedIndex = this.categories.findIndex(user => user.id === id)
    },
    resetEdited() {
      this.editedIndex = -1
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    findAndSetItem(item) {
      this.editedIndex = this.categories.findIndex(user => user.id === item.id)
      this.editedItem = Object.assign({}, item)
    },

    async loadCategories(payload) {
      const res = await ProductCategoryService.list(payload)
      if (res.data.data) {
        this.categories = res.data.data
        Toast.success(res.data.message)
      } else {
        Toast.error(res.data.message)
      }
    },

    async createCategory(payload) {
      const res = await ProductCategoryService.store(payload)
      const category = res.data.data
      this.categories.unshift(payload)
      Toast.success(res.data.message)
    },

    async updateCategory(payload) {
      const res = await ProductCategoryService.update(payload)
      const category = res.data.data
      const index = this.categories.findIndex(p => p.id === payload.id)
      Object.assign(this.categories[index], payload)
      Toast.success(res.data.message)
    },

    async deleteCategory(categoryId) {
      const res = await ProductCategoryService.delete(categoryId)
      if (res.data.success) {
        const index = this.categories.findIndex(c => c.id === categoryId)
        this.categories.splice(index, 1)
        Toast.success(res.data.message)
      } else {
        Toast.error(res.data.message)
      }
    },
  },
})
