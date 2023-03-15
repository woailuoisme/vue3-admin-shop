import CouponService from "../api/coupon.service"

export default {
  namespaced: true,
  state: {
    coupon: [],
    singleCoupon: {},
  },
  mutations: {
    SET_COUPON(state, payload) {
      state.coupon = payload
    },
    SET_SINGLE_COUPON(state, payload) {
      state.singleCoupon = payload
    },
  },
  actions: {
    async loadAllCoupon({ commit }, payload) {
      const res = await CouponService.list(payload)
      if (res.data.data) {
        commit("SET_COUPON", res.data.data)
      }
    },

    async loadSingleCoupon({ commit }, payload) {
      const res = await CouponService.show(payload)
      if (res.data.data) {
        commit("SET_SINGLE_COUPON", res.data.data)
      }
    },
  },
  getters: {
    hasData(state) {
      return !!state.coupon.length
    },
    getCoupons(state) {
      return state.coupon
    },
    findByOrderId: (state) => (id) => {
      return state.coupon.find((order) => order.id === id)
    },
  },
}
