import ProductCategoryService from '../api/product.categories.service'
import Toast from '../utils/toast'

export default {
  namespaced: true,
  state: {
    categories: [],
    meta: {},
    initProductMeta: {
      per_page: 10,
      last_page: 1,
      current_page: 1,
      total: 7,
      from: 1,
      to: 7,
    },
  },
  mutations: {
    SET_CATEGORIES(state, payload) {
      state.categories = payload
    },

    SET_META(state, payload) {
      state.meta = payload
    },

    UPDATE_CATEGORY(state, payload) {
      const index = state.categories.findIndex((p) => p.id === payload.id)
      Object.assign(state.categories[index], payload)
    },

    CREATE_CATEGORY(state, payload) {
      state.categories.unshift(payload)
    },

    DELETE_CATEGORY(state, payload) {
      const index = state.categories.findIndex((c) => c.id === payload)
      state.categories.splice(index, 1)
    },
  },
  actions: {
    async loadCategories({ commit }, payload) {
      const res = await ProductCategoryService.list(payload)
      if (res.data.data) {
        commit('SET_CATEGORIES', res.data.data)
        Toast.success(res.data.message)
      } else {
        Toast.error(res.data.message)
      }
    },

    async createCategory({ commit }, payload) {
      const res = await ProductCategoryService.store(payload)
      const category = res.data.data
      commit('CREATE_CATEGORY', category)
      Toast.success(res.data.message)
      return true
    },

    async updateCategory({ commit }, payload) {
      const res = await ProductCategoryService.update(payload)
      const category = res.data.data
      commit('UPDATE_CATEGORY', category)
      Toast.success(res.data.message)
    },

    async deleteCategory({ commit }, categoryId) {
      const res = await ProductCategoryService.delete(categoryId)
      if (res.data.success) {
        commit('DELETE_CATEGORY', categoryId)
        Toast.success(res.data.message)
      } else {
        Toast.error(res.data.message)
      }
    },
  },

  getters: {
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
    // getFirstLevelCategories(state) {
    //     return state.firstLevelCategories;
    // },
    getSecondLevelCategories(state) {
      // debugger;
      return state.secondLevelCategories
    },

    findByOrderId: (state) => (id) => {
      return state.categories.find((categories) => categories.id === id)
    },
  },
}
