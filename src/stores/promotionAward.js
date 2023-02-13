import PromotionAwardService from '../api/promotion.award.service'

export default {
  namespaced: true,
  state: {
    awards: [],
    singlePromotionAward: {},
  },
  mutations: {
    SET_PROMOTION_AWARD(state, payload) {
      state.awards = payload
    },
    SET_META(state, payload) {
      state.meta = payload
    },
    SET_SINGLE_PROMOTION_AWARD(state, payload) {
      state.singlePromotionAward = payload
    },
  },
  actions: {
    async loadAllPromotionAward({ commit }, payload) {
      const res = await PromotionAwardService.list(payload)
      if (res.data.data) {
        commit('SET_PROMOTION_AWARD', res.data.data)
      }
    },

    async loadSinglePromotionAward({ commit }, payload) {
      const res = await PromotionAwardService.show(payload)
      if (res.data.data) {
        commit('SET_SINGLE_PROMOTION_AWARD', res.data.data)
      }
    },
  },
  getters: {
    hasData(state) {
      return !!state.awards.length
    },
    getPromotionAwards(state) {
      return state.awards
    },
    findByOrderId: (state) => (id) => {
      return state.awards.find((award) => award.id === id)
    },
  },
}
