export default {
  namespaced: true,
  state: {
    loading: false,
    error: null,
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_ERROR(state, payload) {
      state.error = payload
    },
  },
  actions: {},
  getters: {
    isLoading(state) {
      return state.loading
    },
    isError(state) {
      return !!state.error
    },
    errorMsg(state) {
      return state.error
    },
  },
}
