import PromotionService from '@/api/promotion.service'
import Toast from '@/utils/toast'

export default {
  namespaced: true,
  state: {
    promotions: [],
    singlePromotion: {},
  },
  mutations: {
    SET_PROMOTIONS(state, payload) {
      state.promotions = payload
    },
    SET_SINGLE_PROMOTION(state, payload) {
      state.singlePromotion = payload
    },
    DELETE_CAROUSEL(state, payload) {
      const index = state.promotions.findIndex((p) => p.id === payload)
      state.promotions.splice(index, 1)
    },
    CREATE_CAROUSEL(state, payload) {
      state.promotions.unshift(payload)
    },
    UPDATE_CAROUSEL(state, payload) {
      const index = state.promotions.findIndex((p) => p.id === payload.id)
      Object.assign(state.promotions[index], payload)
    },
  },
  actions: {
    async loadAllPromotion({ commit }, payload) {
      const res = await PromotionService.list(payload)
      if (res.data.data) {
        commit('SET_PROMOTIONS', res.data.data)
      }
    },
    async loadSinglePromotion({ commit }, payload) {
      const res = await PromotionService.show(payload)
      if (res.data.data) {
        commit('SET_SINGLE_PROMOTION', res.data.data)
      }
    },

    async createPromotion({ commit }, payload) {
      const res = await PromotionService.store(payload)
      const carousel = res.data.data

      commit('CREATE_CAROUSEL', carousel)
      Toast.success(res.data.message)
      return true
    },

    async updatePromotion({ commit }, payload) {
      const res = await PromotionService.update(payload)
      const carousel = res.data.data
      commit('UPDATE_CAROUSEL', carousel)
      Toast.success(res.data.message)
    },

    async deletePromotion({ commit }, carouselId) {
      const res = await PromotionService.delete(carouselId)
      if (res.data.success) {
        commit('DELETE_CAROUSEL', carouselId)
        Toast.success(res.data.message)
      } else {
        Toast.error(res.data.message)
      }
    },
  },
  getters: {
    hasData(state) {
      return !!state.promotions.length
    },
    getPromotions(state) {
      return state.promotions
    },
    findByOrderId: (state) => (id) => {
      return state.promotions.find((promotion) => promotion.id === id)
    },
  },
}
