import FeedbackService from '@/api/feedback.service'

export default {
  namespaced: true,
  state: {
    feedback: [],
    meta: {},
    initMeta: {
      per_page: 10,
      last_page: 1,
      current_page: 1,
      total: 7,
      from: 1,
      to: 7,
    },
    singleFeedback: {},
  },
  mutations: {
    SET_FEEDBACK(state, payload) {
      state.feedback = payload
    },
    SET_META(state, payload) {
      state.meta = payload
    },
    SET_SINGLE_FEEDBACK(state, payload) {
      state.singleFeedback = payload
    },
  },
  actions: {
    async loadAllFeedback({ commit }, payload) {
      const res = await FeedbackService.list(payload)
      if (res.data.data) {
        commit('SET_FEEDBACK', res.data.data.items)
        commit('SET_META', res.data.data.meta)
      }
    },

    async loadSingleFeedback({ commit }, payload) {
      const res = await FeedbackService.show(payload)
      if (res.data.data) {
        commit('SET_SINGLE_FEEDBACK', res.data.data)
      }
    },
  },
  getters: {
    hasData(state) {
      return !!state.feedback.length
    },
    getFeedback(state) {
      return state.feedback
    },
    getMeta(state) {
      return { ...state.meta }
    },
    isDisplayPagination(state) {
      return !!(state.meta && state.meta.last_page && state.meta.last_page > 1)
    },
    findById: (state) => (id) => {
      return state.feedback.find((feedback) => feedback.id === id)
    },

    getMapFeedback: (state) => (id) => {
      let feedback = state.feedback.find((feedback) => feedback.id === id)
      let mapFeedbackList = []
      Object.keys(feedback).map(function (key, index) {
        let fb = {}
        if (key === 'content') {
          fb.key = key
          fb.label = '内容'
          fb.value = feedback['content']
          mapFeedbackList.push(fb)
        }
        if (key === 'user') {
          fb.key = key
          fb.label = '用户'
          fb.value = feedback['user']
          mapFeedbackList.push(fb)
        }
        if (key === 'images') {
          fb.key = key
          fb.label = '图片'
          fb.value = feedback['images']
          mapFeedbackList.push(fb)
        }
        if (key === 'created_at') {
          fb.key = key
          fb.label = '创建时间'
          fb.value = feedback['created_at']
          mapFeedbackList.push(fb)
        }
      })
      return mapFeedbackList
    },
  },
}
