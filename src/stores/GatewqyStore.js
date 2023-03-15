import GatewayService from "../api/gateway.service"
import Toast from "@/utils/toast"

export default {
  namespaced: true,
  state: {
    gateways: [],
    singleGateway: {},
  },
  mutations: {
    SET_GATEWAY(state, payload) {
      state.gateways = payload
    },
    SET_META(state, payload) {
      state.meta = payload
    },
    SET_SINGLE_GATEWAY(state, payload) {
      state.singleGateway = payload
    },

    UPDATE_GATEWAY(state, payload) {
      const index = state.gateways.findIndex((p) => p.id === payload.id)
      Object.assign(state.gateways[index], payload)
    },
  },
  actions: {
    async loadAllGateway({ commit }, payload) {
      const res = await GatewayService.list(payload)
      if (res.data.data) {
        commit("SET_GATEWAY", res.data.data)
      }
    },

    async updateGateway({ commit }, payload) {
      const res = await GatewayService.update(payload)
      const gateway = res.data.data
      commit("UPDATE_GATEWAY", gateway)
      Toast.success(res.data.message)
    },
  },
  getters: {
    hasData(state) {
      return !!state.gateways.length
    },
    getGateways(state) {
      return state.gateways
    },
    findByOrderId: (state) => (id) => {
      return state.gateways.find((award) => award.id === id)
    },
  },
}
