import request from './http.client'
import { canUsed } from '@/utils/util'

class FeedbackService {
  list(data) {
    const params = {
      page: data.page,
      per_page: data.perPage,
    }
    canUsed(data.keyword) ? (params.keyword = data.keyword) : null
    return request.instance().get('/feedbacks', { params })
  }

  show(id) {
    return request.instance().get(`/feedbacks/${id}`)
  }
}

export default new FeedbackService()
