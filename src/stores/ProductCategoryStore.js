import ProductCategoryService from '../api/product.categories.service'
import Toast from '../utils/toast'
import {defineStore} from 'pinia'

/** Config Store */
export default defineStore('product-category', {
    // Default Config State
    state: () => ({
      categories: [],
      meta: {},
      initProductMeta: {
        per_page: 10,
        last_page: 1,
        current_page: 1,
        total: 0,
        from: 1,
        to: 7,
      },
    }),
    // Getters
    getters: {
      hasData(state) {
        return !!state.categories.length
      },
      getCategories(state) {
        return state.categories
      },
      getMeta(state) {
        return {...state.meta}
      },
      isDisplayPagination(state) {
        return !!(state.meta && state.meta.last_page && state.meta.last_page > 1)
      },
      findByOrderId: (state) => (id) => {
        return state.categories.find((categories) => categories.id === id)
      },
    },
    // Actions
    actions: {
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
        const index = this.categories.findIndex((p) => p.id === payload.id)
        Object.assign(this.categories[index], payload)
        Toast.success(res.data.message)
      },

      async deleteCategory(categoryId) {
        const res = await ProductCategoryService.delete(categoryId)
        if (res.data.success) {
          const index = this.categories.findIndex((c) => c.id === payload)
          this.categories.splice(index, 1)
          Toast.success(res.data.message)
        } else {
          Toast.error(res.data.message)
        }
      }
    }
  }
)



